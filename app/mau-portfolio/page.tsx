import Link from "next/link";
import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";

const samples = [
  { number: "01", name: "Dẫn chương trình sự kiện", role: "MC SỰ KIỆN", style: "portfolio-art-one", title: "Kết nối những khoảnh khắc đáng nhớ", initials: "MA" },
  { number: "02", name: "MC song ngữ", role: "HOST · BILINGUAL", style: "portfolio-art-two", title: "Your story, on every stage", initials: "LN" },
  { number: "03", name: "MC tiệc cưới", role: "WEDDING HOST", style: "portfolio-art-three", title: "Một ngày kể câu chuyện của hai bạn", initials: "TA" },
];

export default function PortfolioLibraryPage() {
  return <main className="market-home portfolio-page">
    <StoreHeader />
    <section className="portfolio-hero shell">
      <div className="portfolio-hero-copy"><span className="section-kicker">PORTFOLIO STUDIO · DÀNH CHO MC</span><h1>Mẫu portfolio<br />để <em>bạn tỏa sáng.</em></h1><p>Tham khảo những bố cục landing page được thiết kế riêng cho người dẫn chương trình: giới thiệu dấu ấn cá nhân, kinh nghiệm và cách liên hệ.</p><a className="button portfolio-primary" href="#portfolio-library">Khám phá thư viện <span>→</span></a></div>
      <div className="portfolio-hero-note"><span className="portfolio-note-index">01 — 03</span><p>Một trang giới thiệu chỉn chu giúp khách hàng hình dung rõ hơn về phong cách dẫn của bạn.</p><span className="portfolio-note-mark">MC</span></div>
    </section>

    <section className="portfolio-library shell" id="portfolio-library"><div className="portfolio-section-heading"><div><span className="section-kicker">THƯ VIỆN THAM KHẢO</span><h2>Chọn phong cách của bạn</h2><p>Các mẫu dưới đây là concept minh họa cho những hướng portfolio khác nhau.</p></div><span className="portfolio-count">03 CONCEPT</span></div>
      <div className="portfolio-grid">{samples.map((sample) => <article className="portfolio-card" key={sample.number}><div className={`portfolio-preview ${sample.style}`}><div className="portfolio-preview-top"><span>MC STUDIO</span><span>PORTFOLIO / {sample.number}</span></div><div className="portfolio-preview-body"><div><small>{sample.role}</small><h3>{sample.title}</h3><span className="portfolio-preview-link">CÙNG TẠO DẤU ẤN <b>↗</b></span></div><div className="portfolio-preview-person">{sample.initials}</div></div><span className="portfolio-preview-bottom">HOSTING · STORYTELLING · CONNECTION</span></div><div className="portfolio-card-info"><div><span>{sample.number} / PORTFOLIO CONCEPT</span><h3>{sample.name}</h3></div><a href="/dich-vu-thiet-ke" aria-label={`Thuê thiết kế theo mẫu ${sample.name}`}>Tùy chỉnh mẫu <b>→</b></a></div></article>)}</div>
    </section>

    <section className="portfolio-cta"><div className="shell portfolio-cta-inner"><div><span className="section-kicker section-kicker-light">BIẾN Ý TƯỞNG THÀNH TRANG CỦA RIÊNG BẠN</span><h2>Bạn đã có phong cách.<br /><em>Hãy để portfolio kể điều đó.</em></h2></div><Link href="/dich-vu-thiet-ke" className="button button-light">Xem dịch vụ thiết kế <span>→</span></Link></div></section>
    <SiteFooter mode="mc" />
  </main>;
}
