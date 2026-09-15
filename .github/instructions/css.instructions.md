---
description: "Use when editing CSS styles, adding new components, changing colors, layout, typography, animations, or responsive design. Covers design tokens, naming conventions, and responsive patterns."
applyTo: "css/**"
---

# CSS Conventions — stthomasdeco.ca

## Design Tokens

All values live in `:root` custom properties. **Never hardcode** colors, fonts, shadows, or radii.

```css
/* Colors */
--color-primary:    #063B2B;   /* Header, footer, headings */
--color-accent:     #187451;   /* Links, focus states */
--color-highlight:  #116345;   /* Readable link hover states */
--color-lime:       #AFE883;   /* Brand accents on dark backgrounds */
--color-turquoise:  #24D5AF;   /* Brand-gradient endpoint */
--gradient-brand: linear-gradient(110deg, var(--color-lime), var(--color-turquoise));
--color-bg:         #FBFCF9;   /* Page background */
--color-bg-section: #F0F7F2;   /* Alternating section backgrounds */
--color-bg-dark:    #03251A;   /* Footer */

/* Typography */
--ff-heading: 'Cormorant Garamond', Georgia, serif;
--ff-body:    'Raleway', 'Segoe UI', sans-serif;

/* Shared values */
--shadow-card: 0 4px 20px rgba(0,0,0,0.08);
--radius:      12px;
--transition:  0.3s ease;
```

## Naming

BEM-like: `.block__element` with modifier as `.block__element--modifier` or `.block--modifier`.

Examples: `.card__title`, `.hero__content`, `.gallery__item--tall`, `.header--scrolled`, `.gallery-filter--active`

## Responsive

- **Mobile-first**: Base styles are mobile. Use `@media (min-width: 768px)` for desktop.
- **Single breakpoint**: `768px`. Do not add more breakpoints.
- **Fluid typography**: Use `clamp()` instead of multiple font-size declarations.

```css
/* Good */
font-size: clamp(2rem, 4.5vw, 3rem);

/* Bad — don't do this */
font-size: 2rem;
@media (min-width: 768px) { font-size: 3rem; }
```

## Patterns

| Pattern | Implementation |
|---------|---------------|
| Transitions | Always use `var(--transition)` |
| Border radius | Always use `var(--radius)` |
| Card elevation | Always use `var(--shadow-card)` |
| Hover lifts | `transform: translateY(-6px)` |
| Scroll reveal | `.reveal { opacity: 0; transform: translateY(30px); }` → `.visible` |
| Section titles | `::after` pseudo-element for brand-gradient underline |

## Rules

- No `!important` unless overriding third-party styles
- No duplicate selectors — merge properties into original rule
- No vendor prefixes unless required for current browser targets
- Keep selectors flat (max 2 levels of nesting conceptually)
- Group related properties: position → display → box model → typography → visual → animation
