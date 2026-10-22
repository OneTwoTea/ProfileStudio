import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { ThemePreference } from "@/components/sections/theme-preference";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Profile Studio - Khóa học tạo landing page portfolio cho MC",
  description:
    "Khóa học giúp MC dẫn chương trình tự tạo landing page portfolio chuyên nghiệp: định vị thương hiệu, showreel, sự kiện đã dẫn, cảm nhận khách hàng và nút liên hệ đặt lịch.",
  metadataBase: new URL("https://www.profilestudio.me/"),
  openGraph: {
    title: "Profile Studio - Portfolio chuyên nghiệp cho MC",
    description: "Tự tạo landing page portfolio MC để khách hàng tin chọn bạn ngay từ lần đầu xem hồ sơ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${beVietnam.variable}`}>
      <body>
        <ThemePreference />
        <a href="#main-content" className="skip-link">Bỏ qua điều hướng</a>
        <div id="top" />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
