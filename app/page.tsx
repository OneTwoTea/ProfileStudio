import Link from "next/link";
import { CourseExplorer } from "@/components/sections/course-explorer";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { SiteFooter } from "@/components/sections/site-footer";
import { MagneticLink, StoreHeader } from "@/components/sections/store-header";
import { MotionEnhancements, PinnedLearningPath, ScrollProgress } from "@/components/motion/page-effects";
import { apiClient } from "@/lib/api";
import { CategoryChips, HeroSearch, TestimonialControls } from "@/components/sections/storefront-actions";

const categories = [
  { slug: "tu-duy-sang-tao", name: "Tư duy sáng tạo", icon: "✳" },
  { slug: "nhiep-anh-hinh-anh", name: "Nhiếp ảnh", icon: "◉" },
  { slug: "thuong-hieu-ca-nhan", name: "Thương hiệu cá nhân", icon: "◇" },
  { slug: "ke-chuyen-noi-dung", name: "Kể chuyện & nội dung", icon: "⌁" },
  { slug: "kinh-doanh", name: "Kinh doanh", icon: "↗" },
];

const faqItems = [
  {
    question: "Tôi có thể xem nội dung khóa học trước khi đăng ký không?",
    answer:
      "Trang chi tiết khóa học sẽ trình bày mục tiêu, đề cương, thời lượng và bài học xem trước (nếu khóa học hỗ trợ). Nội dung cụ thể hiện là mẫu preview.",
  },
  {
    question: "Tôi đăng ký và nhận hướng dẫn chuyển khoản như thế nào?",
    answer:
      "Khi backend được kết nối, bạn gửi yêu cầu đăng ký và nhận mã tham chiếu cùng hướng dẫn chuyển khoản do hệ thống trả về. Website không thu tiền trực tuyến.",
  },
  {
    question: "Sau khi gửi yêu cầu, khi nào tôi có thể học?",
    answer:
      "Chủ khóa học sẽ xác nhận yêu cầu và cấp quyền học sau khi đối soát. Thời gian xử lý thực tế sẽ được công bố trong hướng dẫn chính thức.",
  },
  {
    question: "Tôi có thể học trên điện thoại không?",
    answer:
      "Giao diện được thiết kế thích ứng với điện thoại, máy tính bảng và máy tính. Khả năng phát video và tải tài liệu sẽ phụ thuộc cấu hình backend.",
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

      <section className="store-hero shell" aria-labelledby="hero-title">
        <div className="store-hero-copy reveal">
          <span className="hero-eyebrow">
            <i /> HỌC THIẾT KẾ · XÂY DỰNG PORTFOLIO
          </span>
          <h1
            id="hero-title"
            aria-label="Học thiết kế từ người làm nghề, tạo portfolio của riêng bạn."
          >
            <span aria-hidden="true">Học thiết kế</span>
            <br />
            <span aria-hidden="true">tạo portfolio</span>
            <br />
            <span aria-hidden="true"> của riêng bạn.</span>
          </h1>
          <p className="store-hero-description">
            Khám phá lớp học thực tiễn, học từ người làm nghề và biến ý tưởng thành điều bạn có thể làm được.
          </p>
          <HeroSearch />
          <div className="hero-proof">
            <span className="proof-avatars" aria-hidden="true">
              <i>M</i>
              <i>A</i>
              <i>V</i>
            </span>
            <span>
              Kiến thức dễ áp dụng.
              <br />
              <strong>Tiến bộ theo nhịp riêng.</strong>
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
      </section>

      <section className="category-band" aria-labelledby="category-title">
        <div className="shell category-band-inner">
          <div>
            <h2 id="category-title">Tìm lĩnh vực của bạn</h2>
          </div>
          <CategoryChips categories={categories} />
        </div>
      </section>

      <section className="bento-section shell" aria-label="Gợi ý học tập">
        <article className="bento-feature reveal">
          <div className="bento-feature-copy">
            <span className="section-kicker section-kicker-light">
              BỘ SƯU TẬP HỌC TẬP · MẪU
            </span>
            <h2>
              Một kỹ năng mới
              <br />
              mở ra <em>góc nhìn mới.</em>
            </h2>
            <p>
              Chọn một chủ đề, bắt đầu bằng bài học đầu tiên và xây tiếp từ điều bạn đã biết.
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
              <span>STUDY NOTE</span>
              <b>01</b>
              <i>curiosity → practice</i>
            </div>
            <div className="bento-art-spark">✳</div>
          </div>
        </article>

        <article className="bento-stat reveal">
          <span className="bento-stat-icon">↗</span>
          <span className="section-kicker">TÀI LIỆU</span>
          <strong>
            <span data-count="20">20</span>
            <sup>+</sup>
          </strong>
          <p>
            chủ đề và bài học mẫu
            <br />
            đang được biên soạn
          </p>
        </article>

        <article className="bento-path reveal">
          <span className="section-kicker">LỘ TRÌNH LINH HOẠT</span>
          <h3>
           Tiết kiệm thời gian.
            <br />
            <em>Tăng năng suất, hiệu quả làm việc.</em>
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
            Xem cách học <span>→</span>
          </a>
        </article>
      </section>

      <section className="trust-band">
        <div className="shell trust-band-inner">
          <div className="trust-intro">
            <span className="section-kicker">VÌ SAO HỌC Ở ĐÂY?</span>
            <h2>
              Học để làm
              <br />
              <em>được nhiều hơn.</em>
            </h2>
          </div>
          <div className="trust-metric">
            <strong>
              <span data-count="18">18</span>
              <sup>+</sup>
            </strong>
            <span>chương trình mẫu</span>
            <small>ĐANG ĐƯỢC BIÊN SOẠN</small>
          </div>
          <div className="trust-metric">
            <strong>
              <span data-count="2400">2.400</span>
              <sup>+</sup>
            </strong>
            <span>lượt học minh họa</span>
            <small>DỮ LIỆU PREVIEW</small>
          </div>
          <div className="trust-metric">
            <strong>
              4.9<span className="metric-star">★</span>
            </strong>
            <span>điểm đánh giá mẫu</span>
            <small>CHƯA PHẢI ĐÁNH GIÁ THẬT</small>
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
            <span className="section-kicker">CHỌN ĐIỀU BẠN MUỐN HỌC</span>
            <h2 id="featured-title">Lớp học nổi bật</h2>
            <p>Những chương trình được tuyển chọn để bạn bắt đầu.</p>
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
              <span className="section-kicker">GÓC NHÌN HỌC VIÊN</span>
              <h2>Điều họ mang theo.</h2>
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
            Điều bạn muốn
            <br />
            <em>biết trước khi bắt đầu.</em>
          </h2>
          <p>Thông tin cụ thể sẽ được hoàn thiện theo từng chương trình.</p>
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

      <section className="closing-banner">
        <div className="shell closing-banner-inner">
          <div>
            <span className="section-kicker section-kicker-light">
              BẮT ĐẦU TỪ MỘT ĐIỀU BẠN TÒ MÒ
            </span>
            <h2>
              Điều gì bạn muốn
              <br />
              <em>học tiếp hôm nay?</em>
            </h2>
          </div>
          <MagneticLink
            href="#featured-courses"
            className="button button-light"
          >
            Tìm lớp học phù hợp <span>→</span>
          </MagneticLink>
          <span className="closing-spark" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
