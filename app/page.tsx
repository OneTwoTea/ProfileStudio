import Link from "next/link";
import { CourseExplorer } from "@/components/sections/course-explorer";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { SiteFooter } from "@/components/sections/site-footer";
import { MagneticLink, StoreHeader } from "@/components/sections/store-header";
import { MotionEnhancements, PinnedLearningPath, ScrollProgress } from "@/components/motion/page-effects";
import { apiClient } from "@/lib/api";
import { CategoryChips, HeroSearch, TestimonialControls } from "@/components/sections/storefront-actions";
import { HeroRibbonBackground } from "@/components/sections/hero-ribbon-background";

const categories = [
 // { slug: "dinh-vi-thuong-hieu-mc", name: "Định vị thương hiệu MC", icon: "◇" },
  //{ slug: "thiet-ke-landing-page", name: "Thiết kế landing page", icon: "✳" },
//{ slug: "showreel-hinh-anh", name: "Showreel & hình ảnh", icon: "◉" },
//  { slug: "noi-dung-chot-show", name: "Nội dung chốt show", icon: "⌁" },
];

const faqItems = [
  {
    question: "Tôi không biết thiết kế hay lập trình, có học được không?",
    answer:
      "Được. Khóa học hướng dẫn từng bước với template có sẵn, không cần viết code. Bạn chỉ cần máy tính, ảnh và video các chương trình mình đã dẫn.",
  },
  {
    question: "Học xong tôi sẽ có sản phẩm gì?",
    answer:
      "Một landing page portfolio hoàn chỉnh mang tên bạn: giới thiệu bản thân, showreel, danh sách sự kiện đã dẫn, cảm nhận khách hàng và nút liên hệ đặt lịch — sẵn sàng gửi cho agency, nhãn hàng hay cô dâu chú rể.",
  },
  {
    question: "Khóa học phù hợp với MC ở mảng nào?",
    answer:
      "MC đám cưới, sự kiện doanh nghiệp, gala, hội nghị, livestream bán hàng hay MC song ngữ đều áp dụng được. Phần định vị sẽ giúp bạn chọn cách trình bày phù hợp với tệp khách của mình.",
  },
  {
    question: "Tôi đăng ký và thanh toán như thế nào?",
    answer:
      "Bạn gửi yêu cầu đăng ký, nhận mã tham chiếu và hướng dẫn chuyển khoản. Quyền truy cập khóa học được cấp sau khi đội ngũ xác nhận thanh toán. Website không thu tiền trực tuyến.",
  },
  {
    question: "Nếu không có thời gian tự làm, tôi có thể thuê thiết kế không?",
    answer:
      "Có. Profile Studio nhận thiết kế trọn gói landing page portfolio cho MC. Xem thêm tại mục Dịch vụ thiết kế hoặc Thư viện mẫu portfolio.",
  },
];

export default async function Home() {
  const [testimonials, settings] = await Promise.all([
    apiClient.listTestimonials().catch(() => []),
    apiClient.getPublicSettings().catch(() => null),
  ]);
  const supportEmail = settings?.support.email ?? "";

  return (
    <main className="market-home">
      <ScrollProgress />
      <MotionEnhancements />
      <StoreHeader />

      <section className="store-hero" aria-labelledby="hero-title">
        <HeroRibbonBackground />
        <div className="store-hero-inner shell">
          <div className="store-hero-copy reveal">
          <span className="hero-eyebrow">
            <i /> KHÔNG GIAN SÁNG TẠO · HỌC TẬP
          </span>
          <h1
            id="hero-title"
            aria-label="Tự tạo landing page portfolio MC chuyên nghiệp."
          >
            <span aria-hidden="true">Tự tạo</span>
            <br/>
            <span aria-hidden="true">portfolio MC</span>
            <br/>
            <span aria-hidden="true">chuyên nghiệp.</span>
          </h1>
          <p className="store-hero-description">
            Học cách xây landing page giới thiệu bản thân, showreel và sự kiện đã dẫn — để khách hàng tin chọn bạn ngay từ lần đầu xem hồ sơ.
          </p>
          <HeroSearch />
          <div className="hero-proof">
            <span>
              Không cần biết code.
              <br />
              <strong>Có portfolio sau khóa học.</strong>
            </span>
            <span className="proof-divider" />
            <span className="proof-rating">
              <b>★ 4.9</b>
              <small>ĐIỂM ĐÁNH GIÁ</small>
            </span>
          </div>
          </div>

          <div className="store-hero-visual reveal">
            <HeroCarousel />
          </div>
        </div>
      </section>

            <section className="bento-section shell" aria-label="Lợi ích khóa học">
        <div className="bento-header reveal">
          <div className="bento-header-left">
            <span className="section-kicker">DÀNH CHO NGƯỜI DẪN CHƯƠNG TRÌNH</span>
            <h2>
              Bạn dẫn hay trên sân khấu,
              <br />
              hãy để <em>hồ sơ nói thay bạn.</em>
            </h2>
          </div>
          <div className="bento-header-right">
            <p>
              Thay vì gửi file PDF hay link Facebook rời rạc, hãy có một trang portfolio gọn gàng để khách hàng xem giọng dẫn, phong cách và kinh nghiệm của bạn chỉ trong một phút.
            </p>
          </div>
        </div>

        <div className="bento-grid">
          <article className="bento-card reveal">
            <div className="bento-card-top">
              <span className="bento-card-num">01</span>
              <span className="bento-card-icon" aria-hidden="true">✳</span>
            </div>
            <div className="bento-card-heading">
              <span className="section-kicker">MC PORTFOLIO</span>
              <h3>Showreel &amp; Hồ sơ số</h3>
            </div>
            <p className="bento-card-desc">
              Gói gọn hình ảnh sân khấu, video showreel và thông tin liên hệ trong một trang chuyên nghiệp để khách hàng tin chọn bạn ngay từ lần đầu.
            </p>
            <div className="bento-card-action">
              <MagneticLink
                href="#featured-courses"
                className="bento-card-link"
              >
                Khám phá khóa học <span>→</span>
              </MagneticLink>
            </div>
          </article>

          <article className="bento-card reveal">
            <div className="bento-card-top">
              <span className="bento-card-num">02</span>
              <span className="bento-card-icon" aria-hidden="true">↗</span>
            </div>
            <div className="bento-card-heading">
              <span className="section-kicker">TEMPLATE</span>
              <h3><span data-count="10">10</span><sup>+</sup> Mẫu landing page</h3>
            </div>
            <p className="bento-card-desc">
              mẫu landing page cho MC cưới, sự kiện, livestream được thiết kế sẵn, tối ưu hiển thị mượt mà trên mọi thiết bị.
            </p>
            <div className="bento-card-action">
              <Link href="/mau-portfolio" className="bento-card-link">
                Xem thư viện mẫu <span>→</span>
              </Link>
            </div>
          </article>

          <article className="bento-card reveal">
            <div className="bento-card-top">
              <span className="bento-card-num">03</span>
              <span className="bento-card-icon" aria-hidden="true">✦</span>
            </div>
            <div className="bento-card-heading">
              <span className="section-kicker">4 BƯỚC HOÀN THIỆN</span>
              <h3>Từ con số 0 đến trang portfolio nhận show</h3>
            </div>
            <div className="bento-card-desc">
              <p>
                Lộ trình tinh gọn từng bước, thực hành trực quan và có ngay sản phẩm hoàn chỉnh mà không cần biết viết code.
              </p>
              <div className="mini-path" aria-hidden="true">
                <i>01</i>
                <span />
                <i>02</i>
                <span />
                <i>03</i>
                <span />
                <i>04</i>
              </div>
            </div>
            <div className="bento-card-action">
              <a href="#learning-path" className="bento-card-link">
                Xem lộ trình <span>→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="trust-band">
        <div className="shell trust-band-inner">
          <div className="trust-band-header reveal">
            <span className="section-kicker">VÌ SAO MC CẦN PORTFOLIO?</span>
            <h2>
              Hồ sơ chuyên nghiệp,
              <br />
              <em>cát-xê xứng đáng.</em>
            </h2>
          </div>

          <div className="trust-band-grid">
            <article className="trust-metric-block reveal">
              <div className="trust-circle-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <strong className="trust-metric-huge">
                <span data-count="1">1</span>
              </strong>
              <h3 className="trust-metric-title">đường link duy nhất</h3>
              <p className="trust-metric-desc">
                Gói trọn toàn bộ hình ảnh, showreel và kinh nghiệm dẫn trong một đường dẫn chuyên nghiệp gửi cho đối tác.
              </p>
              <span className="trust-metric-tag">GỬI KHÁCH TRONG MỌI TIN NHẮN</span>
            </article>

            <article className="trust-metric-block reveal">
              <div className="trust-circle-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <strong className="trust-metric-huge">
                <span data-count="24">24</span>
                <sup>/7</sup>
              </strong>
              <h3 className="trust-metric-title">giới thiệu bạn thay bạn</h3>
              <p className="trust-metric-desc">
                Trang web hoạt động liên tục 24/7, giúp agency và khách hàng tìm hiểu phong cách và đặt lịch bất cứ lúc nào.
              </p>
              <span className="trust-metric-tag">CẢ KHI BẠN ĐANG CẦM MIC</span>
            </article>

            <article className="trust-metric-block reveal">
              <div className="trust-circle-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <strong className="trust-metric-huge">
                0<span className="metric-star">₫</span>
              </strong>
              <h3 className="trust-metric-title">chi phí code website</h3>
              <p className="trust-metric-desc">
                Tự tay làm chủ trang cá nhân với công cụ kéo thả trực quan và template có sẵn, không phụ thuộc lập trình viên.
              </p>
              <span className="trust-metric-tag">TỰ LÀM VỚI TEMPLATE CÓ SẴN</span>
            </article>
          </div>
        </div>
      </section>

      <section
        className="featured-section shell"
        id="featured-courses"
        aria-labelledby="featured-title"
      >
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">KHÓA HỌC CHO MC</span>
            <h2 id="featured-title">Chọn khóa học phù hợp</h2>
            <p>Từ định vị hình ảnh đến tự tay dựng trang portfolio nhận booking.</p>
          </div>
          <Link className="section-more" href="#featured-courses">
            Xem tất cả <span>→</span>
          </Link>
        </div>
        <CourseExplorer />
      </section>

      <PinnedLearningPath />

      <section className="testimonials-section" id="testimonials">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">MC ĐÃ HỌC NÓI GÌ</span>
            </div>
            <TestimonialControls />
          </div>
          <div className="testimonial-list" id="review-list">
            {testimonials.length ? (
              testimonials.map((review, index) => (
                <article className="testimonial-card" key={review.id}>
                  <div
                    className={`testimonial-avatar avatar-${index % 3}`}
                    aria-label={`Ảnh học viên ${review.name}`}
                    role="img"
                  >
                    <span>{review.name.slice(0, 1)}</span>
                  </div>
                  <div
                    className="testimonial-stars"
                    aria-label={`Đánh giá ${review.rating} trên 5`}
                  >
                    {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <div className="testimonial-name">{review.name}</div>
                  <div className="testimonial-role">{review.role}</div>
                </article>
              ))
            ) : (
              <article className="testimonial-card testimonial-empty">
                <span className="section-kicker">LỜI CHỨNG THỰC</span>
                <span>ĐANG CẬP NHẬT</span>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="faq-section shell" id="faq">
        <div className="faq-intro">
          <span className="section-kicker">CÂU HỎI THƯỜNG GẶP</span>
          <h2>
            Trước khi bạn
            <br />
            <em>bắt đầu dựng portfolio.</em>
          </h2>
          <p>Những thắc mắc phổ biến của các MC trước khi đăng ký khóa học.</p>
          {supportEmail && (
            <a href={`mailto:${supportEmail}`} className="section-more">
              Cần hỗ trợ thêm? <span>→</span>
            </a>
          )}
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="faq-item"
              open={index === 0}
            >
              <summary>
                <span>{item.question}</span>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
