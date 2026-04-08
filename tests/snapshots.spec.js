// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Helper: wait for all lazy images in a section to load,
 * scroll-reveal animations to finish, and hero animation to settle.
 * Stops carousel auto-rotation and resets to first slide for deterministic screenshots.
 * @param {import('@playwright/test').Page} page
 */
async function waitForReady(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
  // Stop carousel intervals and reset to first slide for deterministic screenshots
  await page.evaluate(() => {
    const highestId = Number(globalThis.setInterval(() => {}, 0));
    for (let i = 0; i <= highestId; i++) globalThis.clearInterval(i);
    document.querySelectorAll('.card__carousel').forEach(carousel => {
      carousel.querySelectorAll('.card__slide').forEach((slide, idx) => {
        slide.classList.toggle('card__slide--active', idx === 0);
      });
      carousel.querySelectorAll('.card__dot').forEach((dot, idx) => {
        dot.classList.toggle('card__dot--active', idx === 0);
      });
    });
  });
}

/* ============================================================
   Full Page Snapshots (S1–S6)
   ============================================================ */
test.describe('Full Page Snapshots', function () {
  test('S1: home-full — Hero visible', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await expect(page).toHaveScreenshot('home-full.png');
  });

  test('S2: about-section', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('about-section.png');
  });

  test('S3: services-section', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('services-section.png');
  });

  test('S4: gallery-section', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('gallery-section.png');
  });

  test('S6: footer', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(footer).toHaveScreenshot('footer.png');
  });
});

/* ============================================================
   Component Snapshots (S7–S15)
   ============================================================ */
test.describe('Component Snapshots', function () {
  test('S7: header-transparent', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    const header = page.locator('#header');
    await expect(header).toHaveScreenshot('header-transparent.png');
  });

  test('S8: header-scrolled', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.evaluate(function () { window.scrollBy(0, 200); });
    await page.waitForTimeout(500);
    const header = page.locator('#header');
    await expect(header).toHaveScreenshot('header-scrolled.png');
  });

  test('S9: mobile-menu-open', async function ({ page }) {
    test.skip((page.viewportSize()?.width ?? 0) > 768, 'Mobile only');
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#hamburger').click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('mobile-menu-open.png');
  });

  test('S10: hero-cta', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    const hero = page.locator('#home');
    await expect(hero).toHaveScreenshot('hero-cta.png');
  });

  test('S11: service-card', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const card = page.locator('.card').first();
    await expect(card).toHaveScreenshot('service-card.png');
  });

  test('S12: gallery-filter-wedding', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery-filter[data-filter="wedding"]').click();
    await page.waitForTimeout(500);
    const gallery = page.locator('.gallery');
    await expect(gallery).toHaveScreenshot('gallery-filter-wedding.png');
  });

  test('S13: lightbox-open', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery__item').first().click();
    await page.waitForTimeout(500);
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toHaveScreenshot('lightbox-open.png');
  });

  test('S14: contact-form', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const form = page.locator('.contact__form-wrap');
    await expect(form).toHaveScreenshot('contact-form.png');
  });

  test('S15: quote-banner', async function ({ page }) {
    await page.goto('/');
    await waitForReady(page);
    const banner = page.locator('.quote-banner');
    await banner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(banner).toHaveScreenshot('quote-banner.png');
  });
});

/* ============================================================
   Responsive-Specific Snapshots (S16–S20)
   ============================================================ */
test.describe('Responsive-Specific Snapshots', function () {
  test('S16: gallery-1col (mobile 375px)', async function ({ page }) {
    test.skip((page.viewportSize()?.width ?? 0) > 480, 'Mobile only');
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const gallery = page.locator('.gallery');
    await expect(gallery).toHaveScreenshot('gallery-1col.png');
  });

  test('S17: gallery-2col (tablet 768px)', async function ({ page }) {
    const vw = page.viewportSize();
    test.skip(vw === null || vw.width < 481 || vw.width > 768, 'Tablet only');
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const gallery = page.locator('.gallery');
    await expect(gallery).toHaveScreenshot('gallery-2col.png');
  });

  test('S18: gallery-3col (desktop 1440px)', async function ({ page }) {
    test.skip((page.viewportSize()?.width ?? Infinity) < 769, 'Desktop only');
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const gallery = page.locator('.gallery');
    await expect(gallery).toHaveScreenshot('gallery-3col.png');
  });

  test('S19: about-stacked (mobile 375px)', async function ({ page }) {
    test.skip((page.viewportSize()?.width ?? 0) > 480, 'Mobile only');
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const about = page.locator('.about');
    await expect(about).toHaveScreenshot('about-stacked.png');
  });

  test('S20: about-grid (desktop 1440px)', async function ({ page }) {
    test.skip((page.viewportSize()?.width ?? Infinity) < 769, 'Desktop only');
    await page.goto('/');
    await waitForReady(page);
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const about = page.locator('.about');
    await expect(about).toHaveScreenshot('about-grid.png');
  });
});
