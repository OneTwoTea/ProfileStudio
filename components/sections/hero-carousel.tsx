"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero/anh3.png",
    alt: "Landing page giới thiệu khóa học sáng tạo",
  },
  {
    image: "/images/hero/anh2.png",
    alt: "Trang chiến dịch giới thiệu chương trình mới",
  },
  {
    image: "/images/hero/anh1.png",
    alt: "Landing page giới thiệu sản phẩm mới",
  },
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
        <Image
          className="hero-carousel-image"
          src={activeSlide.image}
          alt={activeSlide.alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 760px) 90vw, 45vw"
        />
      </div>
      <div className="hero-carousel-footer">
        <div className="hero-carousel-controls" aria-label="Điều khiển carousel">
          <button type="button" onClick={() => showSlide(activeIndex - 1)} aria-label="Ảnh trước">←</button>
          <div className="hero-carousel-dots" aria-label="Chọn ảnh">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => showSlide(index)}
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
