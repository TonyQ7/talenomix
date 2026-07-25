import { expect, test } from '@playwright/test';
import { ALL_PATHS, ROUTES } from './routes';

test.describe('pages render', () => {
  for (const route of ROUTES) {
    for (const locale of ['en', 'sv'] as const) {
      test(`${route.key} (${locale}) has one h1 and the right language`, async ({ page }) => {
        await page.goto(route[locale]);

        await expect(page.locator('html')).toHaveAttribute('lang', locale);

        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);
        await expect(h1).toHaveText(route.h1[locale]);

        // `page.locator('title')` also matches the SVG <title> in the map, so the
        // document title is read directly.
        expect((await page.title()).length).toBeGreaterThan(20);
        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveCount(1);
        expect((await description.getAttribute('content'))?.length ?? 0).toBeGreaterThan(60);
      });
    }
  }
});

test.describe('EN/SV toggle', () => {
  for (const route of ROUTES) {
    test(`${route.key}: EN → SV → EN returns to the same page`, async ({ page }) => {
      await page.goto(route.en);

      const toggle = page.locator('header .lang-toggle');
      await expect(toggle).toBeVisible();

      // The current locale is marked, the other is a real link to its counterpart.
      await expect(toggle.locator('[aria-current="true"]')).toHaveText(/EN/);

      await toggle.getByRole('link', { name: /Svenska/i }).click();
      await expect(page).toHaveURL(new RegExp(`${route.sv.replace('./', '')}$`));
      await expect(page.locator('html')).toHaveAttribute('lang', 'sv');
      await expect(page.locator('h1')).toHaveText(route.h1.sv);

      await page
        .locator('header .lang-toggle')
        .getByRole('link', { name: /English/i })
        .click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('h1')).toHaveText(route.h1.en);
    });
  }

  test('the toggle is present in the footer too', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('footer .lang-toggle')).toBeVisible();
  });

  test('every page declares hreflang alternates for both locales', async ({ page }) => {
    for (const path of ALL_PATHS) {
      await page.goto(path);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="sv-SE"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    }
  });
});

test.describe('links and CTAs', () => {
  test('no internal link 404s and no CTA is dead', async ({ page, request, baseURL }) => {
    const seen = new Set<string>();

    for (const path of ALL_PATHS) {
      await page.goto(path);
      const hrefs = await page.locator('a[href]').evaluateAll((els) =>
        els.map((el) => (el as HTMLAnchorElement).href),
      );

      for (const href of hrefs) {
        if (!href.startsWith(baseURL!.replace(/\/$/, ''))) continue; // external checked elsewhere
        const url = href.split('#')[0]!;
        if (seen.has(url)) continue;
        seen.add(url);

        const response = await request.get(url);
        expect(response.status(), `${url} linked from ${path}`).toBeLessThan(400);
      }
    }

    expect(seen.size).toBeGreaterThan(4);
  });

  test('in-page anchors resolve to real elements', async ({ page }) => {
    for (const path of ['./', './sv/']) {
      await page.goto(path);
      const fragments = await page.locator('a[href*="#"]').evaluateAll((els) =>
        els
          .map((el) => new URL((el as HTMLAnchorElement).href).hash)
          .filter((hash) => hash.length > 1),
      );

      for (const hash of new Set(fragments)) {
        await expect(page.locator(hash), `${hash} on ${path}`).toHaveCount(1);
      }
    }
  });

  test('hero CTA opens the product demo', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: /See the product in action/i }).click();
    await expect(page).toHaveURL(/\/demo\/$/);
    await expect(page.locator('.dm-overview')).toBeVisible();
  });

  test('design-partner CTA reaches the design-partner section', async ({ page }) => {
    await page.goto('./');
    const cta = page.getByRole('link', { name: /Apply with one live mandate/i }).first();
    await cta.click();
    await expect(page.locator('#design-partners')).toBeVisible();
  });
});

test.describe('content guarantees', () => {
  test('the provisional-name disclosure appears on every page', async ({ page }) => {
    for (const path of ALL_PATHS) {
      await page.goto(path);
      await expect(page.locator('.provisional')).toBeVisible();
    }
  });

  test('the demo is labelled synthetic and names no individuals', async ({ page }) => {
    for (const path of ['./demo/', './sv/demo/']) {
      await page.goto(path);
      await expect(page.locator('.dm-notice')).toBeVisible();

      // The research queue is role-based by design; a personal name here would be
      // a regression in the product's central privacy claim.
      const queue = await page.locator('#step-research').innerText();
      expect(queue).not.toMatch(/\b[A-ZÅÄÖ][a-zåäö]+ [A-ZÅÄÖ][a-zåäö]+sson\b/);
    }
  });

  test('the demo shows the case context and a human checkpoint at every step', async ({ page }) => {
    await page.goto('./demo/#step-pack');

    await expect(page.locator('.dm-overview')).toBeVisible();
    await expect(page.locator('.dm-overview .dm-metric')).toHaveCount(4);
    await expect(page.locator('.dm-responsibility')).toHaveCount(7);
    await expect(page.locator('.dm-pack-preview')).toBeVisible();
    await expect(page.locator('.dm-pack-questions')).toContainText(/Finnish energy-systems/i);
  });

  test('claim ledger rows carry a source link and a retrieval date', async ({ page }) => {
    await page.goto('./method/');
    const rows = page.locator('#ledger .ledger tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(5);

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      await expect(row.locator('a[href^="http"]')).toHaveCount(1);
      await expect(row).toContainText(/\d{4}-\d{2}-\d{2}/);
    }
  });

  test('vendor claims are labelled as vendor claims', async ({ page }) => {
    await page.goto('./method/');
    const flags = page.locator('.ledger__flag');
    expect(await flags.count()).toBeGreaterThanOrEqual(3);
    await expect(flags.first()).toContainText(/not independently verified/i);
  });
});

test.describe('demo behaviour with JavaScript', () => {
  test('the stepper shows one step at a time and navigates', async ({ page }) => {
    await page.goto('./demo/');

    const steps = page.locator('.dm-step');
    await expect(steps).toHaveCount(7);
    await expect(steps.first()).toBeVisible();
    await expect(steps.nth(1)).toBeHidden();

    await expect(page.locator('#demo-prev')).toBeDisabled();
    await page.locator('#demo-next').click();
    await expect(steps.nth(1)).toBeVisible();
    await expect(steps.first()).toBeHidden();
    await expect(page.locator('#demo-prev')).toBeEnabled();
  });

  test('a deep link opens the requested step', async ({ page }) => {
    await page.goto('./demo/#step-export');
    await expect(page.locator('#step-export')).toBeVisible();
    await expect(page.locator('#step-upload')).toBeHidden();
  });

  test('the universe filter narrows the table', async ({ page }) => {
    await page.goto('./demo/#step-universe');
    const rows = page.locator('#universe-table tbody tr');
    const total = await rows.count();

    await page.locator('#state-filter').selectOption('excluded');
    const visible = rows.locator('visible=true');
    expect(await visible.count()).toBeLessThan(total);
    expect(await visible.count()).toBeGreaterThan(0);

    await page.locator('#state-filter').selectOption('all');
    expect(await rows.locator('visible=true').count()).toBe(total);
  });

  test('the demo makes no network calls to third parties', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith('http://localhost') && !url.startsWith('http://127.0.0.1') && !url.startsWith('data:')) {
        external.push(url);
      }
    });

    await page.goto('./demo/');
    await page.locator('#demo-next').click();
    await page.waitForTimeout(500);

    expect(external, 'the synthetic demo must not call out').toEqual([]);
  });
});

test.describe('keyboard navigation', () => {
  test('the skip link is the first stop and moves focus to main', async ({ page }) => {
    await page.goto('./');
    await page.keyboard.press('Tab');

    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('the language toggle is reachable and operable by keyboard', async ({ page }) => {
    await page.goto('./');
    const svLink = page.locator('header .lang-toggle').getByRole('link', { name: /Svenska/i });
    await svLink.focus();
    await expect(svLink).toBeFocused();
    await svLink.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('lang', 'sv');
  });

  test('FAQ entries open with the keyboard', async ({ page }) => {
    await page.goto('./');
    const first = page.locator('.faq__item').first();
    await first.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('open', '');
  });
});
