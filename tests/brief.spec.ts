import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Account briefs are the one place on this site that names a real prospect, so
 * the rules that make that defensible are asserted rather than trusted:
 * unlisted, unindexed, sourced, and free of personal data.
 */

const BRIEF = './brief/henrison/';

test('the brief is unlisted and unindexed', async ({ page, request, baseURL }) => {
  await page.goto(BRIEF);

  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  const content = (await robots.getAttribute('content')) ?? '';
  expect(content).toContain('noindex');
  expect(content).toContain('nofollow');

  // Absent from the sitemap: we do not hand a prospect's name to a crawler.
  const sitemap = await request.get(new URL('sitemap-0.xml', baseURL).toString());
  if (sitemap.ok()) {
    expect(await sitemap.text()).not.toContain('/brief/');
  }

  // And unreachable by navigation from the public site.
  await page.goto('./');
  await expect(page.locator('a[href*="/brief/"]')).toHaveCount(0);
});

test('every quotation about the firm carries a source and a retrieval date', async ({ page }) => {
  await page.goto(BRIEF);

  const cards = page.locator('.quote-card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(2);

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await expect(card.locator('blockquote')).not.toBeEmpty();
    await expect(card.locator('a[href^="http"]')).toHaveCount(1);
    await expect(card).toContainText(/\d{4}-\d{2}-\d{2}/);
  }

  // Competitor quotes are labelled as vendor claims, not as findings.
  await expect(page.locator('.versus__col--them')).toContainText(/not independently verified/i);
});

test('the brief names no individual and carries no contact details', async ({ page }) => {
  await page.goto(BRIEF);
  const text = (await page.locator('main').innerText()).replace(/\s+/g, ' ');

  // The two research consultants are published on the firm's own site; naming
  // them in a hosted page is exactly what this brief format avoids.
  expect(text).not.toMatch(/Harald|Diesen|Ana Henrique/i);
  expect(text).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  expect(text).not.toMatch(/\+\d{1,3}[\s-]?\d[\d\s-]{6,}/);

  // It is addressed to a role.
  await expect(page.locator('.brief__meta')).toContainText(/Senior Research Consultant/i);
});

test('the brief states what is not known', async ({ page }) => {
  await page.goto(BRIEF);
  const unknowns = page.locator('#unknowns .checklist li');
  expect(await unknowns.count()).toBeGreaterThanOrEqual(4);
});

test('axe: the brief', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BRIEF);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
});

test('the brief has no horizontal overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(BRIEF);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
