"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { title: "Landing page quảng bá", image: "", alt: "Ảnh landing page quảng bá sẽ được thêm vào đây", tone: "blue" },
  { title: "Chiến dịch nổi bật", image: "", alt: "Ảnh chiến dịch nổi bật sẽ được thêm vào đây", tone: "gold" },
  { title: "Sản phẩm mới", image: "", alt: "Ảnh landing page sản phẩm mới sẽ được thêm vào đây", tone: "sage" },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  function showSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  return (
    <div
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Landing page quảng bá"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
      data-paused={isPaused}
    >
      <div className="hero-carousel-frame" aria-live="polite">
        {activeSlide.image ? (
          <Image
            className="hero-carousel-image"
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 760px) 90vw, 45vw"
          />
        ) : (
          <div className={`hero-carousel-placeholder hero-carousel-placeholder-${activeSlide.tone}`}>
            <span>ẢNH LANDING PAGE</span>
            <small>THAY BẰNG HÌNH ẢNH CỦA BẠN</small>
          </div>
        )}
        <span className="hero-carousel-count">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>

      <div className="hero-carousel-footer">
        <p className="hero-carousel-caption">{activeSlide.title}</p>
        <div className="hero-carousel-controls" aria-label="Điều khiển carousel">
          <button type="button" onClick={() => showSlide(activeIndex - 1)} aria-label="Ảnh trước">←</button>
          <div className="hero-carousel-dots" aria-label="Chọn ảnh">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => showSlide(index)}
                aria-label={`Ảnh ${index + 1}: ${slide.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={() => showSlide(activeIndex + 1)} aria-label="Ảnh tiếp theo">→</button>
        </div>
      </div>
    </div>
  );
}
