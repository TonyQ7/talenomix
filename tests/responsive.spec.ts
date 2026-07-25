import { expect, test } from '@playwright/test';
import { ALL_PATHS } from './routes';

const WIDTHS = [320, 375, 768, 1024, 1440] as const;

/**
 * PLAN.md section 5: no horizontal overflow, and all demo labels readable at
 * 320px. Wide content (tables, the CSV block, the map) is allowed to scroll
 * inside its own container — but the page body never may.
 */
test.describe('no horizontal overflow', () => {
  for (const width of WIDTHS) {
    test(`page does not scroll sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const path of ALL_PATHS) {
        await page.goto(path);
        const overflow = await page.evaluate(() => ({
          doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          body: document.body.scrollWidth - document.body.clientWidth,
        }));

        expect(overflow.doc, `documentElement overflow on ${path}`).toBeLessThanOrEqual(1);
        expect(overflow.body, `body overflow on ${path}`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test('wide demo content scrolls inside its own container, not the page', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('./demo/#step-universe');

  const scroller = page.locator('.table-scroll').filter({ has: page.locator('#universe-table') });
  await expect(scroller).toBeVisible();

  const scrolls = await scroller.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(scrolls, 'the target-universe table should scroll within its region').toBe(true);

  const pageOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(pageOverflow).toBeLessThanOrEqual(1);
});

test('demo labels are legible at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('./demo/');

  // Visible text must not shrink below 12px anywhere in the demo. Elements the
  // narrow layout deliberately hides (the in-map labels) are not "labels the user
  // has to read", so they are skipped rather than counted as failures.
  const tooSmall = await page.locator('.dm-step, .dm-nav').evaluateAll((roots) => {
    const offenders: string[] = [];
    for (const root of roots) {
      for (const el of root.querySelectorAll('*')) {
        const text = (el.textContent ?? '').trim();
        if (!text || el.children.length > 0) continue;
        if (!el.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true })) continue;
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size < 12) {
          const cls = typeof el.className === 'string' ? el.className : el.getAttribute('class');
          offenders.push(`${el.tagName}.${cls} "${text.slice(0, 25)}" @ ${size}px`);
        }
      }
    }
    return offenders;
  });

  expect(tooSmall).toEqual([]);
});

test('in-map text is dropped on small screens in favour of the HTML legend', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('./');

  // Unreadably-scaled SVG labels are hidden; the same information stays available
  // as real text in the coverage legend.
  await expect(page.locator('svg .mu__label').first()).toBeHidden();
  await expect(page.locator('.legend').first()).toBeVisible();
});

test('reduced motion removes reveal transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');

  const animated = await page.locator('[data-reveal]').evaluateAll((els) =>
    els.filter((el) => {
      const style = getComputedStyle(el);
      const duration = parseFloat(style.transitionDuration);
      return Number(style.opacity) < 0.99 || duration > 0.01;
    }).length,
  );

  expect(animated, 'no element should animate or stay faded under reduced motion').toBe(0);
});
