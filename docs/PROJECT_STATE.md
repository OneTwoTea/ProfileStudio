# Project state

Updated: 2026-10-11

## Scope and decisions

- Current work: Sapphire & Gold visual direction and storefront preview, built on the completed Foundation phase.
- Default theme is light; optional dark tokens and a client theme switch are present.
- “Study Studio” is a temporary preview label. Business name, field of study, founder, actual hero story and course content have not been supplied.
- Deploy the Next.js App Router application on Vercel at the domain root.
- No login UI in preview scope. No real enrollment, online payment, protected course access, or video playback is implemented.
- Do not add backend implementation, secrets, or sensitive client configuration.

## Delivered in this update

- Replaced the former Nocturne palette and sample design-system wording with Sapphire & Gold.
- Built a storefront-style home page with search, category chips, promotion bento, stats, course cards/tabs, pinned path, testimonials, FAQ and dense footer.
- Added responsive header with search, mobile menu, theme switch and motion switch.
- Added custom labeled founder-portrait placeholder; all course/testimonial imagery and preview facts remain visibly marked as samples.
- Recorded palette decisions, computed WCAG token ratios, typography, motion approach and budget targets in `docs/DESIGN_DECISIONS.md`.

## Verification status

- Contrast pair arithmetic completed with WCAG relative-luminance formula; external browser contrast tool and rendered pair audit not run. Ratios are listed in `docs/DESIGN_DECISIONS.md`.
- Passed on 2026-10-11: npm.cmd run lint, npm.cmd run typecheck, npm.cmd run build; static export prerendered / and /_not-found.
- Root HTML references 9 JavaScript files totaling 638,942 raw bytes / 192,473 gzip bytes (local compression estimate), exceeding the 150 KB gzip target. This estimate is not a browser transfer capture; reduce before adding more routes.
- Build warning remains: Turbopack ignored parent `C:\Users\ASUS\package-lock.json` outside the repository; build still succeeded.
- Not verified yet: browser visual inspection, 360–1920 px manual sweep, keyboard/screen-reader behavior, reduced-motion experience, Lighthouse/Web Vitals or real browser matrix.
- Any real API, authentication, access control, payment instructions and video playback require backend implementation and remain outside this preview.
