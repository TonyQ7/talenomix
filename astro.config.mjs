// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Talenomix static site.
 *
 * Deployment target is the GitHub Pages project site described in PLAN.md section 3:
 * https://tonyq7.github.io/talenomix/
 *
 * No adapter, no backend, no analytics, no cookies. Everything is prerendered.
 */
export default defineConfig({
  site: 'https://tonyq7.github.io',
  base: '/talenomix',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  scopedStyleStrategy: 'class',
  integrations: [
    sitemap({
      // Account briefs are prepared for one named firm and delivered by link.
      // They carry noindex as well; keeping them out of the sitemap means we are
      // not the ones publishing a prospect's name to a crawler.
      filter: (page) => !page.endsWith('/404/') && !page.includes('/brief/'),
    }),
  ],
});
