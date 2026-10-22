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
    document.querySelectorAll<HTMLElement>(".testimonial-card, .faq-item, .category-chip, .trust-band li, .portfolio-card, .service-step").forEach((node) => {
      const index = node.parentElement ? Array.prototype.indexOf.call(node.parentElement.children, node) : 0;
      node.classList.add("reveal-item");
      node.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 80}ms`);
    });
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-item, [data-count]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => { node.classList.add("is-visible"); if (node.dataset.count) node.textContent = Number(node.dataset.count).toLocaleString("vi-VN"); });
      return;
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
    return () => observer.disconnect();
  }, []);

  return null;
}

const steps = [
  { number: "01", title: "Định vị bản thân", detail: "Xác định phong cách dẫn, tệp khách và thông điệp riêng.", tone: "path-blue" },
  { number: "02", title: "Chuẩn bị tư liệu", detail: "Chọn ảnh sân khấu, dựng showreel, liệt kê sự kiện tiêu biểu.", tone: "path-gold" },
  { number: "03", title: "Dựng landing page", detail: "Dựng trang portfolio từ template, thay đổi nội dung, thêm hình ảnh và văn bản theo ý muốn.", tone: "path-lilac" },
  { number: "04", title: "Xuất bản & nhận show", detail: "Gắn tên miền, form đặt lịch và gửi link cho khách hàng.", tone: "path-green" },
];

export function PinnedLearningPath() {
  return <section className="pinned-path" id="learning-path">
    <div className="pinned-layout shell">
      <div className="pinned-heading">
        <span className="section-kicker">LỘ TRÌNH 4 BƯỚC</span>
        <h2>Từ ý tưởng đến lịch show đầu tiên</h2>
      </div>
      <figure className="pinned-image">
        <Image
          src="/images/effect/lotrinh.png"
          alt="Portfolio MC hiển thị trên laptop"
          fill
          sizes="(max-width: 760px) 100vw, 42vw"
          priority
        />
      </figure>
      <div className="pinned-content">
        <div className="pinned-track">
          {steps.map((step) => <article className="path-card" key={step.number}>
            <span className="path-card-number">{step.number}</span>
            <div className="path-card-copy">
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          </article>)}
        </div>
      </div>
    </div>
  </section>;
}
