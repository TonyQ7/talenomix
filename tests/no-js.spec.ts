import { expect, test } from '@playwright/test';
import { ALL_PATHS, ROUTES } from './routes';
import { en } from '../src/i18n/en';
import { DEMO_TOTAL } from '../src/data/demo';

/**
 * Runs in the `no-js` Playwright project with javaScriptEnabled: false.
 *
 * PLAN.md requires the demo to work without JavaScript as a readable walkthrough
 * and the site to render completely. The reveal-motion styles are gated behind a
 * class that only a running script can add, so "no JS" must mean "everything
 * visible", never "everything faded out".
 */

test('every page renders its content without JavaScript', async ({ page }) => {
  for (const path of ALL_PATHS) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Nothing may be left invisible by the reveal styles.
    const hidden = await page.locator('[data-reveal]').evaluateAll((els) =>
      els.filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
    );
    expect(hidden, `hidden reveal elements on ${path}`).toBe(0);
  }
});

test('the language toggle works without JavaScript', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route.en);
    await page
      .locator('header .lang-toggle')
      .getByRole('link', { name: /Svenska/i })
      .click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'sv');
    await expect(page.locator('h1')).toHaveText(route.h1.sv);
  }
});

test('the demo is a complete walkthrough with all seven steps visible', async ({ page }) => {
  for (const path of ['./demo/', './sv/demo/']) {
    await page.goto(path);

    const steps = page.locator('.dm-step');
    await expect(steps).toHaveCount(en.demo.steps.length);

    for (let i = 0; i < en.demo.steps.length; i++) {
      await expect(steps.nth(i), `step ${i + 1} on ${path}`).toBeVisible();
    }

    // Stepper-only affordances stay hidden rather than rendering as dead controls.
    await expect(page.locator('#demo-controls')).toBeHidden();
    await expect(page.locator('.dm-filter')).toBeHidden();

    // The substance of every step is still present.
    await expect(page.locator('#universe-table tbody tr')).toHaveCount(DEMO_TOTAL);
    await expect(page.locator('.dm-csv')).toBeVisible();
    await expect(page.locator('.dm-held__item')).toHaveCount(3);
  }
});

test('the synthetic notice is visible without JavaScript', async ({ page }) => {
  await page.goto('./demo/');
  await expect(page.locator('.dm-notice')).toBeVisible();
  await expect(page.locator('.dm-notice')).toContainText(/fictional|no real personal data/i);
});
