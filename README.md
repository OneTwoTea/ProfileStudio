# Study Studio — preview

Vietnamese course-storefront interface concept using the Sapphire & Gold visual direction. “Study Studio” and the content are temporary preview labels; business identity, founder, real course catalog, pricing, and testimonials still need to be supplied.

## Run locally

```bash
npm.cmd run dev
```

Open `http://localhost:3000/`.

## Deploy on Vercel

1. Import this GitHub repository in Vercel and keep the **Next.js** framework preset and default build settings (`npm run build`).
2. Add environment variables from `.env.example` in **Project Settings → Environment Variables** when needed. `NEXT_PUBLIC_API_MODE=mock` uses preview data. For a live API, set it to `http` and set `NEXT_PUBLIC_API_BASE_URL` to the backend endpoint. These values are public in the browser bundle; do not put secrets in `NEXT_PUBLIC_*` variables.
3. Deploy the project. In **Project Settings → Domains**, add `www.profilestudio.me` (and optionally `profilestudio.me`, configured to redirect to the `www` domain). Confirm the DNS records Vercel shows for the domain.

The project uses the Next.js server runtime, so Vercel can serve optimized `next/image` images. No `vercel.json` is required.

## Thêm ảnh landing page vào carousel

Khung quảng bá ở hero dùng ảnh chữ nhật nằm ngang tỉ lệ 16:10. Xem [hướng dẫn thêm ảnh landing page](docs/ADDING_HERO_IMAGES.md) để biết kích thước đề xuất, vị trí lưu ảnh và cách gắn từng ảnh vào carousel.

## Data and API

- The default `NEXT_PUBLIC_API_MODE=mock` (also the fallback when unset) uses sample data from `mocks/` through `lib/api`.
- `NEXT_PUBLIC_API_MODE=http` selects the HTTP adapter; set `NEXT_PUBLIC_API_BASE_URL` using `.env.example`.
- Components use the data adapter and do not import mock fixtures directly.
- Values with the `NEXT_PUBLIC_*` prefix are public in the browser bundle. Never put secrets, tokens, or private API keys there.
- Enrollment/newsletter interactions in this preview do not submit real requests or process payments.
- Real authentication, course authorization, and signed video playback depend on backend behavior and are not provided by this frontend.

## Checks

```bash
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```
