// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'Tablet',
      use: {
        browserName: 'chromium',
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'Desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
  ],

  webServer: {
    command: 'node -e "var h=require(\'http\'),f=require(\'fs\'),p=require(\'path\'),m={\'.html\':\'text/html\',\'.css\':\'text/css\',\'.js\':\'application/javascript\',\'.jpg\':\'image/jpeg\',\'.jpeg\':\'image/jpeg\',\'.png\':\'image/png\',\'.gif\':\'image/gif\',\'.svg\':\'image/svg+xml\'};h.createServer(function(q,r){var u=q.url.split(\'?\')[0];if(u===\'/\')u=\'/index.html\';f.readFile(p.join(\'.\',u),function(e,d){if(e){r.writeHead(404);r.end();return}r.writeHead(200,{\'Content-Type\':m[p.extname(u)]||\'application/octet-stream\'});r.end(d)})}).listen(8000)"',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.003,
    },
  },
});
