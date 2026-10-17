"use client";

import { useEffect, useState } from "react";

type RibbonLayer = {
  width: number;
  phase: number;
  twist: number;
  offset: number;
  opacity: number;
};

type Slice = {
  points: string;
  fill: string;
};

type LayerSlices = {
  opacity: number;
  slices: Slice[];
};

const layers: RibbonLayer[] = [
  { width: 90, phase: -0.4, twist: 3, offset: -22, opacity: 0.45 },
  { width: 120, phase: 0.45, twist: 1.5, offset: 26, opacity: 0.5 },
  { width: 170, phase: 0, twist: 0, offset: 0, opacity: 0.55 },
];

function centerY(x: number, layer: RibbonLayer) {
  return (
    470 +
    layer.offset +
    80 * Math.sin((x / 1200) * 7.54 + 0.93 + layer.phase) +
    18 * Math.sin((x / 1200) * 15.7 + 2 + layer.phase * 1.4)
  );
}

function halfWidth(x: number, width: number, twist: number) {
  return (
    (width / 2) * Math.cos(x * 0.0058 + 0.3 + twist)
  );
}

function colorForSlice(x: number, averageCosine: number) {
  const hue = 214 + (236 - 214) * (x / 1200);
  const fold = Math.abs(averageCosine) ** 0.9;
  const saturation = averageCosine > 0 ? 72 : 58;
  const lightness = averageCosine > 0 ? 16 + 62 * fold : 24 + 62 * fold;
  const faceHue = averageCosine > 0 ? hue : hue - 16;
  return `hsl(${faceHue} ${saturation}% ${lightness}%)`;
}

function createSlices(layer: RibbonLayer, sliceCount: number): Slice[] {
  const slices: Slice[] = [];
  const start = -30;
  const end = 1230;
  const step = (end - start) / sliceCount;

  for (let index = 0; index < sliceCount; index += 1) {
    const x = start + index * step;
    const nextX = x + step;
    const cosine =
      (Math.cos(x * 0.0058 + 0.3 + layer.twist) +
        Math.cos(nextX * 0.0058 + 0.3 + layer.twist)) /
      2;
    const y = centerY(x, layer);
    const nextY = centerY(nextX, layer);
    const h = halfWidth(x, layer.width, layer.twist);
    const nextH = halfWidth(nextX, layer.width, layer.twist);

    slices.push({
      points: `${x},${y - h} ${nextX},${nextY - nextH} ${nextX},${nextY + nextH} ${x},${y + h}`,
      fill: colorForSlice(x, cosine),
    });
  }

  return slices;
}

function generateRibbon(sliceCount: number): LayerSlices[] {
  return layers.map((layer) => ({
    opacity: layer.opacity,
    slices: createSlices(layer, sliceCount),
  }));
}

export function HeroRibbonBackground() {
  const [ribbonLayers, setRibbonLayers] = useState<LayerSlices[] | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const updateRibbon = () => setRibbonLayers(generateRibbon(mobile.matches ? 160 : 300));
    updateRibbon();
    mobile.addEventListener("change", updateRibbon);
    return () => mobile.removeEventListener("change", updateRibbon);
  }, []);

  return (
    <svg
      className="hero-ribbon-background"
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="hero-wash-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id="hero-wash-blur-mobile" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>
      <g className="hero-wash" filter="url(#hero-wash-blur)">
        <ellipse className="hero-wash-blue" cx="105" cy="55" rx="300" ry="205" />
        <ellipse className="hero-wash-white-top" cx="895" cy="100" rx="390" ry="175" />
        <ellipse className="hero-wash-white-bottom" cx="600" cy="705" rx="440" ry="185" />
      </g>
      <g className="hero-ribbon-motion">
        {ribbonLayers?.map((layer, layerIndex) => (
          <g
            key={layerIndex}
            opacity={layer.opacity}
            className="hero-ribbon-layer"
          >
            {layer.slices.map((slice, sliceIndex) => (
              <polygon
                key={sliceIndex}
                points={slice.points}
                fill={slice.fill}
                stroke={slice.fill}
                strokeWidth="0.8"
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
