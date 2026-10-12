# Design decisions — Sapphire & Gold

Updated: 2026-10-11

## Product and visual direction

- **Direction:** C — Sapphire & Gold. A bright, spacious course storefront with the clarity and commercial confidence of established learning catalogs. The reference is limited to product organization and shopping cues; no Coursera brand assets, copy, or page composition are reused.
- **Default appearance:** light. White `#FFFFFF` and cloud `#F4F7FC` surfaces, sapphire `#1F4FD8` for primary interaction, navy `#0B1B3F` for hero support surfaces and footer, champagne `#C9A14A` for thin decorative rules, ratings and dark-surface highlights. Champagne is not used as text on white.
- **Text and surfaces:** navy `#0B1B3F`, muted blue-gray `#4A5878`, border `#E3E8F2`.
- **Status tokens:** success `#16794B` / `#E9F6EF`; error `#B42318` / `#FEF0EE`; warning `#805D18` / `#FFF6DF`.
- **Optional dark appearance:** token overrides are available with `data-theme="dark"`; the storefront toggle changes the current page theme only. It is a visual preview and does not persist a preference.
- All color values are CSS custom properties in `app/globals.css`, mapped into Tailwind v4 theme variables.

## Contrast measurement

Ratios below were computed from the WCAG relative luminance formula (sRGB linearization and `(L1 + .05)/(L2 + .05)`). These are computed values, not a result from an external browser extension. WCAG AA targets are 4.5:1 for normal text and 3:1 for large text and meaningful graphical boundaries.

| Foreground | Background | Ratio | Use / result |
| --- | --- | ---: | --- |
| `#0B1B3F` | `#FFFFFF` | 16.90:1 | Body / pass |
| `#0B1B3F` | `#F4F7FC` | 15.74:1 | Body / pass |
| `#4A5878` | `#FFFFFF` | 7.10:1 | Body / pass |
| `#4A5878` | `#F4F7FC` | 6.61:1 | Body / pass |
| `#1F4FD8` | `#FFFFFF` | 6.63:1 | Text and primary control / pass |
| `#1F4FD8` | `#F4F7FC` | 6.17:1 | Text and primary control / pass |
| `#FFFFFF` | `#1F4FD8` | 6.63:1 | Primary button label / pass |
| `#C9A14A` | `#FFFFFF` | 2.42:1 | Decorative only / fails text AA |
| `#C9A14A` | `#0B1B3F` | 6.98:1 | Large highlight on navy / pass |
| `#805D18` | `#FFFFFF` | 6.01:1 | Warning text / pass |
| `#805D18` | `#FFF6DF` | 5.58:1 | Warning text / pass |
| `#16794B` | `#E9F6EF` | 4.88:1 | Success text / pass |
| `#B42318` | `#FEF0EE` | 5.92:1 | Error text / pass |

These are token-pair measurements. They do not establish that every rendered combination, focus indicator, image overlay, or optional dark-mode pairing passes; browser inspection remains outstanding.

## Typography and assets

- **UI/body:** Be Vietnam Pro. Loaded using `next/font/google` with `latin` and `vietnamese` subsets.
- **Editorial accent:** Cormorant Garamond, restricted to selected hero emphasis. Loaded with the same subsets. The display system does not use it for dense content.
- Both Google fonts are distributed under the SIL Open Font License. `next/font` downloads and self-hosts font assets at build time; the exported UI does not need to request Google Fonts at runtime.
- The design system includes Vietnamese proof text: “Ánh sáng, ý tưởng, trải nghiệm. ă â đ ê ô ơ ư · Á à ả ã ạ · Ế ề ể ễ ệ”. This is a source-level glyph specimen; visual raster inspection at multiple sizes has not been completed.
- The founder portrait is a bespoke SVG placeholder with an explicit “replace with real portrait” label. Course and testimonial imagery are labeled placeholders; no external stock asset or icon dependency is used.
- Brand name, business/course subject, founder, true course catalog, reviews, and hero story remain unprovided. “Study Studio” is a temporary UI label, not a confirmed brand.

## Storefront composition

- Sticky header with responsive navigation and theme control. Search appears in the hero only to avoid duplicate search fields.
- Hero with the primary course search, popular search chips, readable trust cue, and a landing-page image carousel.
- Hero typography uses a 1.14 line-height, reduced display size, and explicit spacing between the italic “tò mò” phrase and “thành” to protect Vietnamese diacritics and prevent word collisions. Hero top padding and minimum height are reduced so search and trust information remain visible sooner.
- Supporting hero labels and category chips use at least 12px text on mobile and 13px on desktop, with stronger foreground contrast.
- Category chips, educational bento promotion, preview stats, featured catalog with tabs/search, one pinned learning-path panel, testimonials with portrait placeholders, native details/summary FAQ, CTA and multi-column footer.
- Course card fields: cover placeholder, availability badge, category, title, instructor, duration, sample learner count, rating/review count, and VND price. Values are mock data and visibly disclosed as preview material.
- The page is a frontend preview. No online payment, real enrollment submission, login UI, protected course access, or video playback is represented as working.

## Motion system

- No animation, smooth-scroll, or icon package was added. Existing CSS and small React Client Components cover the preview motion needs.
- Shared CSS tokens: fast `180ms`, normal `320ms`, slow `700ms`; easing `cubic-bezier(.22, 1, .36, 1)` and `cubic-bezier(.2, .7, .2, 1)`.
- Implemented: route-entry fade/vertical shift using App Router `template.tsx`; hero word emphasis; IntersectionObserver section reveals and number count-up; RAF scroll progress; one pinned learning-path panel; subtle pointer tilt for course cards and magnetic CTA movement; smooth scrolling; native reduced-motion support.
- Route transitions use a template remount with CSS, so App Router navigation remains intact. Next.js documents its `viewTransition` config as experimental and not recommended for production; React also documents `<ViewTransition>` as Canary/experimental. Those APIs are not enabled for this static preview. A navigation before/after screenshot has not been inspected yet.
- Motion uses opacity and transform where feasible. The pinned panel updates a transform through a requestAnimationFrame loop while in its section; it stops while hidden, on small screens, or with reduced motion. Pinned layout/scroll height is static to avoid animation-driven layout shifts.
- `prefers-reduced-motion: reduce` suppresses large/repeating transitions and reveals content statically. There is no in-page motion toggle.
- Interaction remains in small client islands; the home page and mock settings/testimonial fetch remain server-rendered in the server-rendered application.

## Data, platform and implementation constraints

- Framework versions read from installed dependencies: Next.js `16.4.0`, React/React DOM `19.3.0`, Tailwind CSS `4.3.3`.
- Next.js App Router deployed on Vercel at the domain root. The visual theme toggle is client-only. Route transitions are CSS-based.
- Course and testimonial interfaces read through `lib/api`; mock data lives in `mocks/`, and components do not import those fixtures directly. The HTTP adapter is an unconnected boundary and is not required for the preview.
- No new npm package added. CSS-first effects avoid another runtime dependency. Client-side course catalog, header, counters, pinning, and form affordances do add JavaScript; bundle size must be measured from the static build before claiming a budget result.
- Static export cannot provide server-only authorization or protected video URLs. API/auth/payment/playback are explicitly outside the visual preview behavior.

## JavaScript budget and verification plan

- Measured from the generated `out/index.html`: nine unique JavaScript files, **638,942 bytes raw / 192,473 bytes gzip** with local gzip compression (`CompressionLevel.Optimal`). This is a transfer-size estimate for the scripts referenced by the root document; it is not a browser network capture and may differ from host Brotli/gzip headers. It exceeds the initial 150 KB gzip target. Before adding the full storefront route set, reduce initial JavaScript to at most **150 KB gzip total**, with a desired route-specific component budget at or below **35 KB gzip** excluding shared Next/React runtime.
- A homepage route-specific split was not identified from the emitted static chunks yet; do not describe any portion as route-only until verified from the client reference manifests or browser network capture.
- Verify contrast token pairs with the formula above; inspect rendered light/dark states, Vietnamese diacritics in both font faces, keyboard operation, mobile menu focus behavior, 360–1920 px layouts, and reduced-motion state in a browser.
- Run type-check, lint and static build after the current changes. Lighthouse, screen reader, real device/browser matrix, and GitHub Pages deep-link behavior remain unverified until actually exercised.
