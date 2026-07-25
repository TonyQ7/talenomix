import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import type { Result } from 'axe-core';
import { ALL_PATHS } from './routes';

/**
 * PLAN.md section 5 requires zero serious or critical Axe violations.
 * We assert on all impact levels but report the serious/critical ones first,
 * because those are the gate.
 */
async function scan(page: Page, path: string) {
  // Reveal transitions are mid-flight when axe samples the page, and it then
  // measures the blended colour of a half-faded element rather than the colour
  // the user actually reads. Reduced motion pins every element to its settled
  // state, which is the state worth auditing.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path);
  return new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
}

/** Renders a violation with enough detail to fix it without re-running by hand. */
function describe(violation: Result): string {
  const nodes = violation.nodes
    .slice(0, 4)
    .map((n) => `      ${n.target.join(' ')}\n        ${n.failureSummary?.replace(/\n/g, '\n        ')}`)
    .join('\n');
  return `${violation.id} (${violation.impact}) — ${violation.help}\n${nodes}`;
}

for (const path of ALL_PATHS) {
  test(`axe: ${path}`, async ({ page }) => {
    const results = await scan(page, path);

    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );

    expect(
      blocking.map(describe),
      `serious/critical accessibility violations on ${path}`,
    ).toEqual([]);

    // Moderate and minor issues fail too; the site is small enough to keep clean.
    expect(
      results.violations.map((v) => `${v.id} (${v.impact})`),
      `accessibility violations on ${path}`,
    ).toEqual([]);
  });
}

test('the demo stays accessible after stepping and filtering', async ({ page }) => {
  await page.goto('./demo/');
  await page.locator('#demo-next').click();
  await page.locator('#demo-next').click();
  await page.locator('#state-filter').selectOption('included');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
});

test('every image-role SVG has an accessible name', async ({ page }) => {
  await page.goto('./');
  const maps = page.locator('svg[role="img"]');
  const count = await maps.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const labelled = await maps.nth(i).getAttribute('aria-labelledby');
    expect(labelled, 'the mandate map must be described for screen readers').toBeTruthy();
    for (const id of labelled!.split(/\s+/)) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  }
});
