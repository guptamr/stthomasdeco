# Test Plan — stthomasdeco.ca

## Overview

Unit tests + visual snapshot tests for the static site using **Playwright** (browser automation, screenshot snapshots) and **Playwright Test** (assertions, test runner). No build tools needed — Playwright opens the HTML file directly.

---

## 1. Setup

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

**Config** (`playwright.config.js`):
- Base URL: `http://localhost:8000` (local Python server)
- Projects: 3 viewport sizes (mobile, tablet, desktop)
- Snapshot threshold: 0.3% pixel diff tolerance
- Screenshot directory: `tests/__snapshots__`

**Viewports to test:**

| Name | Width × Height | Represents |
|------|---------------|------------|
| Mobile | 375 × 812 | iPhone 13/14 |
| Tablet | 768 × 1024 | iPad |
| Desktop | 1440 × 900 | Laptop/Desktop |

---

## 2. Unit Tests (`tests/unit.spec.js`)

### A — Sticky Header
| # | Test | How |
|---|------|-----|
| 1 | Header starts transparent | Check `.header` does NOT have `.header--scrolled` at top |
| 2 | Header becomes opaque on scroll | Scroll 100px → assert `.header--scrolled` class present |
| 3 | Header returns transparent at top | Scroll down, then back to top → class removed |

### B — Mobile Menu (hamburger)
| # | Test | How |
|---|------|-----|
| 4 | Hamburger hidden on desktop | `.hamburger` should have `display: none` at 1440px |
| 5 | Hamburger visible on mobile | `.hamburger` should be visible at 375px |
| 6 | Menu opens on tap | Click `#hamburger` → `.nav` has `.open` class |
| 7 | Menu closes on link click | Open menu → click a `.nav__link` → `.open` removed |
| 8 | aria-expanded toggles | Click hamburger → `aria-expanded` = `"true"`, click again → `"false"` |

### C — Smooth Scroll / Navigation
| # | Test | How |
|---|------|-----|
| 9 | "Get a Free Quote" scrolls to contact | Click CTA → `#contact` section is in viewport |
| 10 | Nav links scroll to correct sections | Click each nav link → corresponding `section[id]` is visible |
| 11 | Active nav highlight | Scroll to `#services` → `a[href="#services"]` has `.active` |

### D — Scroll Reveal
| # | Test | How |
|---|------|-----|
| 12 | Elements start hidden | `.reveal` elements have `opacity: 0` initially |
| 13 | Elements become visible on scroll | Scroll to a `.reveal` → `.visible` class added |

### E — Gallery Filters
| # | Test | How |
|---|------|-----|
| 14 | "All" filter shows everything | Click "All" → no `.gallery__item--hidden` elements |
| 15 | Category filter hides others | Click "Wedding" → non-wedding items get `.gallery__item--hidden` |
| 16 | Active filter gets highlighted | Click "Birthday" → that button has `.gallery-filter--active` |
| 17 | Filter re-click shows all | Click "Wedding" then "All" → all items visible |

### F — Lightbox
| # | Test | How |
|---|------|-----|
| 18 | Gallery click opens lightbox | Click a `.gallery__item` → `#lightbox` has `[open]` |
| 19 | Lightbox shows correct image | Click 3rd gallery item → `#lightboxImg.src` matches that item's `href` |
| 20 | Close button closes lightbox | Click `#lightboxClose` → `[open]` removed |
| 21 | Arrow keys navigate | Open lightbox → press ArrowRight → image changes |
| 22 | Prev/Next buttons work | Click `#lightboxNext` → `currentIdx` advances |
| 23 | Escape closes lightbox | Press Escape → lightbox closes |
| 24 | Filtered gallery lightbox nav | Filter to "Wedding" → lightbox only navigates wedding images |

### G — Service Card Carousels
| # | Test | How |
|---|------|-----|
| 25 | First slide active on load | `.card__slide--active` exists on first slide of each carousel |
| 26 | Slides auto-rotate | Wait 3.5s → `.card__slide--active` is now on second slide |
| 27 | Dots sync with slides | After rotation, corresponding `.card__dot--active` moves |

### H — Gallery Preloader
| # | Test | How |
|---|------|-----|
| 28 | Images near viewport become eager | Scroll toward gallery → images switch from `loading="lazy"` to `loading="eager"` |

### I — Contact Form
| # | Test | How |
|---|------|-----|
| 29 | Required fields enforce | Submit empty form → browser validation prevents submit |
| 30 | Honeypot field is hidden | `input[name="_honey"]` exists and is not visible |
| 31 | Form action URL correct | `<form>` action = `https://formsubmit.co/stthomasdecobyraj@gmail.com` |
| 32 | Date input doesn't overflow | Select a date on mobile → input height stays at 2.75rem |

### J — Accessibility
| # | Test | How |
|---|------|-----|
| 33 | All images have alt text | `document.querySelectorAll('img:not([alt])')` returns 0 |
| 34 | External links have rel | All `target="_blank"` links also have `rel="noopener noreferrer"` |
| 35 | aria-label on hamburger | `#hamburger` has `aria-label` |
| 36 | Lightbox traps focus | When lightbox open, Tab cycles within lightbox |

### K — Meta / SEO
| # | Test | How |
|---|------|-----|
| 37 | Title tag present | `document.title` is not empty |
| 38 | Meta description present | `meta[name="description"]` has content |
| 39 | Open Graph tags present | `meta[property="og:title"]` exists with content |
| 40 | CSP header present | `meta[http-equiv="Content-Security-Policy"]` exists |

---

## 3. Visual Snapshot Tests (`tests/snapshots.spec.js`)

Each test captures a full-page screenshot and compares against a stored baseline. Runs across all 3 viewports (mobile, tablet, desktop).

### Full Page Snapshots
| # | Snapshot | Description |
|---|----------|-------------|
| S1 | `home-full` | Full page at top (hero visible) |
| S2 | `about-section` | Scroll to `#about`, capture viewport |
| S3 | `services-section` | Scroll to `#services`, capture viewport |
| S4 | `gallery-section` | Scroll to `#gallery`, capture viewport |
| S5 | `contact-section` | Scroll to `#contact`, capture viewport |
| S6 | `footer` | Scroll to bottom, capture footer |

### Component Snapshots
| # | Snapshot | Description |
|---|----------|-------------|
| S7 | `header-transparent` | Header at page top |
| S8 | `header-scrolled` | Header after scrolling 100px |
| S9 | `mobile-menu-open` | Hamburger menu open (mobile only) |
| S10 | `hero-cta` | Hero section with CTA button |
| S11 | `service-card` | Single service card with carousel |
| S12 | `gallery-filter-wedding` | Gallery filtered to "Wedding" |
| S13 | `lightbox-open` | Lightbox showing an image |
| S14 | `contact-form` | Contact form section |
| S15 | `quote-banner` | Decorative quote banner |

### Responsive-Specific Snapshots
| # | Snapshot | Viewport | Description |
|---|----------|----------|-------------|
| S16 | `gallery-1col` | 375px | Gallery in single column mode |
| S17 | `gallery-2col` | 768px | Gallery in 2-column mode |
| S18 | `gallery-3col` | 1440px | Gallery in 3-column masonry |
| S19 | `about-stacked` | 375px | About section stacked (1 column) |
| S20 | `about-grid` | 1440px | About section side-by-side |

---

## 4. File Structure

```
stthomasdeco/
├── tests/
│   ├── unit.spec.js          # 40 unit tests
│   ├── snapshots.spec.js     # 20 snapshot tests × 3 viewports = 60 screenshots
│   └── __snapshots__/        # Baseline screenshots (auto-generated)
├── playwright.config.js       # 3 viewport projects
├── package.json               # devDependencies: @playwright/test
```

Not part of the site (add to a `.gitignore` or exclude from Pages):
- `node_modules/`, `tests/`, `playwright.config.js`, `package.json`, `package-lock.json`, `test-results/`, `playwright-report/`

---

## 5. Run Commands

```bash
# Start local server (in one terminal)
python3 -m http.server 8000

# Run all tests
npx playwright test

# Run only unit tests
npx playwright test tests/unit.spec.js

# Run only snapshot tests
npx playwright test tests/snapshots.spec.js

# Update snapshot baselines after intentional visual changes
npx playwright test tests/snapshots.spec.js --update-snapshots

# Run in headed mode (see the browser)
npx playwright test --headed

# View HTML report
npx playwright show-report
```

---

## 6. CI Note

This project deploys via GitHub Pages with no CI pipeline. Tests run locally before pushing. If CI is added later, use:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: python3 -m http.server 8000 &
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/
```
