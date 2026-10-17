import { apiClient } from "@/lib/api";
import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";

const deliverables = [
  { number: "01", title: "Định hình câu chuyện", description: "Cùng chọn điểm nổi bật, phong cách dẫn và nhóm khách hàng bạn muốn kết nối." },
  { number: "02", title: "Thiết kế landing page", description: "Bố cục riêng cho MC với phần giới thiệu, kinh nghiệm, hình ảnh và dịch vụ." },
  { number: "03", title: "Hoàn thiện & bàn giao", description: "Rà soát trên điện thoại và máy tính, sau đó bàn giao trang để bạn sẵn sàng chia sẻ." },
];

export default async function DesignServicePage() {
  const settings = await apiClient.getPublicSettings().catch(() => null);
  const email = settings?.support.email;
  const contactHref = email ? `mailto:${email}?subject=${encodeURIComponent("Tư vấn thiết kế portfolio MC")}` : "#contact-note";

  return <main className="market-home service-page">
    <StoreHeader />
    <section className="service-hero shell"><div className="service-hero-copy"><span className="section-kicker">DỊCH VỤ THIẾT KẾ TRỌN GÓI</span><h1>Portfolio mang<br />đúng <em>chất riêng.</em></h1><p>Dành cho MC muốn có một landing page chuyên nghiệp mà không phải tự lo từng khâu thiết kế. Bạn tập trung vào sân khấu, chúng tôi cùng bạn kể câu chuyện nghề nghiệp.</p><a className="button portfolio-primary" href={contactHref}>Trao đổi về dự án <span>→</span></a><span className="service-hero-caption">TƯ VẤN THEO NHU CẦU · THIẾT KẾ RIÊNG CHO MC</span></div><div className="service-hero-art"><div className="service-art-orbit service-orbit-one"/><div className="service-art-orbit service-orbit-two"/><div className="service-art-card"><span>MC / PORTFOLIO</span><strong>Giọng nói<br /><em>của riêng bạn.</em></strong><i>HOST · CONNECT · INSPIRE</i><b>01 — 03</b></div><span className="service-art-star">✳</span><span className="service-art-caption">YOUR STORY, BEAUTIFULLY TOLD</span></div></section>

    <section className="service-benefits"><div className="shell"><div className="portfolio-section-heading"><div><span className="section-kicker">TỪ Ý TƯỞNG ĐẾN TRANG HOÀN CHỈNH</span><h2>Một quy trình rõ ràng</h2><p>Thiết kế được xây dựng quanh hình ảnh và mục tiêu nghề nghiệp của bạn.</p></div></div><div className="service-steps">{deliverables.map((step) => <article className="service-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>

    <section className="service-contact shell" id="contact-note"><div><span className="section-kicker">SẴN SÀNG BẮT ĐẦU?</span><h2>Kể chúng tôi nghe<br />về <em>trang portfolio bạn cần.</em></h2><p>{email ? `Liên hệ trực tiếp qua ${email} để trao đổi mong muốn và phạm vi thiết kế.` : "Kênh liên hệ dịch vụ sẽ được cập nhật sớm. Hiện trang này giới thiệu gói dịch vụ, chưa gửi yêu cầu tự động."}</p></div><div className="service-contact-actions">{email ? <a className="button portfolio-primary" href={contactHref}>Gửi email tư vấn <span>→</span></a> : <span className="service-contact-pending">ĐANG CẬP NHẬT THÔNG TIN LIÊN HỆ</span>}<a className="service-sample-link" href="/mau-portfolio">Xem thư viện mẫu <b>↗</b></a></div></section>
    <SiteFooter />
  </main>;
}
