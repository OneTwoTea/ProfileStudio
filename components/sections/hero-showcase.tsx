"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const showcaseImages = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/ads/${i + 1}.png`,
  width: 1920,
  height: 1080,
}));

const COLUMN_COUNT = 5;
const IMAGES_PER_COLUMN = 5;

// Each column starts at a different image so neighbouring columns never line up.
const columns = Array.from({ length: COLUMN_COUNT }, (_, column) =>
  Array.from({ length: IMAGES_PER_COLUMN }, (_, row) => showcaseImages[(column * 3 + row) % showcaseImages.length]),
);

export function HeroShowcase() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => grid.current?.style.setProperty("--ps-scroll", String(window.scrollY)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);

  return (
    <section className="ps-showcase" aria-hidden="true">
      <div className="ps-showcase-grid" ref={grid}>
        {columns.map((images, column) => (
          <div className="ps-showcase-column" key={column}>
            {/* The list is rendered twice so translating the track by -50% loops seamlessly. */}
            <div className="ps-showcase-track">
              {[...images, ...images].map((image, index) => (
                <div className="ps-showcase-card" key={index}>
                  <Image src={image.src} alt="" width={image.width} height={image.height} sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 360px" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
