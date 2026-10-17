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
  { slug: "dinh-vi-thuong-hieu-mc", name: "Định vị thương hiệu MC", icon: "◇" },
  { slug: "thiet-ke-landing-page", name: "Thiết kế landing page", icon: "✳" },
  { slug: "showreel-hinh-anh", name: "Showreel & hình ảnh", icon: "◉" },
  { slug: "noi-dung-chot-show", name: "Nội dung chốt show", icon: "⌁" },
];

const faqItems = [
  {
    question: "Tôi không biết thiết kế hay lập trình, có học được không?",
    answer:
      "Được. Khóa học hướng dẫn từng bước bằng công cụ kéo thả và template có sẵn, không cần viết code. Bạn chỉ cần máy tính, ảnh và video các chương trình mình đã dẫn.",
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
            <i /> KHÓA HỌC DÀNH CHO MC · DẪN CHƯƠNG TRÌNH
          </span>
          <h1
            id="hero-title"
            aria-label="Tự tạo landing page portfolio MC chuyên nghiệp."
          >
            <span aria-hidden="true">Tự tạo</span>
            <br />
            <span aria-hidden="true">portfolio MC</span>
            <br />
            <span aria-hidden="true">chuyên nghiệp.</span>
          </h1>
          <p className="store-hero-description">
            Học cách xây landing page giới thiệu bản thân, showreel và sự kiện đã dẫn — để khách hàng tin chọn bạn ngay từ lần đầu xem hồ sơ.
          </p>
          <HeroSearch />
          <div className="hero-proof">
            <span className="proof-avatars" aria-hidden="true">
              <i>M</i>
              <i>A</i>
              <i>V</i>
            </span>
            <span>
              Không cần biết code.
              <br />
              <strong>Có portfolio sau khóa học.</strong>
            </span>
            <span className="proof-divider" />
            <span className="proof-rating">
              <b>★ 4.9</b>
              <small>ĐIỂM ĐÁNH GIÁ MẪU</small>
            </span>
          </div>
          </div>

          <div className="store-hero-visual reveal">
            <HeroCarousel />
          </div>
        </div>
      </section>

      <section className="category-band" aria-labelledby="category-title">
        <div className="shell category-band-inner">
          <div>
            <h2 id="category-title">Bạn muốn bắt đầu từ đâu?</h2>
          </div>
          <CategoryChips categories={categories} />
        </div>
      </section>

      <section className="bento-section shell" aria-label="Lợi ích khóa học">
        <article className="bento-feature reveal">
          <div className="bento-feature-copy">
            <span className="section-kicker section-kicker-light">
              DÀNH CHO NGƯỜI DẪN CHƯƠNG TRÌNH
            </span>
            <h2>
              Bạn dẫn hay trên sân khấu,
              <br />
              hãy để <em>hồ sơ nói thay bạn.</em>
            </h2>
            <p>
              Thay vì gửi file PDF hay link Facebook rời rạc, hãy có một trang portfolio gọn gàng để khách hàng xem giọng dẫn, phong cách và kinh nghiệm của bạn chỉ trong một phút.
            </p>
            <MagneticLink
              href="#featured-courses"
              className="button button-light"
            >
              Khám phá khóa học <span>→</span>
            </MagneticLink>
          </div>
          <div className="bento-feature-art" aria-hidden="true">
            <div className="bento-art-circle" />
            <div className="bento-art-arc" />
            <div className="bento-art-card">
              <span>MC PORTFOLIO</span>
              <b>01</b>
              <i>showreel → booking</i>
            </div>
            <div className="bento-art-spark">✳</div>
          </div>
        </article>

        <article className="bento-stat reveal">
          <span className="bento-stat-icon">↗</span>
          <span className="section-kicker">TEMPLATE</span>
          <strong>
            <span data-count="10">10</span>
            <sup>+</sup>
          </strong>
          <p>
            mẫu landing page cho MC
            <br />
            cưới, sự kiện, livestream
          </p>
        </article>

        <article className="bento-path reveal">
          <span className="section-kicker">4 BƯỚC HOÀN THIỆN</span>
          <h3>
            Từ con số 0
            <br />
            <em>đến trang portfolio nhận show.</em>
          </h3>
          <div className="mini-path">
            <i>01</i>
            <span />
            <i>02</i>
            <span />
            <i>03</i>
            <span />
            <i>04</i>
          </div>
          <a href="#learning-path">
            Xem lộ trình <span>→</span>
          </a>
        </article>
      </section>

      <section className="trust-band">
        <div className="shell trust-band-inner">
          <div className="trust-intro">
            <span className="section-kicker">VÌ SAO MC CẦN PORTFOLIO?</span>
            <h2>
              Hồ sơ chuyên nghiệp,
              <br />
              <em>cát-xê xứng đáng.</em>
            </h2>
          </div>
          <div className="trust-metric">
            <strong>
              <span data-count="1">1</span>
            </strong>
            <span>đường link duy nhất</span>
            <small>GỬI KHÁCH TRONG MỌI TIN NHẮN</small>
          </div>
          <div className="trust-metric">
            <strong>
              <span data-count="24">24</span>
              <sup>/7</sup>
            </strong>
            <span>giới thiệu bạn thay bạn</span>
            <small>CẢ KHI BẠN ĐANG CẦM MIC</small>
          </div>
          <div className="trust-metric">
            <strong>
              0<span className="metric-star">₫</span>
            </strong>
            <span>chi phí code website</span>
            <small>TỰ LÀM BẰNG CÔNG CỤ KÉO THẢ</small>
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
              <h2>Từ sân khấu đến trang portfolio.</h2>
              <p>Phản hồi dưới đây là nội dung mẫu cho bản xem trước.</p>
            </div>
            <TestimonialControls />
          </div>
          <div className="testimonial-list" id="review-list">
            {testimonials.length ? (
              testimonials.map((review, index) => (
                <article className="testimonial-card" key={review.id}>
                  <div
                    className={`testimonial-avatar avatar-${index % 3}`}
                    aria-label={`Ảnh học viên ${review.name} đang giữ chỗ`}
                    role="img"
                  >
                    <span>{review.name.slice(0, 1)}</span>
                    <small>ẢNH GIỮ CHỖ</small>
                  </div>
                  <div
                    className="testimonial-stars"
                    aria-label={`Đánh giá ${review.rating} trên 5`}
                  >
                    {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <div className="testimonial-name">{review.name}</div>
                  <div className="testimonial-role">{review.role} · TÊN MẪU</div>
                </article>
              ))
            ) : (
              <article className="testimonial-card testimonial-empty">
                <span className="section-kicker">LỜI CHỨNG THỰC</span>
                <p>
                  Lời chia sẻ của học viên sẽ xuất hiện ở đây sau khi được cung cấp.
                </p>
                <span>CHƯA CÓ DỮ LIỆU THẬT</span>
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
