import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright drives the built static output through `astro preview`, so tests run
 * against exactly what GitHub Pages will serve — including the `/talenomix/` base path.
 */
const PORT = 4321;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  workers: process.env['CI'] ? 2 : undefined,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : [['list']],
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://localhost:${PORT}/talenomix/`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // The no-JS suite asserts the unenhanced baseline, so it must not also run in
    // the projects that have JavaScript enabled.
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      testIgnore: /no-js\.spec\.ts/,
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testIgnore: /no-js\.spec\.ts/,
    },
    {
      name: 'no-js',
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
      testMatch: /no-js\.spec\.ts/,
    },
  ],
  webServer: {
    command: `npm run preview -- --port ${PORT} --host 127.0.0.1`,
    url: `http://localhost:${PORT}/talenomix/`,
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
    stdout: 'ignore',
  },
});
