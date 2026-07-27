import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * The film, audited while it is actually playing.
 *
 * Everything else in the suite runs under `reducedMotion: 'reduce'` or below the
 * 64rem width gate, so no other test has ever seen a `<video>` element. These do.
 * They are desktop-only for that reason — on Pixel 7 the gate correctly refuses
 * to create one, and asserting on an absent element would pass for the wrong
 * reason.
 */

test.describe('film', () => {
  // Serial: all three fetch the same ~43 MB stream, and three concurrent pulls of
  // it starve each other's `play()` promise. This is a symptom of the file size,
  // not of the tests — see the re-encode note in README.md.
  test.describe.configure({ mode: 'serial' });

  test.skip(
    ({ isMobile, javaScriptEnabled }) => Boolean(isMobile) || javaScriptEnabled === false,
    'the film only exists on wide viewports with JavaScript',
  );

  // The film is third-party hosted and ~43 MB. `play()` resolves as soon as
  // playback starts rather than when the download completes, so this is not a
  // 43 MB wait — but it is the one test in the suite that touches the network.
  test.setTimeout(60_000);

  test('the pause control is keyboard-operable and actually pauses (WCAG 2.2.2)', async ({
    page,
  }) => {
    await page.goto('./');

    const toggle = page.locator('[data-film-toggle]');
    const video = page.locator('.hero-film__slot video');

    await expect(video, 'no video was injected on a wide viewport').toHaveCount(1);
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    // Playing is the precondition for "pause" to mean anything.
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused), {
        message: 'the film never started, so the pause control has nothing to control',
        timeout: 25_000,
      })
      .toBe(true);

    // Keyboard, not click: 2.2.2 is a keyboard-accessibility criterion, and a
    // control reachable only by pointer satisfies the letter and not the point.
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Enter');

    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(true);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    // The label has to change too, or a screen-reader user is told to pause
    // something that is already paused.
    const paused = await toggle.locator('.hero-film__toggle-text').textContent();

    await page.keyboard.press('Enter');
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    const playing = await toggle.locator('.hero-film__toggle-text').textContent();
    expect(paused?.trim()).not.toBe(playing?.trim());

    // Focus must survive both activations. It did not: the pending autoplay
    // promise rejected with AbortError as soon as the handler called pause(),
    // the rejection handler hid the button, and the browser moved focus to
    // <body> — so the film could be paused once and never resumed, and a
    // keyboard user lost their place on the page.
    await expect(toggle).toBeVisible();
    await expect(toggle).toBeFocused();
  });

  /**
   * axe cannot resolve a backdrop it does not own, so over media it downgrades
   * from `violations` to `incomplete` — which the main a11y suite does not
   * assert on at all. Left alone, a genuinely new problem introduced over the
   * film would surface as one more incomplete and nobody would notice.
   *
   * So: violations must be empty, and the set of incomplete rule ids must match
   * this list exactly. A new entry fails the build and has to be explained.
   */
  const EXPECTED_INCOMPLETE = new Set(['color-contrast']);

  test('axe over the playing film: no violations, and no unexplained incompletes', async ({
    page,
  }) => {
    await page.goto('./');
    await expect(page.locator('.hero-film__slot video')).toHaveCount(1);
    await expect
      .poll(
        () =>
          page
            .locator('.hero-film__slot video')
            .evaluate((v: HTMLVideoElement) => !v.paused),
        { timeout: 25_000 },
      )
      .toBe(true);

    // Let the hero's reveal transitions settle first.
    //
    // This is not padding. The rest of the a11y suite pins `reducedMotion` so it
    // never sees a mid-flight element; this test deliberately does not, so
    // without the wait axe samples the CTA at partial opacity and reports the
    // blended colours (#c4cdf0 on #90a2e3, 1.57:1) rather than the settled ones.
    // That is an artefact of sampling an in-progress fade, and treating it as a
    // finding would train us to ignore this test.
    //
    // Scoped to `.hero-film` deliberately: reveals below the fold are driven by
    // an IntersectionObserver, so they sit at opacity 0 until scrolled to and a
    // document-wide wait would never resolve. That is also why they produce no
    // findings of their own — axe skips what is not visible — and why the film,
    // which is the only thing this test is about, is entirely above the fold.
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll('.hero-film [data-reveal], .hero-film .reveal-words')].every(
          (el) => Number(getComputedStyle(el).opacity) > 0.99,
        ) &&
        document
          .getAnimations()
          .filter((a) => a.constructor.name === 'CSSTransition')
          .every((a) => a.playState === 'finished'),
      undefined,
      { timeout: 15_000 },
    );

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      results.violations.map((v) => `${v.id} (${v.impact}): ${v.help}`),
      'axe violations with the film playing',
    ).toEqual([]);

    const incomplete = [...new Set(results.incomplete.map((r) => r.id))].sort();
    const unexpected = incomplete.filter((id) => !EXPECTED_INCOMPLETE.has(id));

    expect(
      unexpected,
      'new axe "incomplete" results over the film — each needs a human decision, ' +
        'because incomplete is where a real contrast failure hides',
    ).toEqual([]);
  });

  test('the film is decorative to assistive technology, not content', async ({ page }) => {
    await page.goto('./');
    const video = page.locator('.hero-film__slot video');
    await expect(video).toHaveCount(1);

    // aria-hidden + tabindex="-1" is what makes a caption track unnecessary
    // rather than merely absent. muted must be an attribute, not only a
    // property, or axe's no-autoplay-audio matcher cannot see it.
    await expect(video).toHaveAttribute('aria-hidden', 'true');
    await expect(video).toHaveAttribute('muted', '');
    await expect(video).toHaveAttribute('tabindex', '-1');
    await expect(video).toHaveJSProperty('muted', true);

    // It must not be reachable in the tab order.
    const focusable = await page
      .locator('.hero-film')
      .evaluate((el) => el.querySelectorAll('video[tabindex="0"], video:not([tabindex])').length);
    expect(focusable).toBe(0);
  });
});
