import Link from "next/link";
import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";

const services = [
  {
    number: "01",
    title: "Tự xây portfolio",
    description:
      "Khóa học hướng dẫn MC từng bước tạo landing page giới thiệu bản thân, showreel và kinh nghiệm mà không cần viết code.",
    href: "/#featured-courses",
    link: "Khám phá khóa học",
  },
  {
    number: "02",
    title: "Thiết kế trọn gói",
    description:
      "Dịch vụ thiết kế giúp bạn có một trang portfolio chỉn chu, được xây quanh phong cách dẫn và mục tiêu nghề nghiệp.",
    href: "/dich-vu-thiet-ke",
    link: "Tìm hiểu dịch vụ",
  },
  {
    number: "03",
    title: "Thư viện mẫu",
    description:
      "Tham khảo những concept dành cho MC sự kiện, MC song ngữ và MC tiệc cưới để tìm hướng trình bày phù hợp.",
    href: "/mau-portfolio",
    link: "Xem các mẫu",
  },
];

export default function AboutPage() {
  return (
    <main className="market-home about-page">
      <StoreHeader />

      <section className="about-hero about-wave" aria-labelledby="about-title">
        <div className="shell about-hero-inner">
          <div className="about-hero-copy">
            <span className="section-kicker">PROFILE STUDIO · VỀ CHÚNG TÔI</span>
            <h1 id="about-title">
              Sân khấu là nơi bạn tỏa sáng.
              <br />
              <em>Portfolio giúp câu chuyện ấy đi xa hơn.</em>
            </h1>
            <p>
              Profile Studio giúp người dẫn chương trình xây dựng hình ảnh
              chuyên nghiệp trên môi trường số — qua khóa học tự làm, dịch vụ
              thiết kế và những mẫu portfolio dành riêng cho MC.
            </p>
            <div className="about-hero-actions">
              <Link className="button portfolio-primary" href="/dich-vu-thiet-ke">
                Khám phá dịch vụ <span>→</span>
              </Link>
              <Link className="about-text-link" href="/mau-portfolio">
                Xem thư viện mẫu <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="about-hero-art" aria-hidden="true">
            <span className="about-orbit about-orbit-one" />
            <span className="about-orbit about-orbit-two" />
            <div className="about-art-card">
              <span>PROFILE STUDIO</span>
              <strong>YOUR STORY<br />ON EVERY STAGE</strong>
              <i>HOST · CONNECT · INSPIRE</i>
            </div>
            <span className="about-art-caption">TỪ SÂN KHẤU ĐẾN HỒ SƠ SỐ</span>
          </div>
        </div>
      </section>

      <section className="about-services about-wave" aria-labelledby="about-services-title">
        <div className="shell">
          <div className="about-section-heading">
            <div>
              <span className="section-kicker">PROFILE STUDIO CÓ GÌ?</span>
              <h2 id="about-services-title">Một điểm bắt đầu, ba cách để tiến xa.</h2>
              <p>
                Chọn cách phù hợp với thời gian, ngân sách và mức độ hỗ trợ bạn
                cần.
              </p>
            </div>
          </div>
          <div className="about-service-grid">
            {services.map((service) => (
              <article className="about-service-card" key={service.number}>
                <span className="about-service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={service.href}>
                  {service.link} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-creator about-wave"
        id="nguoi-sang-tao"
        aria-labelledby="about-creator-title"
      >
        <div className="shell about-creator-inner">
          <div className="about-creator-mark" aria-hidden="true">
            <span>PS</span>
            <i>NGƯỜI SÁNG TẠO PROFILE STUDIO</i>
          </div>
          <div className="about-creator-copy" id="hanh-trinh">
            <span className="section-kicker">
              NGƯỜI SÁNG TẠO · THÔNG TIN MINH HỌA
            </span>
            <h2 id="about-creator-title">Nguyễn Minh Anh</h2>
            <span className="about-creator-role">
              Nhà sáng lập &amp; người phát triển Profile Studio
            </span>
            <p>
              Minh Anh xây dựng Profile Studio với mong muốn giúp người dẫn
              chương trình kể câu chuyện nghề nghiệp của mình rõ ràng và chuyên
              nghiệp hơn. Dự án kết hợp hướng dẫn tự làm portfolio với dịch vụ
              thiết kế, để mỗi MC có thể chọn cách phù hợp với mình.
            </p>
            <p>
              Minh Anh tin rằng một hồ sơ tốt nên thể hiện được phong cách dẫn,
              kinh nghiệm, showreel và cách liên hệ — để khách hàng dễ hình dung
              người đứng trên sân khấu trước khi gửi lời mời.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
