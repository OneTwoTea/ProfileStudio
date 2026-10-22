import Link from "next/link";
import { apiClient } from "@/lib/api";

export async function SiteFooter() {
  const settings = await apiClient.getPublicSettings().catch(() => null);
  const supportEmail = settings?.support.email ?? "";

  return <footer className="market-footer" id="site-footer">
    <div className="shell"><div className="footer-main">
    <div className="footer-brand-col"><Link className="market-logo footer-logo" href="/">
    <span className="market-logo-mark">PS
      </span>
      <span>PROFILE STUDIO<span className="market-logo-sub">PORTFOLIO & LEARNING
        </span>
        </span>
        </Link><p>Khóa học tạo landing page portfolio<br />dành cho MC dẫn chương trình.</p>{supportEmail && <a href={`mailto:${supportEmail}`}>{supportEmail}</a>}
        </div>
    <div className="footer-column">
      <h3>KHÁM PHÁ</h3>
      <Link href="/#featured-courses">Tất cả khóa học</Link>
      <Link href="/#learning-path">Lộ trình học</Link>
      <Link href="/#testimonials">Câu chuyện học viên</Link>
    </div>
    <div className="footer-column"><h3>VỀ CHÚNG TÔI</h3>
      <Link href="/ve-chung-toi#hanh-trinh">Câu chuyện</Link>
      <Link href="/ve-chung-toi#nguoi-sang-tao">Người sáng tạo</Link>
      <Link href="/#faq">Câu hỏi thường gặp</Link>{supportEmail && <a href={`mailto:${supportEmail}`}>Liên hệ</a>}</div>
    <div className="footer-column"><h3>HỖ TRỢ</h3>
      <Link href="/#faq">Hướng dẫn đăng ký</Link>
     <Link href="/#faq">Hướng dẫn học</Link>{supportEmail && <a href={`mailto:${supportEmail}`}>Trung tâm hỗ trợ</a>}
      <Link href="/#footer-legal">Chính sách & điều khoản</Link></div>
    </div>
<div className="footer-legal" id="footer-legal"><span>© 2026 PROFILE STUDIO</span><span>TIỀN TỆ: VND · MÚI GIỜ: ASIA/HA NOI</span>
  </div>
  </div>
  </footer>;
}
