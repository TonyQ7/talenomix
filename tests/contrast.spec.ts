import { expect, test } from '@playwright/test';
import { ALL_PATHS } from './routes';

/**
 * Contrast coverage that axe cannot provide.
 *
 * Verified against the installed axe-core: `color-contrast` returns *incomplete*
 * rather than a violation when it cannot resolve the backdrop, and the a11y
 * suite runs under `reducedMotion: 'reduce'`, so it never even creates the film.
 * That means a green axe run says nothing at all about text on the glass plate.
 *
 * These tests replace that coverage with something stronger: they read the real
 * token values from the page and composite them in the test, so the guarantee is
 * frame-independent by construction rather than dependent on which video frame
 * happened to be on screen.
 */

const AA = 4.5;

function srgbToLinear(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance([r, g, b]: number[]): number {
  const [lr, lg, lb] = [r!, g!, b!].map((v) => srgbToLinear(v / 255));
  return 0.2126 * lr! + 0.7152 * lg! + 0.0722 * lb!;
}

function ratio(a: number[], b: number[]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

/**
 * Parse `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb(r g b / a)` or `rgb(r, g, b)`.
 *
 * The 8-digit form matters: the build minifies `rgb(255 255 255 / 0.70)` down to
 * `#ffffffb3`, so a parser that only understands functional notation reads the
 * glass token as opaque and silently reports a contrast ratio that is far too
 * generous — a false pass on exactly the assertion this file exists to make.
 */
function parseColour(value: string): [number, number, number, number] {
  const raw = value.trim();
  const hex = raw.match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    const full =
      hex.length === 3 || hex.length === 4
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex;
    const n = parseInt(full.slice(0, 6), 16);
    const a = full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, a];
  }
  const nums = raw.match(/[\d.]+/g);
  if (!nums || nums.length < 3) throw new Error(`unparseable colour: ${value}`);
  const alpha = nums[3] === undefined ? 1 : Number(nums[3]);
  return [Number(nums[0]), Number(nums[1]), Number(nums[2]), alpha];
}

/** Composite a translucent colour over an opaque backdrop. */
function over(fg: [number, number, number, number], bg: number[]): number[] {
  return [0, 1, 2].map((i) => fg[i as 0 | 1 | 2] * fg[3] + bg[i]! * (1 - fg[3]));
}

test('text on glass clears AA against the worst possible film frame', async ({ page }) => {
  await page.goto('./');

  const tokens = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    const read = (n: string): string => s.getPropertyValue(n).trim();
    return {
      glass: read('--glass-bg'),
      wash: read('--hero-wash'),
      ink: read('--ink'),
      inkMuted: read('--ink-muted'),
      inkFaint: read('--ink-faint'),
      cobalt: read('--cobalt'),
      cobaltDeep: read('--cobalt-deep'),
    };
  });

  // The adversarial case: a pure-black frame. White at 70% over black is #b3b3b3,
  // not white — which is exactly why the wash layer has to exist.
  const BLACK = [0, 0, 0];
  const washed = over(parseColour(tokens.wash), BLACK);
  const composite = over(parseColour(tokens.glass), washed);

  const failures: string[] = [];
  for (const [name, value] of Object.entries(tokens)) {
    if (name === 'glass' || name === 'wash') continue;
    const r = ratio(parseColour(value).slice(0, 3), composite);
    if (r < AA) failures.push(`${name} ${r.toFixed(2)}:1 on ${composite.map(Math.round).join(',')}`);
  }

  expect(failures, 'every text token permitted on .glass must clear 4.5:1').toEqual([]);
});

test('state chips never sit on glass', async ({ page }) => {
  // Their color-mix fills darken the composite toward the state colour, which
  // drops three of the four labels to 3.9-4.4:1. They belong on solid surfaces.
  for (const path of ALL_PATHS) {
    await page.goto(path);
    await expect(
      page.locator('.glass .state, .glass .legend'),
      `state chip on glass at ${path}`,
    ).toHaveCount(0);
  }
});

test('reduced motion means the film is never created', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['./', './market/']) {
    await page.goto(path);
    await page.waitForLoadState('load');
    await expect(page.locator('video'), `video present at ${path}`).toHaveCount(0);
  }
});

test('the film hero degrades to a gradient, never to nothing', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');

  // The base layer is the entire backdrop when there is no film, so it has to
  // carry a real background rather than being an empty div.
  const background = await page
    .locator('.hero-film__base')
    .evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(background).not.toBe('none');

  await expect(page.locator('.hero-film__plate')).toBeVisible();
  await expect(page.locator('.hero-film h1')).toBeVisible();
});
