import Link from "next/link";
import { apiClient } from "@/lib/api";
import { MockNewsletter } from "@/components/sections/storefront-actions";

type SiteFooterProps = {
  mode?: "home" | "mc";
};

export async function SiteFooter({ mode = "home" }: SiteFooterProps) {
  const settings = await apiClient.getPublicSettings().catch(() => null);
  const supportEmail = settings?.support.email ?? "";
  const isMc = mode === "mc";

  return <footer className="market-footer" id="site-footer">
    <div className="shell"><div className="footer-main">
    <div className="footer-brand-col"><Link className="market-logo footer-logo" href="/">
    <span className="market-logo-mark">{isMc ? "PS" : "PS"}
      </span>
      <span>{isMc ? "PROFILE STUDIO" : "PROFILE STUDIO"}<span className="market-logo-sub">{isMc ? "PORTFOLIO & LEARNING" : "PORTFOLIO & LEARNING"}
        </span>
        </span>
        </Link><p>{isMc ? <>Thiết kế portfolio landing page<br />dành riêng cho người dẫn chương trình.</> : <>Khóa học tạo landing page portfolio<br />dành cho MC dẫn chương trình.</>}</p>{supportEmail && <a href={`mailto:${supportEmail}`}>{supportEmail}</a>}
        </div>
    <div className="footer-column">
      <h3>{isMc ? "PORTFOLIO" : "KHÁM PHÁ"}
        </h3>{isMc ? <>
        <Link href="/mau-portfolio">Thư viện mẫu</Link>
        <Link href="/dich-vu-thiet-ke">Dịch vụ thiết kế</Link><Link href="/#featured-courses">Khóa học</Link></> : <><Link href="/#featured-courses">Tất cả khóa học</Link><Link href="/#learning-path">Lộ trình học</Link><Link href="/#category-title">Danh mục</Link><Link href="/#testimonials">Câu chuyện học viên</Link></>}</div>
    <div className="footer-column"><h3>VỀ CHÚNG TÔI</h3>
      <Link href="/#footer-legal">Câu chuyện</Link>
      <Link href="/#footer-legal">Người sáng lập</Link>
      <Link href="/#faq">Câu hỏi thường gặp</Link>{supportEmail && <a href={`mailto:${supportEmail}`}>Liên hệ</a>}</div>
    <div className="footer-column"><h3>HỖ TRỢ</h3>
      <Link href="/#faq">Hướng dẫn đăng ký</Link>
     <Link href="/#faq">Hướng dẫn học</Link>{supportEmail && <a href={`mailto:${supportEmail}`}>Trung tâm hỗ trợ</a>}
      <Link href="/#footer-legal">Chính sách & điều khoản</Link></div>
    <div className="footer-newsletter"><h3>THƯ TỪ STUDIO</h3>
      <p>{isMc ? "Nhận tin mới về mẫu portfolio và dịch vụ thiết kế." : "Nhận mẹo xây portfolio MC và ưu đãi khóa học mới."}</p>
    <MockNewsletter /></div>
    </div>
  <div className="footer-legal" id="footer-legal"><span>© 2026 {isMc ? "PROFILE STUDIO" : "PROFILE STUDIO"}</span><span>TIỀN TỆ: VND · MÚI GIỜ: ASIA/HO_CHI_MINH</span>
  </div>
  </div>
  </footer>;
}
