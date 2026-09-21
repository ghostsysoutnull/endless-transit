import { defineConfig, devices } from '@playwright/test';

/** Same default as vite.config.ts: the production sub-path. ET_BASE moves both together. */
const BASE_PATH = process.env.ET_BASE ?? '/endless-transit/play/';
const PORT = 4173;

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: process.env.CI !== undefined,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: `http://localhost:${String(PORT)}${BASE_PATH}`,
    trace: 'retain-on-failure',
  },
  // Decision 3: every browser test runs twice — a desktop and a phone held upright, touch only.
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  // The real thing: the production build, served by `vite preview` under the real base path.
  webServer: {
    command: 'npm run build && npm run preview',
    url: `http://localhost:${String(PORT)}${BASE_PATH}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
