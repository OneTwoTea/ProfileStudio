# Hướng Dẫn Thay Đổi & Tùy Chỉnh Hình Ảnh Giao Diện Profile Studio

Tài liệu này tổng hợp **toàn bộ các vị trí đang sử dụng ảnh hoặc placeholder (ảnh giữ chỗ)** trong toàn bộ dự án Profile Studio, kèm theo đường dẫn file cụ thể, kích thước khuyến nghị, quy chuẩn kỹ thuật và đoạn mã mẫu (code snippet) để bạn dễ dàng thay thế sang hình ảnh thực tế.

---

## 1. Bảng Tra Cứu Nhanh Tất Cả Vị Trí Ảnh & Placeholder

| STT | Vị trí giao diện | File mã nguồn | Trạng thái hiện tại | Kích thước / Tỉ lệ khuyến nghị |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Banner chính Hero (Trang chủ)** | `components/sections/hero-carousel.tsx` | Đang dùng 3 file ảnh thật trong `public/images/hero/` | 16:9 hoặc 4:3 (khuyên dùng `1200 x 800px` hoặc `1600 x 1000px`) |
| **02** | **Ảnh bìa khóa học (Trang chủ)** | `components/sections/course-explorer.tsx` & `mocks/data.ts` | **Placeholder CSS** (chữ "ẢNH KHÓA HỌC · SẼ CẬP NHẬT") | 16:10 hoặc 16:9 (`800 x 500px` hoặc `600 x 375px`) |
| **03** | **Ảnh đại diện học viên đánh giá (Trang chủ)** | `app/page.tsx` & `mocks/data.ts` | **Placeholder CSS** (chữ cái đầu + "ẢNH GIỮ CHỖ") | 1:1 hình vuông bo tròn (`200 x 200px` hoặc `120 x 120px`) |
| **04** | **Chân dung người sáng tạo (Trang Về chúng tôi)** | `app/ve-chung-toi/page.tsx` | **Placeholder CSS/SVG** (chữ "PS" + khung gradient) | 3:4 hoặc 4:5 chân dung dọc (`920 x 1120px` hoặc `600 x 800px`) |
| **05** | **Ảnh xem trước mẫu Portfolio (Trang Mẫu Portfolio)** | `app/mau-portfolio/page.tsx` | **Placeholder CSS** (thẻ gradient + chữ viết tắt) | Tỉ lệ ~1.12 (`700 x 625px` hoặc `800 x 700px`) |
| **06** | **Logo thương hiệu (Header & Footer)** | `components/sections/store-header.tsx` & `components/sections/site-footer.tsx` | Khối text + ký tự logo "PS" | SVG Vector hoặc PNG trong suốt (`180 x 48px` hoặc biểu tượng `48 x 48px`) |
| **07** | **Favicon & Ảnh chia sẻ mạng xã hội (SEO / OpenGraph)** | `app/layout.tsx` & `app/favicon.ico` | Favicon mặc định, chưa cấu hình ảnh OpenGraph | Favicon `32 x 32px` / `48 x 48px`, OG Image `1200 x 630px` |
| **08** | **Khối đồ họa nghệ thuật Bento & Dịch vụ** | `app/page.tsx` & `app/dich-vu-thiet-ke/page.tsx` | Đồ họa CSS thuần (orbit, gradient card) | Có thể giữ nguyên phong cách tối giản hoặc thay bằng ảnh minh họa 3D/vector |

---

## 2. Hướng Dẫn Chi Tiết Từng Vị Trí

---

### Vị trí 01: Banner Carousel Trang Chủ (Hero Section)

- **File component**: `components/sections/hero-carousel.tsx` (dòng 6 – 19)
- **Thư mục ảnh tĩnh**: `public/images/hero/`
- **Ảnh hiện tại**:
  - `public/images/hero/anh1.png`
  - `public/images/hero/anh2.png`
  - `public/images/hero/anh3.png`
- **Kích thước khuyến nghị**: `1200 x 800px` hoặc `1600 x 1000px`, định dạng `.webp` hoặc `.png`, dung lượng dưới 250KB mỗi ảnh.

#### Cách thay đổi:
**Cách 1 (Nhanh nhất - Không cần sửa code):**
Chỉ cần chuẩn bị 3 ảnh mới với đúng tên file `anh1.png`, `anh2.png`, `anh3.png` và ghi đè vào thư mục `public/images/hero/`.

**Cách 2 (Sửa đường dẫn hoặc thêm bớt ảnh trong code):**
Mở file `components/sections/hero-carousel.tsx`, tìm mảng `slides` ở đầu file và chỉnh sửa:

```tsx
// components/sections/hero-carousel.tsx
const slides = [
  {
    image: "/images/hero/banner-khoa-hoc.webp", // Đường dẫn tính từ thư mục public
    alt: "Landing page portfolio MC chuyên nghiệp",
  },
  {
    image: "/images/hero/banner-showreel.webp",
    alt: "Showreel và hồ sơ sân khấu ấn tượng",
  },
  {
    image: "/images/hero/banner-dinh-vi.webp",
    alt: "Xây dựng thương hiệu cá nhân cho MC",
  },
];
```

---

### Vị trí 02: Ảnh Bìa Khóa Học (Course Card Covers)

- **File giao diện**: `components/sections/course-explorer.tsx` (dòng 38 – 44)
- **File dữ liệu mock**: `mocks/data.ts` (dòng 23 – 96)
- **Hiện trạng**: Khung thẻ khóa học đang hiển thị placeholder CSS với dòng chữ `"ẢNH KHÓA HỌC · SẼ CẬP NHẬT"` và số thứ tự `01`, `02`, `03`. Các đối tượng trong `mockCourses` đều đang có `cover: null`.
- **Kích thước khuyến nghị**: `800 x 500px` (tỉ lệ 16:10), khung hiển thị trên web có chiều cao `180px` (trên máy tính) và `150px` (trên điện thoại).

#### Cách thay đổi:

#### Bước 1: Thêm file ảnh bìa vào `public/images/courses/`
Tạo thư mục `public/images/courses/` và đặt các ảnh khóa học vào (ví dụ: `course-landing-page.webp`, `course-showreel.webp`, `course-brand.webp`).

#### Bước 2: Cập nhật đường dẫn ảnh trong `mocks/data.ts`
Mở `mocks/data.ts`, tìm đến `mockCourses` và cập nhật trường `cover`:

```typescript
// mocks/data.ts
export const mockCourses: Course[] = [
  {
    id: "course-looking",
    slug: "landing-page-portfolio-mc",
    title: "Tự tạo landing page portfolio MC từ A đến Z",
    // ...
    cover: {
      url: "/images/courses/course-landing-page.webp",
      alt: "Khóa học tự tạo landing page portfolio MC",
      width: 800,
      height: 500,
    },
    // ...
  },
  // Tương tự cho các khóa học tiếp theo...
];
```

#### Bước 3: Cập nhật component `CourseCard` trong `components/sections/course-explorer.tsx`
Mở `components/sections/course-explorer.tsx`, import thẻ `Image` từ `"next/image"` (nếu chưa có) và sửa phần hiển thị `.store-course-image`:

```tsx
// Thêm import ở đầu file:
import Image from "next/image";

// Sửa khối div trong CourseCard (khoảng dòng 38):
<div className="store-course-image">
  {course.cover?.url ? (
    <Image
      src={course.cover.url}
      alt={course.cover.alt ?? course.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      style={{ objectFit: "cover" }}
    />
  ) : (
    <>
      <span className="course-image-note">ẢNH KHÓA HỌC · SẼ CẬP NHẬT</span>
      <span className="course-image-monogram" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    </>
  )}
  <Badge tone={course.status === "published" ? "green" : "neutral"}>{status}</Badge>
  <span className="course-image-arrow" aria-hidden="true">↗</span>
</div>
```

---

### Vị trí 03: Ảnh Đại Diện Học Viên Đánh Giá (Testimonials Avatar)

- **File giao diện**: `app/page.tsx` (dòng 247 – 255)
- **File dữ liệu mock**: `mocks/data.ts` (dòng 98 – 102)
- **Hiện trạng**: Khung tròn avatar đang hiển thị ký tự đầu của tên học viên (M, Q, T) cùng nhãn nhỏ `<small>ẢNH GIỮ CHỖ</small>`.
- **Kích thước khuyến nghị**: `200 x 200px` (tỉ lệ 1:1 vuông), hiển thị trên giao diện là vòng tròn `54 x 54px`.

#### Cách thay đổi:

#### Bước 1: Thêm ảnh vào `public/images/avatars/`
Đặt ảnh chân dung học viên vào thư mục `public/images/avatars/` (ví dụ: `hocvien-minhanh.webp`, `hocvien-quanghuy.webp`, `hocvien-thaovy.webp`).

#### Bước 2: Cập nhật mảng `mockTestimonials` trong `mocks/data.ts`
```typescript
// mocks/data.ts
export const mockTestimonials = [
  {
    id: "review-1",
    name: "Minh Anh",
    role: "MC đám cưới",
    quote: "Trước đây mình gửi khách cả chục ảnh và link rời rạc. Giờ chỉ cần một đường link portfolio, khách xem xong là chốt lịch.",
    avatar: "/images/avatars/hocvien-minhanh.webp",
    rating: 5,
  },
  {
    id: "review-2",
    name: "Quang Huy",
    role: "MC sự kiện doanh nghiệp",
    quote: "Không biết code vẫn tự dựng được trang portfolio chỉn chu. Agency đánh giá hồ sơ của mình chuyên nghiệp hơn hẳn.",
    avatar: "/images/avatars/hocvien-quanghuy.webp",
    rating: 5,
  },
  {
    id: "review-3",
    name: "Thảo Vy",
    role: "MC livestream",
    quote: "Phần định vị giúp mình rõ phong cách dẫn của bản thân, nhờ vậy trang portfolio có cá tính và dễ được nhớ đến.",
    avatar: "/images/avatars/hocvien-thaovy.webp",
    rating: 5,
  },
];
```

#### Bước 3: Cập nhật khối hiển thị avatar trong `app/page.tsx`
Mở `app/page.tsx`, import `Image from "next/image"` (nếu chưa có) và cập nhật thẻ `.testimonial-avatar` (khoảng dòng 247):

```tsx
<div
  className={`testimonial-avatar avatar-${index % 3}`}
  aria-label={`Ảnh học viên ${review.name}`}
  role="img"
>
  {review.avatar ? (
    <Image
      src={typeof review.avatar === "string" ? review.avatar : review.avatar.url}
      alt={review.name}
      fill
      sizes="54px"
      style={{ objectFit: "cover" }}
    />
  ) : (
    <>
      <span>{review.name.slice(0, 1)}</span>
      <small>ẢNH GIỮ CHỖ</small>
    </>
  )}
</div>
```

---

### Vị trí 04: Chân Dung Người Sáng Tạo (Trang "Về Chúng Tôi")

- **File giao diện**: `app/ve-chung-toi/page.tsx` (dòng 105 – 109)
- **File placeholder có sẵn**: `public/images/portrait-placeholder.svg` (kích thước gốc 920x1120px)
- **Hiện trạng**: Khối `.about-creator-mark` đang hiển thị chữ nghệ thuật `PS` kèm nhãn `NGƯỜI SÁNG TẠO PROFILE STUDIO`.
- **Kích thước khuyến nghị**: `920 x 1120px` hoặc `600 x 800px` (tỉ lệ 3:4 hoặc 4:5 chân dung đứng).

#### Cách thay đổi:

#### Bước 1: Đặt file ảnh chân dung vào thư mục `public/images/`
Ví dụ: `public/images/founder-portrait.webp` hoặc `public/images/founder.jpg`.

#### Bước 2: Sửa thẻ `.about-creator-mark` trong `app/ve-chung-toi/page.tsx`
Mở `app/ve-chung-toi/page.tsx`, import `Image from "next/image"` và cập nhật:

```tsx
import Image from "next/image";

// Sửa khoảng dòng 105:
<div className="about-creator-mark" aria-hidden="true" style={{ position: "relative" }}>
  <Image
    src="/images/founder-portrait.webp"
    alt="Chân dung nhà sáng lập Profile Studio"
    fill
    sizes="(max-width: 768px) 100vw, 380px"
    style={{ objectFit: "cover" }}
    priority
  />
</div>
```

---

### Vị trí 05: Xem Trước Mẫu Portfolio (Trang "Mẫu Portfolio")

- **File giao diện**: `app/mau-portfolio/page.tsx` (dòng 5 – 9 và dòng 20)
- **Hiện trạng**: Mảng `samples` đang tạo giao diện card bằng CSS gradient (`portfolio-art-one`, `portfolio-art-two`, `portfolio-art-three`) kèm các chữ cái viết tắt `initials: "MA"`, `"LN"`, `"TA"`.
- **Kích thước khuyến nghị**: `800 x 700px` (tỉ lệ ~1.12), chụp màn hình thực tế (mockup) giao diện landing page hoàn chỉnh của MC.

#### Cách thay đổi:
Thêm trường `image` vào mảng `samples`:

```tsx
// app/mau-portfolio/page.tsx
const samples = [
  {
    number: "01",
    name: "Dẫn chương trình sự kiện",
    role: "MC SỰ KIỆN",
    style: "portfolio-art-one",
    title: "Kết nối những khoảnh khắc đáng nhớ",
    initials: "MA",
    image: "/images/templates/template-event-mc.webp", // Thêm đường dẫn ảnh
  },
  {
    number: "02",
    name: "MC song ngữ",
    role: "HOST · BILINGUAL",
    style: "portfolio-art-two",
    title: "Your story, on every stage",
    initials: "LN",
    image: "/images/templates/template-bilingual-mc.webp",
  },
  {
    number: "03",
    name: "MC tiệc cưới",
    role: "WEDDING HOST",
    style: "portfolio-art-three",
    title: "Một ngày kể câu chuyện của hai bạn",
    initials: "TA",
    image: "/images/templates/template-wedding-mc.webp",
  },
];
```

Trong phần hiển thị `.portfolio-preview` (khoảng dòng 20), bạn có thể dùng thẻ `<Image fill ... />` để hiển thị ảnh mockup chụp màn hình thay vì khung CSS gradient:

```tsx
<div className="portfolio-preview" style={{ position: "relative" }}>
  {sample.image ? (
    <Image
      src={sample.image}
      alt={sample.name}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      style={{ objectFit: "cover" }}
    />
  ) : (
    // Giữ nguyên giao diện CSS gradient hiện tại làm fallback
    <>
      <div className="portfolio-preview-top">...</div>
      ...
    </>
  )}
</div>
```

---

### Vị trí 06: Logo Thương Hiệu (Header & Footer)

- **Header**: `components/sections/store-header.tsx` (dòng 49 – 59)
- **Footer**: `components/sections/site-footer.tsx` (dòng 11 – 17)
- **Hiện trạng**: Đang hiển thị icon chữ `<span className="market-logo-mark">PS</span>` và chữ `PROFILE STUDIO`.
- **Kích thước khuyến nghị**:
  - Nếu chỉ thay biểu tượng icon tròn: `48 x 48px` (SVG hoặc PNG trong suốt).
  - Nếu thay toàn bộ logo gồm biểu tượng + chữ: `180 x 48px` hoặc `220 x 54px` (SVG vector).

#### Cách thay thế:
1. Đặt file logo vào `public/logo.svg` (hoặc `public/logo.png`).
2. Trong `components/sections/store-header.tsx` (dòng 49) và `components/sections/site-footer.tsx` (dòng 11):

```tsx
import Image from "next/image";

// Thay thế:
<Link className="market-logo" href="/" aria-label="PORTFOLIO STUDIO">
  <Image
    src="/logo.svg"
    alt="Profile Studio Logo"
    width={160}
    height={40}
    priority
  />
</Link>
```

---

### Vị trí 07: Favicon & Ảnh OpenGraph (Social Share Image)

- **Favicon trình duyệt**: `app/favicon.ico`
  - Đặt file icon định dạng `.ico` (kích thước 32x32px hoặc 48x48px) vào `app/favicon.ico`.
  - Hoặc tạo file `app/icon.png` (512x512px) - Next.js App Router sẽ tự động nhận diện và tạo favicon cho tất cả các thiết bị.

- **Ảnh chia sẻ mạng xã hội (OpenGraph / Zalo / Facebook / Telegram)**:
  - **File cấu hình**: `app/layout.tsx` (dòng 20 – 31)
  - **Kích thước chuẩn**: `1200 x 630px` (tỉ lệ 1.91:1), định dạng JPG hoặc PNG.
  - **Cách thêm**:
    1. Đặt ảnh vào `public/og-image.jpg`.
    2. Cập nhật metadata trong `app/layout.tsx`:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "Profile Studio — Khóa học tạo landing page portfolio cho MC",
  description:
    "Khóa học giúp MC dẫn chương trình tự tạo landing page portfolio chuyên nghiệp: định vị thương hiệu, showreel, sự kiện đã dẫn và form đặt lịch — không cần code.",
  metadataBase: new URL("https://www.profilestudio.me/"),
  openGraph: {
    title: "Profile Studio — Portfolio chuyên nghiệp cho MC",
    description: "Tự tạo landing page portfolio MC để khách hàng tin chọn bạn ngay từ lần đầu xem hồ sơ.",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Studio — Portfolio chuyên nghiệp cho MC",
      },
    ],
  },
};
```

---

### Vị trí 08: Các Khối Minh Họa Đồ Họa Nghệ Thuật (Bento & Hero Art)

Các khối này hiện được vẽ hoàn toàn bằng CSS tinh tế, mang ngôn ngữ thương hiệu hiện đại:
- `app/page.tsx`: Khối `.bento-feature-art` (Bento card 01 "MC PORTFOLIO").
- `app/dich-vu-thiet-ke/page.tsx`: Khối `.service-hero-art` (vòng quỹ đạo + card "Giọng nói của riêng bạn").
- `app/ve-chung-toi/page.tsx`: Khối `.about-hero-art` (quỹ đạo + card "YOUR STORY ON EVERY STAGE").

*Lưu ý: Bạn có thể giữ nguyên thiết kế CSS này vì độ mượt mà và tải trang tức thì, hoặc có thể lồng thêm ảnh chụp show diễn của MC vào nền với hiệu ứng làm mờ nhẹ (overlay) nếu muốn.*

---

## 3. Quy Chuẩn & Lưu Ý Kỹ Thuật Khi Đưa Ảnh Vào Dự Án

1. **Vị trí lưu trữ file tĩnh**:
   - Tất cả ảnh tĩnh để hiển thị trên web nên gom vào thư mục con bên trong `public/images/`:
     - `public/images/hero/` (ảnh banner trang chủ)
     - `public/images/courses/` (ảnh bìa khóa học)
     - `public/images/avatars/` (ảnh đại diện học viên)
     - `public/images/templates/` (ảnh mẫu portfolio)
     - `public/images/about/` (ảnh giới thiệu)
   - Đường dẫn trong code luôn bắt đầu bằng dấu `/` (ví dụ: `src="/images/courses/anh.webp"`).

2. **Định dạng và dung lượng**:
   - Ưu tiên sử dụng định dạng **WebP** hoặc **AVIF** để tối ưu tốc độ tải và điểm SEO Google Lighthouse.
   - Dung lượng khuyến nghị:
     - Banner lớn: dưới 250 KB.
     - Ảnh bìa thẻ/mockup: dưới 120 KB.
     - Avatar / Icon: dưới 30 KB.
   - Công cụ nén ảnh miễn phí: [TinyPNG](https://tinypng.com/) hoặc [Squoosh](https://squoosh.app/).

3. **Cấu hình nếu sử dụng ảnh từ dịch vụ đám mây bên ngoài (Cloudinary, AWS S3, Unsplash...)**:
   - Nếu bạn dùng URL từ nguồn ngoài (ví dụ: `https://images.unsplash.com/...`), cần khai báo tên miền trong `next.config.ts`:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // ... các cấu hình khác giữ nguyên
};

export default nextConfig;
```

