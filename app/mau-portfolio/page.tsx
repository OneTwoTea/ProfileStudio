import Link from "next/link";
import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";

const samples = [
  { number: "01", name: "Dẫn chương trình sự kiện", role: "MC SỰ KIỆN", style: "portfolio-art-one", title: "Kết nối những khoảnh khắc đáng nhớ", initials: "MA" },
  { number: "02", name: "MC song ngữ", role: "HOST · BILINGUAL", style: "portfolio-art-two", title: "Your story, on every stage", initials: "LN" },
  { number: "03", name: "MC tiệc cưới", role: "WEDDING HOST", style: "portfolio-art-three", title: "Một ngày kể câu chuyện của hai bạn", initials: "TA" },
];

export default function PortfolioLibraryPage() {
  return (
    <main className="market-home portfolio-page">
      <StoreHeader />
      <section className="portfolio-hero shell">
        <div className="portfolio-hero-copy">
          <div className="portfolio-hero-heading">
            <h1>
              Mẫu portfolio
              <br />
              để bạn tỏa sáng.
            </h1>
          </div>
          <div className="portfolio-hero-action">
            <p>
              Tham khảo những bố cục landing page được thiết kế riêng cho người dẫn chương trình: giới thiệu dấu ấn cá nhân, kinh nghiệm và cách liên hệ.
            </p>
          </div>
        </div>
      </section>

      <section className="portfolio-library shell" id="portfolio-library">
        <div className="portfolio-section-heading">
          <div>
            <span className="section-kicker">THƯ VIỆN THAM KHẢO</span>
            <h2>Chọn phong cách của bạn</h2>
          </div>
        </div>
        <div className="portfolio-grid">
          {samples.map((sample) => (
            <article className="portfolio-card" key={sample.number}>
              <div className={`portfolio-preview ${sample.style}`}>
                <div className="portfolio-preview-top">
                  <span>MC STUDIO</span>
                  <span>PORTFOLIO / {sample.number}</span>
                </div>
                <div className="portfolio-preview-body">
                  <div>
                    <small>{sample.role}</small>
                    <h3>{sample.title}</h3>
                    <span className="portfolio-preview-link">CÙNG TẠO DẤU ẤN</span>
                  </div>
                  <div className="portfolio-preview-person">{sample.initials}</div>
                </div>
                <span className="portfolio-preview-bottom">HOSTING · STORYTELLING · CONNECTION</span>
              </div>
              <div className="portfolio-card-info">
                <div>
                  <span>{sample.number} / PORTFOLIO CONCEPT</span>
                  <h3>{sample.name}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
