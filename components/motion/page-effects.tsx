"use client";

import { useEffect, useRef } from "react";

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
  { number: "03", title: "Dựng landing page", detail: "Lắp ráp trang portfolio từ template, không cần viết code.", tone: "path-lilac" },
  { number: "04", title: "Xuất bản & nhận show", detail: "Gắn tên miền, form đặt lịch và gửi link cho khách hàng.", tone: "path-green" },
];

export function PinnedLearningPath() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = section.current;
    const pinnedStage = stage.current;
    const rail = track.current;
    if (!target || !pinnedStage || !rail) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let resizeTimer = 0;
    let distance = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!target.classList.contains("is-pinned") || document.hidden) {
          rail.style.transform = "";
          return;
        }
        const rect = target.getBoundingClientRect();
        const available = target.offsetHeight - pinnedStage.offsetHeight - 78;
        const amount = Math.min(1, Math.max(0, (78 - rect.top) / Math.max(1, available)));
        rail.style.transform = `translate3d(${-distance * amount}px, 0, 0)`;
      });
    };

    const measure = () => {
      const canPin = window.innerWidth > 760 && !reducedMotion.matches;
      target.classList.toggle("is-pinned", canPin);
      distance = Math.max(0, rail.scrollWidth - target.clientWidth);
      // Keep the path in normal flow when the pinned stage cannot fit in the
      // viewport. Browser zoom changes the CSS viewport dimensions too.
      const stageFits = pinnedStage.scrollHeight <= window.innerHeight - 78;
      const viewportFits = pinnedStage.clientWidth >= rail.scrollWidth;
      const shouldPin = canPin && distance > 0 && stageFits && viewportFits;
      target.classList.toggle("is-pinned", shouldPin);
      if (!shouldPin) rail.style.transform = "";
      update();
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 140);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", measure);
      target.classList.remove("is-pinned");
    };
  }, []);

  return <section ref={section} className="pinned-path" id="learning-path"><div className="pinned-stage" ref={stage}><div className="pinned-heading shell"><span className="section-kicker">LỘ TRÌNH 4 BƯỚC</span><h2>Từ MC trên sân khấu<br /><em>đến portfolio trên mạng.</em></h2><p>Mỗi chặng đều có bài tập thực hành, kết thúc khóa học bạn có trang portfolio của riêng mình.</p></div><div className="pinned-viewport"><div className="pinned-track" ref={track}>{steps.map((step) => <article className={`path-card ${step.tone}`} key={step.number}><span className="path-card-number">{step.number}</span><div className="path-card-illustration"><span>{step.number}</span><i /></div><h3>{step.title}</h3><p>{step.detail}</p><span className="path-card-foot">LỘ TRÌNH HỌC TẬP</span></article>)}</div></div><div className="pinned-foot shell"><span>KÉO CUỘN ĐỂ KHÁM PHÁ</span><span aria-hidden="true">→</span></div></div></section>;
}
