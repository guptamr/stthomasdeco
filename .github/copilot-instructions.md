# Copilot Instructions — stthomasdeco.ca

## Project Overview

Static single-page website for **St.Thomas Deco by Raj**, an event decor business in St. Thomas, Ontario. No build tools, no npm, no frameworks — pure HTML/CSS/JS served directly by GitHub Pages.

**Live domain:** stthomasdeco.ca (GitHub Pages + Wix DNS)

## Architecture

- **Zero-server**: No backend, no database, no API, no build step
- **Hosting**: GitHub Pages (Fastly CDN), auto-deploys on `git push origin main`
- **Forms**: Contact form POSTs to FormSubmit.co (free email forwarding service)
- **DNS**: Wix manages DNS → 4 GitHub Pages A records + www CNAME to guptamr.github.io

## File Map

| File | Purpose | Edit for... |
|------|---------|-------------|
| `index.html` | Entire site — all 6 sections in one file | Content, structure, form, meta tags |
| `css/style.css` | All styles — responsive, animations | Colors, layout, spacing, responsive breakpoints |
| `js/main.js` | All interactivity — menu, lightbox, scroll | Behavior, new interactive features |
| `CNAME` | GitHub Pages custom domain | Domain changes only |
| `pics/` | 23 images (2 logos + 21 portfolio) | Adding/replacing photos |

Files NOT part of the site: `Facebook.html`, `PLAN.md`, `README.md`

## Code Conventions

### HTML
- Single-page design: all sections use `<section id="sectionname">`
- Navigation anchors match section IDs: `<a href="#about">` → `<section id="about">`
- All images must have `loading="lazy"` and descriptive `alt` attributes
- External links must have `target="_blank" rel="noopener noreferrer"`
- Icons are inline SVGs with `stroke="currentColor"` — no icon libraries
- Use semantic HTML elements (`<header>`, `<nav>`, `<section>`, `<footer>`, `<dialog>`)
- Accessibility: all interactive elements need `aria-label` or `aria-expanded`

### CSS
- All design tokens are CSS custom properties in `:root` — never use hardcoded colors/fonts
- BEM-like naming: `.block__element` (e.g., `.card__title`, `.hero__content`)
- Mobile-first approach with single breakpoint at `768px`
- Use `clamp()` for fluid typography instead of multiple breakpoints
- Transitions use `var(--transition)` (0.3s ease)
- Border radius uses `var(--radius)` (12px)
- Cards use `var(--shadow-card)` for consistent elevation

### JavaScript
- Wrapped in IIFE: `(function () { 'use strict'; ... })();`
- No global variables — everything is scoped inside the IIFE
- Use `passive: true` on scroll event listeners
- IntersectionObserver for scroll-triggered effects (with fallback)
- Lightbox uses native `<dialog>` API (`showModal()` / `close()`)
- No external JS libraries or npm packages
- ES5-compatible syntax (use `var`, `function`, not `const`/`let`/arrow functions)

### Color Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-primary` | `#0D3B0D` | Header, footer, headings |
| `--color-accent` | `#2E7D32` | Links, focus states |
| `--color-highlight` | `#66BB6A` | Hover states |
| `--color-gold` | `#C8A96E` | CTA buttons, premium accent |
| `--color-bg` | `#FAFCFA` | Page background |
| `--color-bg-section` | `#F1F8F2` | Alternating section backgrounds |
| `--color-bg-dark` | `#0A2E0A` | Footer |

### Typography

| Variable | Font | Usage |
|----------|------|-------|
| `--ff-heading` | Playfair Display (serif) | Headings, brand name |
| `--ff-body` | Raleway (sans-serif) | Body text, buttons, form labels |

## Section IDs for Navigation

| ID | Section | Nav Link Text |
|----|---------|---------------|
| `#home` | Hero/banner | Home |
| `#about` | About Us | About |
| `#services` | Our Services | Services |
| `#gallery` | Our Work | Gallery |
| `#contact` | Get in Touch | Contact |

## Contact Form Details

- **Action URL**: `https://formsubmit.co/rajapakshethakshala@gmail.com`
- **Method**: POST
- **Spam protection**: Honeypot field (`name="_honey"`, hidden)
- **After submit**: Redirects to `https://stthomasdeco.ca/#contact`
- **Subject line**: "New inquiry from stthomasdeco.ca"
- **Fields**: name (required), email (required), phone, event_type (dropdown), event_date, message

## Key Patterns

### Adding a Gallery Image
1. Add `.jpg` file to `pics/`
2. Add inside `<div class="gallery reveal">`:
```html
<a href="pics/FILENAME.jpg" class="gallery__item" data-caption="Image description" data-category="wedding">
  <img src="pics/FILENAME.jpg" alt="Short alt text" loading="lazy">
  <span class="gallery__overlay">Display Name</span>
</a>
```
3. Valid `data-category` values: `wedding`, `birthday`, `baby`, `flowers`

### Adding a Service Card
Service cards use rotating image carousels. Copy existing `.card` block in services section:
```html
<div class="card reveal">
  <div class="card__img card__carousel">
    <img src="pics/FILE1.jpg" alt="Description" loading="lazy" class="card__slide card__slide--active">
    <img src="pics/FILE2.jpg" alt="Description" loading="lazy" class="card__slide">
    <img src="pics/FILE3.jpg" alt="Description" loading="lazy" class="card__slide">
    <div class="card__dots">
      <span class="card__dot card__dot--active"></span>
      <span class="card__dot"></span>
      <span class="card__dot"></span>
    </div>
  </div>
  <div class="card__body">
    <h3 class="card__title">Service Name</h3>
    <p>Service description text.</p>
  </div>
</div>
```

### Adding a New Section
1. Add in `index.html` between existing sections:
```html
<section class="section" id="newsection">
  <div class="container">
    <h2 class="section__title section__title--center reveal">Section Title</h2>
    <!-- content -->
  </div>
</section>
```
2. Add nav link: `<a href="#newsection" class="nav__link">Label</a>`
3. Use `section--alt` class for alternating background color

### Scroll Reveal
Add `reveal` class to any element to animate it on scroll:
```html
<div class="reveal">This will fade up when scrolled into view</div>
```

## Deployment

- Push to `main` branch → GitHub Pages auto-deploys (~1 minute)
- No build, no CI/CD pipeline, no npm scripts
- Test locally: `python3 -m http.server 8000` then visit `http://localhost:8000`

## Security Notes

- No user-generated content rendered in DOM (no XSS surface)
- All external links use `rel="noopener noreferrer"`
- Honeypot field for form spam prevention
- HTTPS via Let's Encrypt (enforce via GitHub Pages settings)
- No API keys, tokens, or secrets in the codebase
- JS is completely isolated in an IIFE with `'use strict'`

## Business Contact Info (intentionally public)

- **Phone**: (647) 572-7822
- **Email**: rajapakshethakshala@gmail.com
- **Address**: 17 Tamarack Court, Saint Thomas, ON, Canada
- **Facebook**: facebook.com/profile.php?id=100092185550079
- **Instagram**: instagram.com/stthomasdeco
