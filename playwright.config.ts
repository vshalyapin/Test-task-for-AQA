import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'https://dzen.ru/'

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests',
  
  // Fail the build on CI if you accidentally left test.only in the source code.
  // forbidOnly: !!process.env.CI,

  // Sets timeout for each test case
  // timeout: 120000,

  // Give failing tests 2 retry attempts
  retries: 2,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,

  // Control the maximum number of parallel worker processes. It's recommended to set workers to "1" in CI environments to prioritize stability and reproducibility
  workers: 3,
  /* Opt out of parallel tests on CI : locally. */
  // workers: process.env.CI ? 1 : 3,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['line'],
    ['allure-playwright'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,
    headless: false,
    ignoreHTTPSErrors: true,
    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',
    // Record video only when retrying a test for the first time.
    video: 'on-first-retry',
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});