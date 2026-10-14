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
  title: "Profile Studio",
  description:
    "Khám phá lớp học thực tiễn, học từ người làm nghề và biến kiến thức thành điều bạn có thể làm được.",
  metadataBase: new URL("https://www.profilestudio.me/"),
  openGraph: {
    title: "Profile Studio",
    description: "Design, lập trình, marketing và nhiều hơn nữa. Học từ người làm nghề và biến kiến thức thành điều bạn có thể làm được.",
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
