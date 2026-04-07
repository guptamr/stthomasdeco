// @ts-check
const { test, expect } = require('@playwright/test');

/* ============================================================
   A — Sticky Header
   ============================================================ */
test.describe('A — Sticky Header', () => {
  test('1: Header starts transparent', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('#header');
    await expect(header).not.toHaveClass(/header--scrolled/);
  });

  test('2: Header becomes opaque on scroll', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => { window.scrollBy(0, 200); });
    await page.waitForTimeout(300);
    const header = page.locator('#header');
    await expect(header).toHaveClass(/header--scrolled/);
  });

  test('3: Header returns transparent at top', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => { window.scrollBy(0, 200); });
    await page.waitForTimeout(300);
    await page.evaluate(() => { window.scrollTo(0, 0); });
    await page.waitForTimeout(300);
    const header = page.locator('#header');
    await expect(header).not.toHaveClass(/header--scrolled/);
  });
});

/* ============================================================
   B — Mobile Menu (hamburger)
   ============================================================ */
test.describe('B — Mobile Menu', () => {
  test('4: Hamburger hidden on desktop', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 769, 'Desktop only');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeHidden();
  });

  test('5: Hamburger visible on mobile', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 768, 'Mobile only');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeVisible();
  });

  test('6: Menu opens on tap', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 768, 'Mobile only');
    await page.goto('/');
    await page.locator('#hamburger').click();
    const nav = page.locator('#nav');
    await expect(nav).toHaveClass(/open/);
  });

  test('7: Menu closes on link click', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 768, 'Mobile only');
    await page.goto('/');
    await page.locator('#hamburger').click();
    await page.locator('.nav__link').first().click();
    const nav = page.locator('#nav');
    await expect(nav).not.toHaveClass(/open/);
  });

  test('8: aria-expanded toggles', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 768, 'Mobile only');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   C — Smooth Scroll / Navigation
   ============================================================ */
test.describe('C — Smooth Scroll / Navigation', () => {
  test('9: Get a Free Quote scrolls to contact', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('a.btn--gold[href="#contact"]').click();
    await page.waitForTimeout(4000);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(1000);
  });

  test('10: Nav links scroll to correct sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const sections = ['about', 'services', 'gallery', 'contact'];
    for (const id of sections) {
      if ((page.viewportSize()?.width ?? 0) <= 768) {
        const nav = page.locator('#nav');
        const isOpen = await nav.evaluate((el) => el.classList.contains('open'));
        if (!isOpen) {
          await page.locator('#hamburger').click();
          await page.waitForTimeout(300);
        }
      }
      const beforeY = await page.evaluate(() => window.scrollY);
      await page.locator(`a.nav__link[href="#${id}"]`).click();
      await page.waitForTimeout(2000);
      const afterY = await page.evaluate(() => window.scrollY);
      // Verify that clicking the link actually scrolled the page
      expect(afterY).toBeGreaterThan(beforeY);
    }
  });

  test('11: Active nav highlight', async ({ page }) => {
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const link = page.locator('a.nav__link[href="#services"]');
    await expect(link).toHaveClass(/active/);
  });
});

/* ============================================================
   D — Scroll Reveal
   ============================================================ */
test.describe('D — Scroll Reveal', () => {
  test('12: Elements start hidden', async ({ page }) => {
    await page.goto('/');
    const firstReveal = page.locator('.reveal').first();
    await expect(firstReveal).not.toHaveClass(/visible/);
  });

  test('13: Elements become visible on scroll', async ({ page }) => {
    await page.goto('/');
    const aboutReveal = page.locator('#about .reveal').first();
    await aboutReveal.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(aboutReveal).toHaveClass(/visible/);
  });
});

/* ============================================================
   E — Gallery Filters
   ============================================================ */
test.describe('E — Gallery Filters', () => {
  test('14: All filter shows everything', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('.gallery-filter[data-filter="all"]').click();
    const hidden = page.locator('.gallery__item--hidden');
    await expect(hidden).toHaveCount(0);
  });

  test('15: Category filter hides others', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('.gallery-filter[data-filter="wedding"]').click();
    await page.waitForTimeout(300);
    const hidden = page.locator('.gallery__item--hidden');
    const hiddenCount = await hidden.count();
    expect(hiddenCount).toBeGreaterThan(0);
    const visible = page.locator('.gallery__item:not(.gallery__item--hidden)');
    const count = await visible.count();
    for (let i = 0; i < count; i++) {
      const cat = await visible.nth(i).getAttribute('data-category');
      expect(cat).toBe('wedding');
    }
  });

  test('16: Active filter gets highlighted', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const btn = page.locator('.gallery-filter[data-filter="birthday"]');
    await btn.click();
    await expect(btn).toHaveClass(/gallery-filter--active/);
  });

  test('17: Filter re-click shows all', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('.gallery-filter[data-filter="wedding"]').click();
    await page.waitForTimeout(200);
    await page.locator('.gallery-filter[data-filter="all"]').click();
    await page.waitForTimeout(200);
    const hidden = page.locator('.gallery__item--hidden');
    await expect(hidden).toHaveCount(0);
  });
});

/* ============================================================
   F — Lightbox
   ============================================================ */
test.describe('F — Lightbox', () => {
  test('18: Gallery click opens lightbox', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery__item').first().click();
    await page.waitForTimeout(300);
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toHaveAttribute('open', '');
  });

  test('19: Lightbox shows correct image', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const thirdItem = page.locator('.gallery__item').nth(2);
    const expectedSrc = await thirdItem.getAttribute('href');
    await thirdItem.click();
    await page.waitForTimeout(300);
    const lightboxSrc = await page.locator('#lightboxImg').getAttribute('src');
    expect(lightboxSrc).toContain(expectedSrc);
  });

  test('20: Close button closes lightbox', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery__item').first().click();
    await page.waitForTimeout(300);
    await page.locator('#lightboxClose').click();
    await page.waitForTimeout(300);
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).not.toHaveAttribute('open', '');
  });

  test('21: Arrow keys navigate', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery__item').first().click();
    await page.waitForTimeout(300);
    const firstSrc = await page.locator('#lightboxImg').getAttribute('src');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    const secondSrc = await page.locator('#lightboxImg').getAttribute('src');
    expect(secondSrc).not.toBe(firstSrc);
  });

  test('22: Prev/Next buttons work', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery__item').first().click();
    await page.waitForTimeout(300);
    const firstSrc = await page.locator('#lightboxImg').getAttribute('src');
    await page.locator('#lightboxNext').click();
    await page.waitForTimeout(300);
    const nextSrc = await page.locator('#lightboxImg').getAttribute('src');
    expect(nextSrc).not.toBe(firstSrc);
  });

  test('23: Escape closes lightbox', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery__item').first().click();
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).not.toHaveAttribute('open', '');
  });

  test('24: Filtered gallery lightbox nav', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('.gallery-filter[data-filter="wedding"]').click();
    await page.waitForTimeout(300);
    await page.locator('.gallery__item:not(.gallery__item--hidden)').first().click();
    await page.waitForTimeout(300);
    const allWedding = await page.locator('.gallery__item:not(.gallery__item--hidden)').count();
    for (let i = 0; i < allWedding; i++) {
      const src = await page.locator('#lightboxImg').getAttribute('src');
      const relativeSrc = src.replace(/^https?:\/\/[^/]+\//, '');
      const matchingItem = page.locator(`.gallery__item[href="${relativeSrc}"]`);
      const cat = await matchingItem.getAttribute('data-category');
      expect(cat).toBe('wedding');
      if (i < allWedding - 1) {
        await page.locator('#lightboxNext').click();
        await page.waitForTimeout(200);
      }
    }
  });
});

/* ============================================================
   G — Service Card Carousels
   ============================================================ */
test.describe('G — Service Card Carousels', () => {
  test('25: First slide active on load', async ({ page }) => {
    await page.goto('/');
    const carousels = page.locator('.card__carousel');
    const count = await carousels.count();
    for (let i = 0; i < count; i++) {
      const firstSlide = carousels.nth(i).locator('.card__slide').first();
      await expect(firstSlide).toHaveClass(/card__slide--active/);
    }
  });

  test('26: Slides auto-rotate', async ({ page }) => {
    await page.goto('/');
    const carousel = page.locator('.card__carousel').first();
    const firstSlide = carousel.locator('.card__slide').first();
    const secondSlide = carousel.locator('.card__slide').nth(1);
    await expect(firstSlide).toHaveClass(/card__slide--active/);
    await page.waitForTimeout(3500);
    await expect(secondSlide).toHaveClass(/card__slide--active/);
    await expect(firstSlide).not.toHaveClass(/card__slide--active/);
  });

  test('27: Dots sync with slides', async ({ page }) => {
    await page.goto('/');
    const carousel = page.locator('.card__carousel').first();
    const firstDot = carousel.locator('.card__dot').first();
    const secondDot = carousel.locator('.card__dot').nth(1);
    await expect(firstDot).toHaveClass(/card__dot--active/);
    await page.waitForTimeout(3500);
    await expect(secondDot).toHaveClass(/card__dot--active/);
    await expect(firstDot).not.toHaveClass(/card__dot--active/);
  });
});

/* ============================================================
   H — Gallery Preloader
   ============================================================ */
test.describe('H — Gallery Preloader', () => {
  test('28: Images near viewport become eager', async ({ page }) => {
    await page.goto('/');
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const eagerCount = await page.locator('.gallery__item img[loading="eager"]').count();
    expect(eagerCount).toBeGreaterThan(0);
  });
});

/* ============================================================
   I — Contact Form
   ============================================================ */
test.describe('I — Contact Form', () => {
  test('29: Required fields enforce', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL('/');
  });

  test('30: Honeypot field is hidden', async ({ page }) => {
    await page.goto('/');
    const honey = page.locator('input[name="_honey"]');
    await expect(honey).toBeAttached();
    await expect(honey).toBeHidden();
  });

  test('31: Form action URL correct', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#contactForm');
    await expect(form).toHaveAttribute('action', 'https://formsubmit.co/rajapakshethakshala@gmail.com');
  });

  test('32: Date input height is constrained', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const dateInput = page.locator('#eventDate');
    const box = await dateInput.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(38);
    expect(box?.height).toBeLessThanOrEqual(52);
  });
});

/* ============================================================
   J — Accessibility
   ============================================================ */
test.describe('J — Accessibility', () => {
  test('33: All images have alt text', async ({ page }) => {
    await page.goto('/');
    const noAlt = await page.locator('img:not([alt])').count();
    expect(noAlt).toBe(0);
    const emptyAlt = await page.locator('img[alt=""]:not(#lightboxImg)').count();
    expect(emptyAlt).toBe(0);
  });

  test('34: External links have rel', async ({ page }) => {
    await page.goto('/');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('35: aria-label on hamburger', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    const label = await hamburger.getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

  test('36: Lightbox has aria-label', async ({ page }) => {
    await page.goto('/');
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toHaveAttribute('aria-label');
    await expect(page.locator('#lightboxClose')).toHaveAttribute('aria-label');
    await expect(page.locator('#lightboxPrev')).toHaveAttribute('aria-label');
    await expect(page.locator('#lightboxNext')).toHaveAttribute('aria-label');
  });
});

/* ============================================================
   K — Meta / SEO
   ============================================================ */
test.describe('K — Meta / SEO', () => {
  test('37: Title tag present', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toContain('St.Thomas Deco');
  });

  test('38: Meta description present', async ({ page }) => {
    await page.goto('/');
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content?.length).toBeGreaterThan(20);
  });

  test('39: Open Graph tags present', async ({ page }) => {
    await page.goto('/');
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBeTruthy();
  });

  test('40: CSP meta tag present', async ({ page }) => {
    await page.goto('/');
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
    const content = await csp.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content).toContain('default-src');
  });
});
