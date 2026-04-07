# St.Thomas Deco by Raj — stthomasdeco.ca

Event decor & planning business website for **St.Thomas Deco by Raj**, based in St. Thomas, Ontario, Canada. Single-page static site hosted on GitHub Pages with a custom domain.

**Live site:** [https://stthomasdeco.ca](https://stthomasdeco.ca)

---

## Architecture Overview

```
Browser → DNS (Wix) → GitHub Pages CDN (Fastly) → Static Files (HTML/CSS/JS/Images)
                                                        ↓
                                              FormSubmit.co (contact form emails)
```

**Zero-server architecture:** No backend, no database, no build step, no npm. Pure static files served by GitHub's CDN (Fastly). What you write is what gets served.

---

## File Structure

```
stthomasdeco/
├── index.html          ← Single-page site (all 6 sections in one file)
├── css/style.css       ← All styles, responsive design, animations
├── js/main.js          ← Interactivity (menu, lightbox, scroll effects)
├── CNAME               ← Custom domain pointer for GitHub Pages (stthomasdeco.ca)
├── pics/               ← 23 images (2 logos + 21 portfolio photos, all .jpg)
├── .gitignore          ← Excludes .vscode/, node_modules/, .DS_Store, etc.
├── PLAN.md             ← Project plan document
└── README.md           ← This file
```

---

## HTML — index.html

Single-page scrolling design with **6 sections + lightbox**, anchored by `id` attributes for smooth navigation.

### Head Section

| Tag | Purpose |
|-----|---------|
| `charset=UTF-8` | Supports special characters (♥, accented letters) |
| `viewport meta` | Essential for mobile responsiveness |
| Open Graph `og:*` tags | Controls preview when shared on Facebook/Instagram/LinkedIn |
| `preconnect` to Google Fonts | DNS/TLS handshake starts early for performance |
| `display=swap` on fonts | Shows fallback font immediately, swaps when loaded |

**Fonts loaded:**
- **Playfair Display** (serif) — headings, elegant feel
- **Raleway** (sans-serif) — body text, clean and readable

### Section Breakdown

| Section | Element | Key Technique |
|---------|---------|---------------|
| **Header** | `<header>` fixed at top | Starts transparent, becomes solid green on scroll via JS class toggle |
| **Hero** | `<section id="home">` | CSS `background-size: cover` + dark gradient overlay for text readability |
| **About** | `<section id="about">` | 2-column CSS Grid (logo image + text + star badge) |
| **Services** | `<section id="services">` | 4 cards in `auto-fit` CSS Grid, each with rotating image carousel (3 images, 3s interval) + description |
| **Gallery** | `<section id="gallery">` | 21 photos in masonry layout with category filter buttons (All/Weddings/Birthdays/Baby Showers/Flowers), hover overlays with captions; click opens lightbox |
| **Contact** | `<section id="contact">` | 2-column: left = contact info cards with SVG icons, right = HTML form |
| **Footer** | `<footer>` | Dark background, brand, social icons, copyright |
| **Lightbox** | `<dialog id="lightbox">` | Native HTML `<dialog>` with `showModal()`/`close()` API |

### Images

All images use **lazy loading** and descriptive `alt` attributes:
```html
<img src="pics/..." alt="description" loading="lazy">
```
- `loading="lazy"` — browser only downloads images near the viewport
- Every `alt` attribute describes the image content (accessibility + SEO)

### Contact Form

```html
<form action="https://formsubmit.co/rajapakshethakshala@gmail.com" method="POST">
  <input type="text" name="_honey" style="display:none">      <!-- Honeypot spam trap -->
  <input type="hidden" name="_captcha" value="false">          <!-- Skip captcha page -->
  <input type="hidden" name="_next" value="https://stthomasdeco.ca/#contact">
  <input type="hidden" name="_subject" value="New inquiry from stthomasdeco.ca">
  <!-- Visible fields: name, email, phone, event type (dropdown), date, message -->
</form>
```

**How FormSubmit.co works:**
1. Form POSTs to `https://formsubmit.co/{email}`
2. FormSubmit receives data, formats it, emails it to that address
3. First-ever submission triggers a **verification email** — must click the link to activate
4. No signup, no API key, no backend, completely free
5. Honeypot field catches bots (they auto-fill hidden fields; humans don't see them)

**Form fields:** name (required), email (required), phone, event type (dropdown: Wedding, Baby Shower, Birthday, Gender Reveal, Baptism, Corporate, Other), event date, message.

### SVG Icons

All icons are **inline SVGs** — no icon library download needed:
- Zero HTTP requests, instant render
- CSS-styleable via `color: inherit` and `stroke="currentColor"`

---

## CSS — css/style.css

### CSS Custom Properties (Design Tokens)

```css
:root {
  --color-primary:     #0D3B0D;   /* Dark forest green — header, footer, headings */
  --color-accent:      #2E7D32;   /* Rich green — links, form focus states */
  --color-highlight:   #66BB6A;   /* Medium green — hover states */
  --color-mint:        #A5D6A7;   /* Mint — form borders */
  --color-gold:        #C8A96E;   /* Champagne gold — CTA buttons, premium accent */
  --color-bg:          #FAFCFA;   /* Off-white with green tint — page background */
  --color-bg-section:  #F1F8F2;   /* Light green — alternating section backgrounds */
  --color-bg-dark:     #0A2E0A;   /* Very dark green — footer */
  --color-text:        #1A1A1A;   /* Near-black body text */
  --color-text-light:  #FFFFFF;   /* White text on dark backgrounds */
  --color-text-muted:  #5A6B5A;   /* Muted green-gray for subtitles */
  --ff-heading: 'Playfair Display', Georgia, serif;
  --ff-body:    'Raleway', 'Segoe UI', sans-serif;
  --shadow-card: 0 4px 20px rgba(0,0,0,0.08);
  --radius:      12px;
  --transition:  0.3s ease;
}
```

> Change one variable → entire site updates consistently.

### Mobile-First Responsive Design

**Breakpoint:** `768px` (tablet/desktop split)

| Element | Mobile (< 768px) | Desktop (≥ 768px) |
|---------|-------------------|--------------------|
| Nav | Hidden, slides in from right | Horizontal flex row |
| Hamburger | Visible | Hidden |
| About | Single column, centered | 2-column grid |
| Services | Stacked cards | 2–4 column auto-fit grid |
| Gallery | Single/2 column | 3–4 column grid |
| Contact | Stacked (info then form) | 2-column side by side |

### Key CSS Patterns

| Pattern | Technique |
|---------|-----------|
| Sticky header | `position: fixed` + `transparent` → JS toggles `.header--scrolled` (solid dark green) |
| Hamburger animation | Three `<span>` bars → transform to X via `.open` class |
| Card hover | `translateY(-6px)` lift + image `scale(1.05)` zoom |
| Card carousel | `.card__slide` images fade via `opacity` transition; JS rotates every 3 seconds with dot indicators |
| Nav underline | `::after` pseudo-element, `width: 0` → `width: 100%` on hover |
| Fluid typography | `clamp(2.2rem, 6vw, 4rem)` — scales between min and max |
| Scroll reveal | `.reveal` starts at `opacity: 0; translateY(30px)` → `.visible` fades up |
| Masonry gallery | CSS `columns: 3` with `break-inside: avoid` for Pinterest-style layout |
| Gallery overlays | `::after`-style overlay with gradient + caption text, shown on hover |
| Gallery filters | Category buttons toggle `.gallery__item--hidden`; lightbox re-indexes visible items |
| Section dividers | SVG flourish ornaments (wavy line + dots) between sections |
| Quote banner | Dark green band with italic serif text, decorative circle pseudo-elements |
| Hero parallax | `background-attachment: fixed` (with iOS `@supports` fallback) |
| Hero animation | `@keyframes heroFadeUp` staggers title → tagline → CTA button |
| CTA glow pulse | `@keyframes subtlePulse` on hero button after entrance animation |
| Title underlines | `::after` gold line under centered section titles |
| Lightbox | Native `<dialog>` element, `position: fixed; inset: 0`, `rgba(0,0,0,0.92)` backdrop |

---

## JavaScript — js/main.js

Wrapped in an **IIFE** to avoid polluting global scope:
```js
(function () { 'use strict'; /* all code here */ })();
```

### Features

| Feature | How It Works |
|---------|-------------|
| **Sticky header** | Scroll listener (passive) toggles `.header--scrolled` when `scrollY > 60px` |
| **Mobile menu** | Hamburger click toggles `.open` on nav + hamburger, updates `aria-expanded` |
| **Smooth scroll** | Intercepts `a[href^="#"]` clicks, calculates offset minus header height, `behavior: 'smooth'` |
| **Scroll reveal** | `IntersectionObserver` (threshold 0.15) adds `.visible` class; `unobserve` after animation; fallback for old browsers |
| **Lightbox gallery** | Native `<dialog>` `showModal()`/`close()`, prev/next with wrap-around, keyboard support (Escape, ←, →), backdrop click close. Event-delegated clicks for filter compatibility |
| **Active nav highlight** | Scroll listener checks which section is in viewport, toggles `.active` on corresponding nav link |
| **Card carousels** | `setInterval` (3s) cycles `.card__slide--active` class across 3 images per service card with dot indicators |
| **Gallery filters** | Click handler toggles `.gallery__item--hidden` by `data-category`; re-indexes `items` array for lightbox navigation |

### No Dependencies

Zero npm packages. Zero build tools. Pure vanilla JS compatible with all modern browsers.

---

## Hosting & Deployment

### GitHub Pages

```
git push origin main → GitHub detects push → copies files to CDN → site live
```

| Setting | Value |
|---------|-------|
| Source | `main` branch, `/` root |
| Build type | Legacy (no Jekyll, no Actions) |
| CDN | Fastly (GitHub's CDN partner) |
| SSL | Free via Let's Encrypt (auto-provisioned) |

### CNAME File

Contains `stthomasdeco.ca` — tells GitHub Pages this repo serves that domain.

### DNS Configuration (Wix → GitHub)

```
stthomasdeco.ca (root domain)
  → A Records:
    185.199.108.153 ─┐
    185.199.109.153  ├── GitHub Pages IPs (load balanced, 4 servers)
    185.199.110.153  │
    185.199.111.153 ─┘

www.stthomasdeco.ca
  → CNAME Record → guptamr.github.io
```

### Request Flow

```
User types stthomasdeco.ca
  → DNS resolves to 185.199.x.x
  → GitHub Pages CDN matches domain to guptamr/stthomasdeco repo
  → Serves index.html + CSS + JS + images
  → Browser renders the page
```

### Form Submission Flow

```
User fills form → clicks "Send Inquiry"
  → Browser POSTs to formsubmit.co/rajapakshethakshala@gmail.com
  → FormSubmit validates (honeypot check, rate limit)
  → Formats data → emails to owner
  → Redirects user back to stthomasdeco.ca/#contact
```

---

## Performance Optimizations

| Technique | Impact |
|-----------|--------|
| No framework JS | ~0 KB framework overhead |
| `loading="lazy"` on images | Only loads images near viewport |
| `preconnect` to Google Fonts | DNS/TLS handshake starts early |
| `display=swap` on fonts | No invisible text while fonts load |
| Inline SVGs | Zero HTTP requests for icons |
| CSS transitions (GPU-accelerated) | Smooth 60fps animations |
| `passive: true` on scroll listeners | No scroll jank |
| Single CSS + single JS file | Only 2 HTTP requests for code |
| No build step | What you write is what gets served |

---

## Security

| Check | Status |
|-------|--------|
| XSS risk | **None** — pure static site, no user input rendered in DOM |
| Form spam | Honeypot field + FormSubmit rate limiting |
| External links | All use `rel="noopener noreferrer"` |
| JS isolation | IIFE + `'use strict'` — no global scope pollution |
| Mixed content | None — all resources use relative paths or HTTPS |
| HTTPS | Enable "Enforce HTTPS" in GitHub Pages settings after DNS propagation |

---

## How to Edit

### Prerequisites
- Git
- A text editor (VS Code recommended)
- No build tools, no npm install, no compilation needed

### Local Development
```bash
git clone https://github.com/guptamr/stthomasdeco.git
cd stthomasdeco
# Open index.html directly in browser, or use a local server:
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Deploy Changes
```bash
git add .
git commit -m "description of changes"
git push origin main
# GitHub Pages auto-deploys within ~1 minute
```

### Common Edits

| Task | Where to Edit |
|------|---------------|
| Change colors/fonts | `css/style.css` → `:root` variables at top |
| Edit text content | `index.html` → find the relevant section by `id` |
| Add a gallery photo | Add image to `pics/`, add `<a>` + `<img>` in gallery section |
| Add a service card | Copy an existing `.card` div in services section, update image/text |
| Change contact info | `index.html` → search for phone/email/address |
| Change form recipient | `index.html` → update `formsubmit.co/{email}` in form action |
| Change social links | `index.html` → search for `facebook.com` or `instagram.com` |
| Add a new section | Add `<section id="newname">` in HTML, add `<a href="#newname">` to nav |

### Adding a New Gallery Image

1. Add the image file to `pics/`
2. In `index.html`, inside `<div class="gallery reveal">`, add:
```html
<a href="pics/YOUR_IMAGE.jpg" class="gallery__item" data-caption="Description" data-category="wedding">
  <img src="pics/YOUR_IMAGE.jpg" alt="Short alt text" loading="lazy">
  <span class="gallery__overlay">Display Name</span>
</a>
```
3. Valid `data-category` values: `wedding`, `birthday`, `baby`, `flowers`

---

## Current Deployment Status

| Item | Status |
|------|--------|
| Code | Pushed to `main` branch |
| GitHub Pages | Built, serving from `main /` |
| CNAME | Set to `stthomasdeco.ca` |
| DNS A records | 4x GitHub Pages IPs (185.199.x.x) |
| DNS CNAME (www) | `guptamr.github.io` |
| HTTPS | Enable after DNS propagation — GitHub → Settings → Pages → "Enforce HTTPS" |
| FormSubmit | Active — needs one-time email verification on first form submission |

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements, `<dialog>`, lazy loading) |
| Styling | CSS3 (custom properties, Grid, columns, Flexbox, `clamp()`, transitions, `@keyframes`) |
| Scripting | Vanilla JS (ES5-compatible, IntersectionObserver with fallback) |
| Fonts | Google Fonts CDN (Playfair Display + Raleway) |
| Icons | Inline SVGs (zero dependencies) |
| Forms | FormSubmit.co (free, no-backend email forwarding) |
| Hosting | GitHub Pages (Fastly CDN, Let's Encrypt SSL) |
| DNS | Wix DNS manager → GitHub Pages IPs |
| Build | None — no bundler, no transpiler, no npm |