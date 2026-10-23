# Profile Studio

Vietnamese marketing site and course storefront for **Profile Studio**, which helps MCs build their own portfolio landing page. It is built with Next.js 16 (App Router), React 19 and Tailwind CSS v4, and uses the Sapphire & Gold visual direction.

> **Preview status:** the course catalog, pricing, testimonials, founder portrait and portfolio samples are placeholders. Enrollment and newsletter forms do not send real requests or take payments.

## Quick start

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local   # optional; mock mode is the default
npm run dev
```

Open http://localhost:3000/.

On Windows PowerShell, use `npm.cmd` if script execution blocks `npm`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |

Run `typecheck`, `lint` and `build` before you push.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero carousel, course explorer, testimonials, FAQ |
| `/dich-vu-thiet-ke` | Landing-page design service |
| `/mau-portfolio` | Portfolio samples |
| `/ve-chung-toi` | About us |

## Project layout

```
app/                 Routes, root layout, global styles (design tokens in globals.css)
components/sections/ Page sections: header, footer, hero carousel, course explorer…
components/ui/       Small UI primitives (badge, skeleton)
components/motion/   Page motion effects
lib/api/             Data adapter: contract, mock client, HTTP client
lib/types/           Shared types
lib/motion/          Motion tokens
mocks/               Sample data used in mock mode
public/images/       Static images (hero, courses, about, effect)
docs/                Design decisions and project state
```

## Data and API

Components get data through `apiClient` from `lib/api` and never import `mocks/` directly. The contract is in [lib/api/contracts.ts](lib/api/contracts.ts).

| Variable | Values |
| --- | --- |
| `NEXT_PUBLIC_API_MODE` | `mock` (default, also used when unset) or `http` |
| `NEXT_PUBLIC_API_BASE_URL` | Backend endpoint for `http` mode, e.g. `https://api.profilestudio.me/api/v1` |

`NEXT_PUBLIC_*` values are bundled into the browser. Never put secrets, tokens or private API keys in them.

Authentication, course access control, payments and signed video playback depend on a backend and are not part of this frontend.

## Images

Most images live in `public/images/`. The home hero carousel reads `public/images/hero/anh1.png`–`anh3.png`; to swap them, overwrite those files or edit the list in [components/sections/hero-carousel.tsx](components/sections/hero-carousel.tsx).

Hướng dẫn đầy đủ về mọi vị trí ảnh và placeholder (kích thước đề xuất, file cần sửa, code mẫu): [HUONG_DAN_CHINH_ANH_GIAO_DIEN.md](HUONG_DAN_CHINH_ANH_GIAO_DIEN.md).

## Deploy on Vercel

1. Import the GitHub repository in Vercel. Keep the **Next.js** preset and default build settings.
2. Add the variables from `.env.example` under **Project Settings → Environment Variables** if you need them.
3. Deploy. Under **Project Settings → Domains**, add `www.profilestudio.me` (and optionally `profilestudio.me`, redirected to `www`), then set the DNS records Vercel shows.

No `vercel.json` is needed. The app uses the Next.js server runtime, so `next/image` optimization works.

## More docs

- [docs/DESIGN_DECISIONS.md](docs/DESIGN_DECISIONS.md): palette, contrast ratios, typography, motion
- [docs/PROJECT_STATE.md](docs/PROJECT_STATE.md): scope, what's done, what's left to verify
- [AGENTS.md](AGENTS.md): notes for AI coding agents. This Next.js version has breaking changes, so check `node_modules/next/dist/docs/` before relying on older APIs.
