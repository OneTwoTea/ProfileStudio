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
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal, [data-count]"));
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
  { number: "01", title: "Chọn hướng đi", detail: "Bắt đầu với chủ đề bạn muốn hiểu sâu hơn.", tone: "path-blue" },
  { number: "02", title: "Học qua thực hành", detail: "Bài học ngắn, ví dụ cụ thể, có thể quay lại.", tone: "path-gold" },
  { number: "03", title: "Tạo sản phẩm của bạn", detail: "Kết nối kiến thức vào một dự án thật.", tone: "path-lilac" },
  { number: "04", title: "Tiếp tục phát triển", detail: "Xây lộ trình tiếp theo theo mục tiêu riêng.", tone: "path-green" },
];

export function PinnedLearningPath() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = section.current;
    const rail = track.current;
    if (!target || !rail) return;
    const media = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (media.matches || document.hidden) {
          rail.style.transform = "";
          return;
        }
        const rect = target.getBoundingClientRect();
        const available = target.offsetHeight - window.innerHeight;
        const amount = Math.min(1, Math.max(0, -rect.top / Math.max(1, available)));
        const distance = Math.max(0, rail.scrollWidth - window.innerWidth + 80);
        rail.style.transform = `translate3d(${-distance * amount}px, 0, 0)`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("visibilitychange", update);
    media.addEventListener("change", update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); document.removeEventListener("visibilitychange", update); media.removeEventListener("change", update); };
  }, []);

  return <section ref={section} className="pinned-path" id="learning-path"><div className="pinned-stage"><div className="pinned-heading shell"><span className="section-kicker">LỘ TRÌNH HỌC · MẪU</span><h2>Một bước nhỏ.<br /><em>Một năng lực mới.</em></h2><p>Gợi ý trải nghiệm học tập theo từng chặng. Nội dung dưới đây là mẫu giao diện.</p></div><div className="pinned-viewport"><div className="pinned-track" ref={track}>{steps.map((step) => <article className={`path-card ${step.tone}`} key={step.number}><span className="path-card-number">{step.number}</span><div className="path-card-illustration"><span>{step.number}</span><i /></div><h3>{step.title}</h3><p>{step.detail}</p><span className="path-card-foot">LỘ TRÌNH HỌC TẬP</span></article>)}</div></div><div className="pinned-foot shell"><span>KÉO CUỘN ĐỂ KHÁM PHÁ</span><span aria-hidden="true">→</span></div></div></section>;
}
