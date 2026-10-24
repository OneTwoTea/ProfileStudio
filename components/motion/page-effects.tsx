"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const range = root.scrollHeight - window.innerHeight;
        const progress = range > 0 ? window.scrollY / range : 0;
        bar.current?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, progress))})`);
        root.toggleAttribute("data-scrolled", window.scrollY > 12);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span ref={bar} /></div>;
}

export function MotionEnhancements() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".testimonial-card, .faq-item, .category-chip, .trust-band li, .portfolio-card, .service-step, .pinned-path .path-card").forEach((node) => {
      const index = node.parentElement ? Array.prototype.indexOf.call(node.parentElement.children, node) : 0;
      node.classList.add("reveal-item");
      node.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 80}ms`);
    });
    // iOS Safari only applies :active (used for the touch zoom on cards) when a touch listener exists.
    const noopTouch = () => {};
    document.addEventListener("touchstart", noopTouch, { passive: true });
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-item, [data-count]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => { node.classList.add("is-visible"); if (node.dataset.count) node.textContent = Number(node.dataset.count).toLocaleString("vi-VN"); });
      return () => document.removeEventListener("touchstart", noopTouch);
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        node.classList.add("is-visible");
        observer.unobserve(node);
        if (node.dataset.count) {
          const end = Number(node.dataset.count);
          const start = performance.now();
          const duration = 900;
          const tick = (now: number) => {
            if (document.hidden) { node.textContent = end.toLocaleString("vi-VN"); return; }
            const fraction = Math.min(1, (now - start) / duration);
            node.textContent = Math.round(end * (1 - Math.pow(1 - fraction, 3))).toLocaleString("vi-VN");
            if (fraction < 1) requestAnimationFrame(tick);
            else node.textContent = end.toLocaleString("vi-VN");
          };
          requestAnimationFrame(tick);
        }
      }
    }, { threshold: .16, rootMargin: "0px 0px -6% 0px" });

    nodes.forEach((node) => observer.observe(node));
    return () => { observer.disconnect(); document.removeEventListener("touchstart", noopTouch); };
  }, []);

  return null;
}

const stepIcons = {
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r=".6" fill="currentColor" /></>,
  media: <><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" /></>,
  layout: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M3.5 9h17M9.5 9v10.5" /></>,
  launch: <><path d="M5 19c1-3 2.5-4.5 4-5" /><path d="M14.5 4.5c3 0 5 2 5 5-1.5 3.5-5 6.5-8 7.5L7 12.5c1-3 4-6.5 7.5-8Z" /><circle cx="14.5" cy="9.5" r="1.4" /></>,
};

const steps = [
  { number: "01", title: "Định vị bản thân", detail: "Xác định phong cách dẫn, tệp khách và thông điệp riêng.", tag: "Chiến lược", tone: "path-blue", icon: stepIcons.target },
  { number: "02", title: "Chuẩn bị tư liệu", detail: "Chọn ảnh sân khấu, dựng showreel, liệt kê sự kiện tiêu biểu.", tag: "Nội dung", tone: "path-gold", icon: stepIcons.media },
  { number: "03", title: "Dựng landing page", detail: "Dựng trang portfolio từ template, thay đổi nội dung, thêm hình ảnh và văn bản theo ý muốn.", tag: "Thiết kế", tone: "path-lilac", icon: stepIcons.layout },
  { number: "04", title: "Xuất bản & nhận show", detail: "Gắn tên miền, form đặt lịch và gửi link cho khách hàng.", tag: "Ra mắt", tone: "path-green", icon: stepIcons.launch },
];

export function PinnedLearningPath() {
  return <section className="pinned-path" id="learning-path">
    <div className="pinned-layout shell">
      <div className="pinned-heading">
        <span className="section-kicker">LỘ TRÌNH 4 BƯỚC</span>
        <h2>Từ ý tưởng đến <em>lịch show đầu tiên</em></h2>
      </div>
      <figure className="pinned-image">
        <div className="pinned-image-frame">
          <Image
            src="/images/effect/lotrinh1.png"
            alt="Portfolio MC hiển thị trên laptop"
            fill
            sizes="(max-width: 760px) 100vw, 42vw"
            priority
          />
        </div>
      </figure>
      <div className="pinned-content">
        <ol className="pinned-track">
          {steps.map((step) => <li className={`path-card ${step.tone}`} key={step.number}>
            <span className="path-card-node" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
            </span>
            <div className="path-card-copy">
              <div className="path-card-meta">
                <span className="path-card-number">Bước {step.number}</span>
                <span className="path-card-tag">{step.tag}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
