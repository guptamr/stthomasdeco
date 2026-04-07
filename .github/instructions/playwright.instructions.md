---
description: "Use when writing, updating, or debugging Playwright tests. Covers test structure, selectors, snapshot testing, viewport configuration, and common pitfalls for this static site."
applyTo: ["tests/**", "playwright.config.js"]
---

# Playwright Testing — stthomasdeco.ca

## Setup

- **Framework**: Playwright Test (`@playwright/test`)
- **Browser**: Chromium only (WebKit/Firefox not installed)
- **Web server**: Inline Node.js HTTP server in `playwright.config.js` (port 8000)
- **Baselines**: `tests/snapshots.spec.js-snapshots/` with `-darwin.png` suffix

## Viewports (3 projects)

| Project | Width × Height | Flags |
|---------|---------------|-------|
| Mobile | 375 × 812 | `isMobile: true, hasTouch: true` |
| Tablet | 768 × 1024 | — |
| Desktop | 1440 × 900 | — |

## Test Files

| File | Purpose | Count |
|------|---------|-------|
| `tests/unit.spec.js` | Functional tests (11 categories A–K) | 40 tests |
| `tests/snapshots.spec.js` | Visual regression screenshots | 20 tests |

## Commands

```bash
npm test              # Full suite (unit + snapshots, all 3 viewports)
npm run test:unit     # Unit tests only
npm run test:snapshots # Snapshot tests only
npm run test:update   # Regenerate snapshot baselines after visual changes
```

**CRITICAL**: Always use `--reporter=line` when running tests in terminal to prevent the HTML reporter from blocking. In scripts, prefer:
```bash
npx playwright test --reporter=line 2>&1 | tail -5
```

## Writing Unit Tests

### Style Rules
- Use `const`/`let` (never `var`)
- Use arrow functions for callbacks
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Use template literals for string interpolation

### Test Structure
```javascript
test.describe('Category — Feature Name', () => {
  test('N: Descriptive test name', async ({ page }) => {
    await page.goto('/');
    // ... test logic
  });
});
```

### Viewport-Conditional Tests
```javascript
// Skip on desktop — run only on mobile/tablet
test.skip((page.viewportSize()?.width ?? 0) > 768, 'Mobile only');

// Skip on mobile — run only on desktop
test.skip((page.viewportSize()?.width ?? Infinity) < 769, 'Desktop only');
```

### Common Patterns

**Wait for page ready** before interacting:
```javascript
await page.goto('/');
await page.waitForLoadState('networkidle');
```

**Scroll to section** before testing elements in it:
```javascript
await page.locator('#gallery').scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
```

**Check class toggle**:
```javascript
await expect(header).toHaveClass(/header--scrolled/);
await expect(header).not.toHaveClass(/header--scrolled/);
```

**Verify scroll happened** (don't check exact positions — lazy images shift layout):
```javascript
const beforeY = await page.evaluate(() => window.scrollY);
await page.locator('a[href="#contact"]').click();
await page.waitForTimeout(2000);
const afterY = await page.evaluate(() => window.scrollY);
expect(afterY).toBeGreaterThan(beforeY);
```

**getAttribute with null safety**:
```javascript
const src = await el.getAttribute('src');
const cleaned = (src ?? '').replace(/^https?:\/\/[^/]+\//, '');
```

## Writing Snapshot Tests

### Carousel Stabilization
The `waitForReady()` helper already stops carousel auto-rotation and resets to slide 1. Always call it before any screenshot.

### Snapshot Structure
```javascript
test('SN: descriptive-name', async function ({ page }) {
  await page.goto('/');
  await waitForReady(page);
  // Scroll to element if needed
  await page.locator('#section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  // Screenshot element (preferred) or page
  const element = page.locator('.target');
  await expect(element).toHaveScreenshot('descriptive-name.png');
});
```

### Rules
- Prefer **element screenshots** over full-page screenshots (more deterministic)
- Always `waitForReady(page)` first — it stops carousels and waits for network idle
- Add `scrollIntoViewIfNeeded()` + timeout for below-fold elements
- Max diff pixel ratio is `0.003` (set in config)
- After any visual change, run `npm run test:update` to regenerate baselines

## Common Pitfalls

| Problem | Solution |
|---------|----------|
| Test hangs in terminal | Use `--reporter=line` not default HTML reporter |
| Carousel makes snapshots flaky | `waitForReady()` already handles this by clearing intervals |
| Lazy images shift layout | Don't assert exact scroll positions; compare before/after scrollY |
| `getAttribute()` returns null | Use `(value ?? '')` or `toContain()` instead of strict equality |
| URL contains `http://localhost:8000/` prefix | Strip with `.replace(/^https?:\/\/[^/]+\//, '')` |
| Mobile-only test runs on desktop | Add `test.skip()` with viewport width check |
