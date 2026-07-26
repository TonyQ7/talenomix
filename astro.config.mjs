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
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
});
