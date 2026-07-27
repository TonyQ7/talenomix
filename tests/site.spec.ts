import { expect, test, type Page } from '@playwright/test';
import { en } from '../src/i18n/en';
import { ALL_PATHS, CTA_DESTINATIONS, ROUTES } from './routes';

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

  test('fragment links resolve to real elements on every route', async ({ page }) => {
    for (const path of ALL_PATHS) {
      await page.goto(path);
      const targets = await page.locator('a[href*="#"]').evaluateAll((els) =>
        els.map((el) => {
          const url = new URL((el as HTMLAnchorElement).href);
          return { page: `${url.origin}${url.pathname}`, hash: url.hash };
        }).filter((target) => target.hash.length > 1),
      );

      for (const target of new Map(targets.map((item) => [`${item.page}${item.hash}`, item])).values()) {
        await page.goto(target.page);
        await expect(page.locator(target.hash), `${target.hash} linked from ${path}`).toHaveCount(1);
      }
    }
  });

  test('hero CTA opens the product demo', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: /See the product in action/i }).click();
    await expect(page).toHaveURL(CTA_DESTINATIONS.heroDemo);
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
  test('the public/private boundary appears on every page', async ({ page }) => {
    for (const path of ALL_PATHS) {
      await page.goto(path);
      await expect(page.locator('.public-boundary')).toBeVisible();
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
    await expect(page.locator('.dm-overview .dm-metric')).toHaveCount(en.demo.overviewStats.length);
    await expect(page.locator('.dm-responsibility')).toHaveCount(en.demo.steps.length);
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
    await expect(steps).toHaveCount(en.demo.steps.length);
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

  /**
   * Third-party requests, route by route.
   *
   * This used to assert only that /demo/ stayed silent, which left the other
   * fifteen routes entirely unconstrained — so the site's first external
   * request could have appeared anywhere without a test noticing. The film is
   * exactly that request, so the assertion is now an explicit allowlist and the
   * functional routes are held at zero.
   */
  const FILM_ORIGIN = 'https://d8j0ntlcm91z4.cloudfront.net';

  function watchExternal(page: Page): string[] {
    const seen: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) return;
      if (url.startsWith('data:') || url.startsWith('blob:')) return;
      seen.push(url);
    });
    return seen;
  }

  test('the functional routes make no third-party calls at all', async ({ page }) => {
    // These carry `media="still"`, which is what makes the guarantee structural:
    // with no film slot in the markup there is nothing for the script to fetch.
    const external = watchExternal(page);

    for (const path of ['./demo/', './method/', './privacy/', './sv/integritet/']) {
      await page.goto(path);
      await page.waitForLoadState('load');
    }
    await page.goto('./demo/');
    await page.locator('#demo-next').click();
    await page.waitForTimeout(500);

    expect(external, 'the functional routes must not call out').toEqual([]);
  });

  test('the marketing routes call out to the film host and nowhere else', async ({
    page,
    isMobile,
  }) => {
    const external = watchExternal(page);

    for (const path of ['./', './market/', './for/executive-search/', './sv/']) {
      await page.goto(path);
      await page.waitForLoadState('load');
      await page.waitForTimeout(300);
    }

    const origins = [...new Set(external.map((u) => new URL(u).origin))].sort();
    expect(origins, 'unexpected third-party origin on a marketing route').toEqual(
      // Below the 64rem gate the film is never created, so mobile is silent too.
      isMobile ? [] : [FILM_ORIGIN],
    );
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

  test('market source links and diagnostic price are keyboard reachable', async ({ page }) => {
    await page.goto('./market/');
    const source = page.locator('.coverage-table a').first();
    await source.focus();
    await expect(source).toBeFocused();
    await page.goto('./');
    await expect(page.locator('.offer-price')).toContainText(/55\s?000/);
  });
});

test.describe('nav pill', () => {
  // Regression: `.site-nav--primary` and `.site-nav` have equal specificity, so
  // a display-none media query placed before `.site-nav { display: flex }` loses
  // on source order and both navigations render at once. 166 tests passed while
  // that was broken; Lighthouse's target-size audit is what surfaced it.
  test('exactly one navigation is visible at any width', async ({ page }) => {
    for (const width of [320, 412, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('./');

      const inline = await page.locator('.site-nav--primary').isVisible();
      const disclosure = await page.locator('.nav-disclosure').isVisible();

      expect(
        [inline, disclosure].filter(Boolean).length,
        `at ${width}px: inline=${inline} disclosure=${disclosure}`,
      ).toBe(1);
    }
  });

  test('every pill target clears the 24px minimum', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 900 });
    await page.goto('./');

    const small = await page.locator('.nav-pill a, .nav-pill summary').evaluateAll((els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { tag: el.tagName, w: Math.round(r.width), h: Math.round(r.height) };
        })
        .filter((b) => b.w < 24 || b.h < 24),
    );

    expect(small, 'targets under 24x24 CSS px (WCAG 2.5.8)').toEqual([]);
  });
});
