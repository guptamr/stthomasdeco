# St.Thomas Deco by Raj — Website Plan

## 📌 Project Overview

| Field | Detail |
|-------|--------|
| **Business** | St.Thomas Deco by Raj |
| **Category** | Event Planner |
| **Domain** | stthomasdeco.ca |
| **Location** | 17 Tamarack Court, Saint Thomas, ON, Canada, N5P 0A |
| **Phone** | (647) 572-7822 |
| **Email** | stthomasdecobyraj@gmail.com |
| **Hours** | Always open |
| **Tagline** | "Transforming spaces into unforgettable experiences" |
| **Facebook** | [St.Thomas Deco by Raj](https://www.facebook.com/profile.php?id=100092185550079) |
| **Instagram** | [@turquoise_deco](https://instagram.com/turquoise_deco) |
| **Reviews** | 100% recommend (23 Reviews) |
| **Reference Site** | [petalsofpassion.ca](https://www.petalsofpassion.ca) |
| **GitHub Username** | guptamr |
| **GitHub Repo** | `guptamr/stthomasdeco` |
| **Domain Registrar** | Wix |
| **Goal** | Lightweight POC website, live at stthomasdeco.ca, $0 cost |

---

## 🔧 Technology Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Plain HTML + CSS + vanilla JS | Zero build step, zero dependencies, simplest possible |
| **Styling** | Single CSS file with CSS variables | Light, no framework overhead, easy theming |
| **Icons** | Inline SVGs | No icon font download needed |
| **Fonts** | Google Fonts (Playfair Display + Raleway) | Free, CDN-served |
| **Contact Form** | Embedded Google Form | Free, no backend, responses go to Google Sheets |
| **Hosting** | **GitHub Pages** (this repo) | Free, custom domain support, SSL included |
| **Domain DNS** | CNAME + A records pointing to GitHub Pages | Free SSL via GitHub |
| **Images** | Original JPGs from `pics/`, lazy-loaded | No build step needed |

### Why This Stack?
- **Zero cost** — GitHub Pages is free, Google Forms is free, no server needed
- **Zero maintenance** — No dependencies to update, no build pipeline
- **< 5 files total** — HTML, CSS, JS, images
- **Fast** — No framework JS, no hydration, pure static HTML
- **Easy to update** — Edit HTML, push to GitHub, site updates automatically

---

## 🖼️ Assets Inventory (COLLECTED)

### Logos (2 variants)
| File | Usage |
|------|-------|
| `622862643...n.jpg` | **Primary logo** — Green leaf/sparkle on dark green background ("St.Thomas Deco") |
| `619460738...n.jpg` | **Painted sign logo** — Rustic wooden sign ("St. Thomas Deco by Raj") — good for About section or hero |

### Gallery Photos (10 photos — all collected)
| File | Category | Description |
|------|----------|-------------|
| `474622406...n.jpg` | Balloon Decor | Winter ONEderland birthday — blue/silver/white balloons, snowflake backdrop, letter blocks |
| `475152990...n.jpg` | Balloon Decor | Ayaan's 1st birthday — outdoor tent, brown/blue/white balloons, teddy bear |
| `476146136...n.jpg` | Event Planning | Safari baby shower — gold/white balloons, green wall, giraffe, "BABY" boxes |
| `490503724...n.jpg` | Wedding Decor / Flowers | Baptism ceremony — white/rose flower arch, drapes, gold frames, lanterns |
| `520636257...n.jpg` | Wedding Decor | Wedding expo display table — flowers, drapes, signage, full setup |
| `529845898...n.jpg` | Wedding Decor | Outdoor wedding arch — blue/white flowers, wooden pergola, draped fabric |
| `530400930...n.jpg` | Balloon Decor | "Oh Baby" shower — peach/green/coral balloons, teddy bear, tropical theme |
| `555416349...n.jpg` | Event Planning | Rapunzel/Giovana birthday — purple balloons, flowers, themed cutout |
| `560369039...n.jpg` | Balloon Decor | Safari birthday — green/gold balloons, stuffed animals, hanging vines |
| `653980397...n.jpg` | Flowers / Balloon | Gender reveal "Oh Baby" — pink/blue/white balloons, flower arch, elegant |

### Photo → Service Mapping
| Service | Best Photos (for service cards) |
|---------|--------------------------------|
| **Event Planning** | `476146136...n.jpg` (safari baby shower) |
| **Balloon Decor** | `474622406...n.jpg` (winter wonderland) |
| **Wedding Decor** | `490503724...n.jpg` (ceremony arch with flowers) |
| **Fresh Flowers Bouquet** | `653980397...n.jpg` (pink/blue flower arch) |
| **Hero Image** | `520636257...n.jpg` (wedding expo full display — best for wide hero) |

---

## 🏗️ Site Structure

Single-page scrolling website (like petalsofpassion.ca):

```
index.html (single page)
├── Header / Navigation (sticky, transparent → solid on scroll)
│   ├── Logo (green leaf logo)
│   └── Nav: Home | About | Services | Gallery | Contact
├── Hero Section (full-width image + tagline overlay)
│   ├── Background: wedding expo display photo
│   ├── "St. Thomas Deco by Raj"
│   └── "Transforming spaces into unforgettable experiences"
├── About Section
│   ├── Painted sign logo image
│   └── Brief intro + 100% recommend badge
├── Services Section (4 cards with hover effect)
│   ├── Event Planning — safari baby shower photo
│   ├── Balloon Decor — winter wonderland photo
│   ├── Wedding Decor — ceremony arch photo
│   └── Fresh Flowers Bouquet — flower arch photo
├── Gallery Section (responsive photo grid, lightbox on click)
│   └── All 10 portfolio photos
├── Contact Section
│   ├── Contact info (phone, email, address, hours)
│   ├── Social links (Facebook, Instagram)
│   └── Embedded Google Form for inquiries
├── Footer
│   ├── © 2024 St.Thomas Deco by Raj
│   ├── Social icons
│   └── "Made with ♥ in St. Thomas, ON"
```

### File Structure
```
stthomasdeco/
├── index.html              # Single-page site
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # Smooth scroll, mobile menu, lightbox
├── pics/                   # ✅ ALREADY EXISTS — 12 photos + 2 logos
│   ├── 622862643...n.jpg   # Primary logo (green leaf)
│   ├── 619460738...n.jpg   # Painted sign logo
│   └── (10 gallery photos)
├── CNAME                   # GitHub Pages custom domain file
├── README.md
└── PLAN.md                 # This file
```

---

## 🎨 Design Direction

### Color Palette (complimenting the green logo — professional look)
```
--color-primary:    #0D3B0D   /* Deep forest green — logo background, hero overlay, footer */
--color-accent:     #2E7D32   /* Rich green — buttons, links, active states */
--color-highlight:  #66BB6A   /* Medium green — hover states, subtle accents */
--color-mint:       #A5D6A7   /* Soft mint — borders, dividers, light accents */
--color-gold:       #C8A96E   /* Muted champagne gold — CTA buttons, premium feel */
--color-bg:         #FAFCFA   /* Very subtle green-white tint — page background */
--color-bg-section: #F1F8F2   /* Light green tint — alternating section backgrounds */
--color-bg-dark:    #0A2E0A   /* Darker green — footer background */
--color-text:       #1A1A1A   /* Near black — body text */
--color-text-light: #FFFFFF   /* White — text on dark backgrounds */
--color-text-muted: #5A6B5A   /* Muted green-gray — secondary text, captions */
```

**Why this palette works:**
- Directly extends the logo's green-on-dark-green identity
- Gold accent adds warmth + premium/professional feel (weddings, events)
- Green-tinted whites keep cohesion without feeling cold
- High contrast ratios for accessibility (WCAG AA compliant)

### Typography
- **Headings:** `Playfair Display` (elegant serif) — matches the script feeling of the logos
- **Body:** `Raleway` (clean sans-serif) — readable, modern
- **Logo text:** Uses the actual logo images (no CSS text needed)

### Style Rules
- Generous whitespace between sections
- Soft shadows on cards (`box-shadow: 0 4px 20px rgba(0,0,0,0.08)`)
- Smooth fade-in animations on scroll (CSS `@keyframes` + Intersection Observer)
- Full-width hero with dark overlay for text readability
- Rounded corners on cards and images (`border-radius: 12px`)
- Mobile-first responsive (hamburger menu on mobile)

---

## 📋 Implementation Phases

### Phase 1: Content & Assets ✅ COMPLETE
- [x] Business logo — 2 variants collected (green leaf + painted sign)
- [x] 10 portfolio photos collected — covering all 4 services
- [x] Business tagline confirmed: "Transforming spaces into unforgettable experiences"
- [x] Contact details confirmed (phone, email, address)
- [x] Social media links confirmed (Facebook + Instagram)
- [ ] Create Google Form for inquiries (fields: Name, Email, Phone, Event Type, Event Date, Message)

### Phase 2: Build the Website
**Status:** READY TO START

- [ ] Create `index.html` with all sections
- [ ] Create `css/style.css` with full responsive design
  - Green/gold color palette matching logo
  - Mobile-first breakpoints (375px → 768px → 1024px → 1440px)
  - CSS-only fade-in animations via Intersection Observer
- [ ] Create `js/main.js` with:
  - Sticky header (transparent → solid on scroll)
  - Mobile hamburger menu
  - Smooth scrolling for anchor links
  - Lightweight lightbox for gallery
  - Scroll-triggered reveal animations
- [ ] Embed Google Form in contact section
- [ ] Add favicon from logo
- [ ] Add Open Graph meta tags (for social media sharing preview)

### Phase 3: GitHub Pages Deployment
**Status:** READY

- [ ] Push code to `main` branch: `git push origin main`
- [ ] Go to https://github.com/guptamr/stthomasdeco/settings/pages
- [ ] Under "Source", select **Deploy from a branch** → **main** → **/ (root)**
- [ ] Click Save
- [ ] Add `CNAME` file containing `stthomasdeco.ca` (will be created during build)
- [ ] Verify site is live at `https://guptamr.github.io/stthomasdeco`

### Phase 4: Custom Domain Setup (Wix → GitHub Pages)
**Status:** READY

**Important:** Wix domains bought through Wix can be pointed to external hosting.
You do NOT need a Wix website plan — just the domain.

**Step-by-step:**

1. **Log in to Wix** → Go to https://www.wix.com/account/domains
2. **Click on `stthomasdeco.ca`** → Click **"Manage"** or the three dots → **"Manage DNS Records"**
3. **Delete any existing A records and CNAME records** for `@` and `www`
   (Wix may have default records pointing to their servers)
4. **Add these DNS records:**

   | Type | Host/Name | Value | TTL |
   |------|-----------|-------|-----|
   | A | @ | `185.199.108.153` | 1 hour |
   | A | @ | `185.199.109.153` | 1 hour |
   | A | @ | `185.199.110.153` | 1 hour |
   | A | @ | `185.199.111.153` | 1 hour |
   | CNAME | www | `guptamr.github.io` | 1 hour |

5. **In GitHub Pages settings** (https://github.com/guptamr/stthomasdeco/settings/pages):
   - Under "Custom domain", enter `stthomasdeco.ca` and click Save
   - Wait for DNS check to pass (can take a few minutes to 48 hours)
   - Check "Enforce HTTPS" once the DNS check passes

6. **Verify:** Open `https://stthomasdeco.ca` — should show your site
   - Also verify `https://www.stthomasdeco.ca` redirects properly

**Wix-specific notes:**
- If Wix shows a "Connect Domain" wizard, skip it — go directly to DNS settings
- Wix may show a warning about pointing away from Wix — that's fine, proceed
- If you can't find DNS settings: Wix menu → Settings → Domains → Manage → DNS Records tab
- DNS propagation typically takes 1-4 hours, but can take up to 48 hours

### Phase 5: Polish & Launch
**Status:** NOT STARTED

- [ ] Test on iPhone Safari, Android Chrome, desktop Chrome/Edge/Firefox
- [ ] Test Google Form submission end-to-end
- [ ] Verify all images load properly
- [ ] Check Lighthouse score (target: 90+ performance)
- [ ] Share link, announce on Facebook page

---

## 💰 Cost Breakdown

| Item | Cost |
|------|------|
| GitHub Pages hosting | **Free** |
| SSL Certificate | **Free** (via GitHub Pages) |
| Google Fonts | **Free** |
| Google Forms | **Free** |
| Domain (stthomasdeco.ca) | Already owned |
| **Total ongoing cost** | **$0/month** |

---

## ✅ All Information Collected

| # | Item | Status |
|---|------|--------|
| 1 | **GitHub username** | ✅ `guptamr` |
| 2 | **Color preference** | ✅ Green/gold — professional, compliments logo |
| 3 | **Domain registrar** | ✅ Wix — DNS setup instructions included above |
| 4 | **Logo** | ✅ 2 variants in `pics/` folder |
| 5 | **Portfolio photos** | ✅ 10 photos covering all 4 services |
| 6 | **Business details** | ✅ Phone, email, address, tagline, socials |

---

## 🚀 Implementation Sequence (when ready)

```
1. Build site           → I create index.html, style.css, main.js, CNAME
2. Test locally          → Open index.html in browser, verify everything
3. Push to GitHub        → git add . && git commit -m "Launch site" && git push
4. Enable GitHub Pages   → Settings → Pages → main branch → Save
5. Configure Wix DNS     → Follow Phase 4 instructions above
6. Wait for DNS          → 1-48 hours
7. Enable HTTPS          → GitHub Pages settings → Enforce HTTPS
8. Site is live!          → https://stthomasdeco.ca
```

**Everything is ready. Say "build it" to start Phase 2.**
