---
description: "Use when making any changes to the stthomasdeco site. Covers the development workflow: how to make changes, run tests, handle lint, and deploy. Essential for understanding the full change lifecycle."
applyTo: "**"
---

# Development Workflow — stthomasdeco.ca

## Architecture

Zero-server static site. No build step, no npm build, no bundler. Files are served as-is by GitHub Pages.

| File | Purpose |
|------|---------|
| `index.html` | Entire site — all sections in one file |
| `css/style.css` | All styles |
| `js/main.js` | All interactivity (IIFE, strict mode) |
| `images/` | 23 images, descriptive kebab-case names |
| `tests/unit.spec.js` | 40 functional tests |
| `tests/snapshots.spec.js` | 20 visual regression tests |

## Making Changes

### HTML (`index.html`)
- Sections use `<section id="sectionname">`
- All images: `loading="lazy"` + descriptive `alt`
- External links: `target="_blank" rel="noopener noreferrer"`
- Icons: inline SVGs with `stroke="currentColor"`
- Semantic elements: `<header>`, `<nav>`, `<section>`, `<footer>`, `<dialog>`

### CSS (`css/style.css`)
- All values via CSS custom properties in `:root`
- BEM-like naming: `.block__element--modifier`
- Mobile-first, single breakpoint at `768px`
- See `.github/instructions/css.instructions.md` for full rules

### JavaScript (`js/main.js`)
- Wrapped in IIFE: `(function () { 'use strict'; ... })();`
- ES5-compatible syntax: use `var`, `function` (not `const`/`let`/arrows)
- `passive: true` on scroll listeners
- No global variables, no external libraries

### Images (`images/`)
- Kebab-case naming: `safari-baby-shower.jpg`, `wedding-backdrop-fairy-lights.jpg`
- Valid categories: `wedding`, `birthday`, `baby`, `flowers`

## Validation Cycle

After every change, run this sequence:

### 1. Check for lint errors
```bash
# Check via VS Code's error diagnostics (get_errors tool)
# The site has no build step — lint = VS Code diagnostics
```

### 2. Run tests
```bash
npx playwright test --reporter=line 2>&1 | tail -10
```

**IMPORTANT**: Always add `--reporter=line` to prevent the HTML reporter from opening and blocking the terminal. Alternatively pipe through `tail` or `cat`.

### 3. If visual changes were made
```bash
npm run test:update    # Regenerate snapshot baselines
npx playwright test --reporter=line 2>&1 | tail -10   # Verify they pass
```

### 4. Fix cycle
If tests fail:
- Read the error message carefully
- Fix the root cause (not symptoms)
- Re-run only the failing test first: `npx playwright test -g "test name" --reporter=line`
- Then run full suite to confirm no regressions

## Commit and Deploy

```bash
git add -A
git commit -m "Brief description of what changed"
git push origin main
```

- GitHub Pages auto-deploys from `main` (~1 minute)
- Commit messages: imperative mood, concise (e.g., "Add gallery filter animation", "Fix mobile menu overlap")

## Test Local Server

```bash
python3 -m http.server 8000
# or use the Playwright config's built-in Node.js server (auto-starts with tests)
```
