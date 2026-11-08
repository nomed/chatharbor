import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: true, forbidOnly: !!process.env.CI, retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:1420', browserName: 'chromium', headless: true,
    launchOptions: process.env.CHATHARBOR_CHROMIUM ? { executablePath: process.env.CHATHARBOR_CHROMIUM } : {} },
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:1420', reuseExistingServer: !process.env.CI },
});
