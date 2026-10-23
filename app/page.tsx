import Link from "next/link";
import { CourseExplorer } from "@/components/sections/course-explorer";
import { HeroVideo } from "@/components/sections/hero-video";
import { SiteFooter } from "@/components/sections/site-footer";
import { MagneticLink, StoreHeader } from "@/components/sections/store-header";
import { MotionEnhancements, PinnedLearningPath, ScrollProgress } from "@/components/motion/page-effects";
import { apiClient } from "@/lib/api";
import { CategoryChips, HeroSearch, TestimonialControls } from "@/components/sections/storefront-actions";

const categories = [
 // { slug: "dinh-vi-thuong-hieu-mc", name: "Định vị thương hiệu MC", icon: "◇" },
  //{ slug: "thiet-ke-landing-page", name: "Thiết kế landing page", icon: "✳" },
//{ slug: "showreel-hinh-anh", name: "Showreel & hình ảnh", icon: "◉" },
//  { slug: "noi-dung-chot-show", name: "Nội dung chốt show", icon: "⌁" },
];

const faqItems = [
  {
    question: "Tôi đăng ký và thanh toán như thế nào?",
    answer:
      "Bạn gửi yêu cầu đăng ký, nhận mã tham chiếu và hướng dẫn chuyển khoản. Quyền truy cập khóa học được cấp sau khi đội ngũ xác nhận thanh toán. Website không thu tiền trực tuyến.",
  },
  {
    question: "Tôi không biết thiết kế hay lập trình, có học được không?",
    answer:
      "Được. Khóa học hướng dẫn từng bước với template có sẵn, không cần viết code. Bạn chỉ cần máy tính, ảnh và video các chương trình mình đã dẫn.",
  },
  {
    question: "Học xong tôi sẽ có sản phẩm gì?",
    answer:
      "Một landing page portfolio hoàn chỉnh mang tên bạn: giới thiệu bản thân, showreel, danh sách sự kiện đã dẫn, cảm nhận khách hàng và nút liên hệ đặt lịch - sẵn sàng gửi cho agency, nhãn hàng hay cô dâu chú rể.",
  },
  {
    question: "Khóa học phù hợp với MC ở mảng nào?",
    answer:
      "MC đám cưới, sự kiện doanh nghiệp, gala, hội nghị, livestream bán hàng hay MC song ngữ đều áp dụng được. Phần định vị sẽ giúp bạn chọn cách trình bày phù hợp với tệp khách của mình.",
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

      <section className="ps-hero" aria-labelledby="hero-title">
        <div className="ps-hero-glow" aria-hidden="true" />
        <div className="ps-hero-inner">
          <div className="ps-hero-copy reveal">
            <p className="ps-hero-badge">
              <span>MỚI</span>
              Khóa học dành riêng cho MC &amp; người dẫn chương trình
            </p>
            <h1 id="hero-title">
              Tự tạo <span className="ps-hero-nowrap">portfolio <span className="ps-hero-mark">MC</span></span>
              <br />
              <span className="ps-hero-accent">chuyên nghiệp.</span>
            </h1>
            <p className="ps-hero-description">
              Học cách xây landing page giới thiệu bản thân, showreel và sự kiện đã dẫn - để khách hàng <strong>tin chọn bạn ngay từ lần đầu</strong> xem hồ sơ.
            </p>
            <HeroSearch />
            <div className="ps-hero-proof">
              <div className="ps-proof-item">
                <span className="ps-proof-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
                    <path d="m4 20 16-16" />
                  </svg>
                </span>
                <span>
                  Không cần biết code
                  <strong>Có portfolio sau khóa học</strong>
                </span>
              </div>
              <div className="ps-proof-rating">
                <b>4.9</b>
                <span>
                  <span className="ps-proof-stars" role="img" aria-label="Đánh giá 4.9 trên 5 sao">★★★★★</span>
                  <small>ĐIỂM ĐÁNH GIÁ</small>
                </span>
              </div>
            </div>
          </div>

          <div className="ps-hero-visual reveal">
            <HeroVideo />
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
              <em>hãy để hồ sơ nói thay bạn.</em>
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
            <div className="bento-card-heading">
              <span className="section-kicker">MC PORTFOLIO</span>
              <h3>Showreel &amp; Hồ sơ số</h3>
            </div>
            <p className="bento-card-desc">
              Gói gọn hình ảnh sân khấu, video showreel và thông tin liên hệ trong một trang chuyên nghiệp để khách hàng tin chọn bạn ngay từ lần đầu.
            </p>
            <ul className="bento-tags" aria-label="Nội dung hồ sơ">
              <li>Showreel</li>
              <li>Ảnh sân khấu</li>
              <li>Liên hệ nhanh</li>
            </ul>
            <div className="bento-card-action">
              <MagneticLink
                href="#featured-courses"
                className="bento-card-link"
              >
                Khám phá khóa học
              </MagneticLink>
            </div>
          </article>

          <article className="bento-card reveal">
            <div className="bento-card-heading">
              <span className="section-kicker">TEMPLATE</span>
              <h3><span data-count="10">10</span><sup>+</sup> Mẫu landing page</h3>
            </div>
            <p className="bento-card-desc">
              mẫu landing page cho MC cưới, sự kiện, livestream được thiết kế sẵn, tối ưu hiển thị mượt mà trên mọi thiết bị.
            </p>
            <ul className="bento-tags" aria-label="Loại mẫu">
              <li>MC cưới</li>
              <li>Sự kiện</li>
              <li>Livestream</li>
            </ul>
            <div className="bento-card-action">
              <Link href="/mau-portfolio" className="bento-card-link">
                Xem thư viện mẫu
              </Link>
            </div>
          </article>

          <article className="bento-card reveal">
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
              <a href="#learning-path" className="bento-card-link">Xem lộ trình</a>
            </div>
          </article>
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
            <h3 id="featured-title">Chọn khóa học phù hợp</h3>
          </div>
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
          <p>Những thắc mắc phổ biến của các MC trước khi đăng ký khóa học.</p>
          {supportEmail && (
            <a href={`mailto:${supportEmail}`} className="section-more">
              Cần hỗ trợ thêm?
            </a>
          )}
          <div className="why-list">
            <span className="section-kicker"><em>VÌ SAO MC CẦN PORTFOLIO?</em></span>
            <ul>
              <li className="reveal">
                <strong className="why-list-metric"><span data-count="1">1</span></strong>
                <div>
                  <h3>đường link duy nhất</h3>
                  <p>Gói trọn toàn bộ hình ảnh, showreel và kinh nghiệm dẫn trong một đường dẫn chuyên nghiệp gửi cho đối tác.</p>
                </div>
              </li>
              <li className="reveal">
                <strong className="why-list-metric"><span data-count="24">24</span><sup>/7</sup></strong>
                <div>
                  <h3>giới thiệu bạn thay bạn</h3>
                  <p>Trang web hoạt động liên tục 24/7, giúp agency và khách hàng tìm hiểu phong cách và đặt lịch bất cứ lúc nào.</p>
                </div>
              </li>
              <li className="reveal">
                <strong className="why-list-metric">0<sup>₫</sup></strong>
                <div>
                  <h3>chi phí code website</h3>
                  <p>Tự tay làm chủ trang cá nhân với công cụ kéo thả trực quan và template có sẵn, không phụ thuộc lập trình viên.</p>
                </div>
              </li>
            </ul>
          </div>
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
