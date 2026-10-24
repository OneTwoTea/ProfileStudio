import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";

const ZALO_PHONE = "0397.898.042";
const zaloHref = `https://zalo.me/${ZALO_PHONE.replace(/\D/g, "")}`;

const plans = [
  {
    name: "Gói Basic",
    price: "299.000",
    tagline: "Khởi đầu hoàn hảo cho MC mới",
    features: [
      "Landing page theo mẫu có sẵn",
      "Chỉnh sửa nội dung theo thông tin của bạn",
      "Deploy lên Vercel (đưa website lên mạng)",
      "Cập nhật trang 1 lần mỗi tuần",
    ],
    cta: "Đăng ký ngay",
  },
  {
    name: "Gói Plus",
    price: "799.000",
    tagline: "Lựa chọn tối ưu để quảng bá bản thân",
    features: [
      "Landing page theo mẫu có sẵn",
      "Chỉnh giao diện trực tiếp: màu sắc, bố cục, phong cách",
      "Deploy lên Vercel (đưa website lên mạng)",
      { text: "Cập nhật nội dung, hình ảnh, video liên tục", strong: true },
    ],
    cta: "Chọn Gói Plus",
    featured: true,
  },
  {
    name: "Gói Pro",
    price: "2.599.000",
    tagline: "Đẳng cấp khác biệt, nâng tầm thương hiệu",
    features: [
      "Thiết kế landing page theo yêu cầu riêng",
      "Hỗ trợ 1:1, cập nhật nội dung liên tục",
      "Deploy gắn tên miền bạn chọn",
      { text: "Hỗ trợ đăng ký tên miền theo mong muốn", strong: true },
      "Hỗ trợ quảng cáo và tối ưu SEO chuẩn Google",
    ],
    cta: "Đăng ký ngay",
  },
];

function CheckIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function DesignServicePage() {
  return <main className="market-home pricing-page">
    <StoreHeader />
    <section className="pricing-hero shell" aria-labelledby="pricing-title">
      <h1 id="pricing-title">Thiết Kế Landing Page Portfolio<br /><span>Chuyên Nghiệp Cho MC</span></h1>
      <p>Xây dựng thương hiệu cá nhân ấn tượng, thu hút sự kiện và show diễn với website dành riêng cho người dẫn chương trình.</p>
    </section>

    <section className="pricing-plans shell" aria-label="Bảng giá dịch vụ">
      {plans.map((plan) => <article className={plan.featured ? "pricing-card is-featured" : "pricing-card"} key={plan.name}>
        {plan.featured && <span className="pricing-badge">PHỔ BIẾN NHẤT</span>}
        <h2>{plan.name}</h2>
        <p className="pricing-price">{plan.price}<small>đ</small></p>
        <p className="pricing-tagline">{plan.tagline}</p>
        <ul>{plan.features.map((feature) => {
          const item = typeof feature === "string" ? { text: feature, strong: false } : feature;
          return <li key={item.text} className={item.strong ? "is-strong" : undefined}><CheckIcon />{item.text}</li>;
        })}</ul>
        <a className="pricing-cta" href={zaloHref} target="_blank" rel="noopener noreferrer">{plan.cta}</a>
      </article>)}
    </section>

    <section className="pricing-contact shell" aria-labelledby="pricing-contact-title">
      <h2 id="pricing-contact-title">Cần tư vấn thêm để chọn gói phù hợp?</h2>
      <p>Đừng ngần ngại liên hệ trực tiếp với chúng tôi để được giải đáp mọi thắc mắc và bắt đầu xây dựng Portfolio của bạn ngay hôm nay.</p>
      <a className="pricing-zalo" href={zaloHref} target="_blank" rel="noopener noreferrer">
        <span className="pricing-zalo-icon"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor" /></svg></span>
        <span><small>Liên hệ tư vấn chi tiết qua ZALO</small><strong>{ZALO_PHONE}</strong></span>
      </a>
    </section>
    <SiteFooter />
  </main>;
}
