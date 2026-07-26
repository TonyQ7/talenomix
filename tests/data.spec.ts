import { expect, test } from '@playwright/test';
import { CLAIMS } from '../src/data/claims';
import { MARKET_FIGURES } from '../src/data/market';

test('every public market figure is traceable and non-speculative', () => {
  const claimIds = new Set(CLAIMS.map((claim) => claim.id));
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  for (const figure of MARKET_FIGURES) {
    expect(claimIds.has(figure.sourceId), `${figure.id} sourceId`).toBe(true);
    expect(new Date(`${figure.retrievedOn}T00:00:00Z`).getTime()).toBeLessThanOrEqual(
      today.getTime(),
    );
    expect(figure.basis).not.toBe('estimate');
    if (figure.value === null) {
      expect(figure.basis).toBe('review-in-progress');
    }
  }
});

test('the market page renders figures from the data contract', async ({ page }) => {
  await page.goto('./market/');
  await expect(page.locator('.market-metric')).toHaveCount(MARKET_FIGURES.length);
  for (const figure of MARKET_FIGURES) {
    await expect(page.locator('.market-metric')).toContainText([figure.label.en]);
  }
});
