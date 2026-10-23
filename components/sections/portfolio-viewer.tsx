"use client";

import { useLayoutEffect, useRef, useState } from "react";

const devices = [
  { id: "desktop", label: "Desktop", width: 1280 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "mobile", label: "Mobile", width: 390 },
] as const;

type DeviceId = (typeof devices)[number]["id"];

export type PortfolioSample = {
  number: string;
  name: string;
  description: string;
  href: string;
  sections: string[];
};

// Renders the chosen sample at the real device width, then scales it down to fit the stage.
export function PortfolioViewer({ samples }: { samples: PortfolioSample[] }) {
  const [current, setCurrent] = useState(0);
  const [pickedDevice, setDevice] = useState<DeviceId | null>(null);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const sample = samples[current];
  // Until the visitor picks a size, narrow screens start on the mobile preview.
  const device = pickedDevice ?? (stage.width && stage.width < 520 ? "mobile" : "desktop");
  const active = devices.find((item) => item.id === device) ?? devices[0];

  useLayoutEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () => setStage({ width: node.clientWidth, height: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scale = stage.width ? Math.min(1, stage.width / active.width) : 1;

  return (
    <div className="portfolio-showcase">
      <div className="portfolio-sample-tabs" role="tablist" aria-label="Chọn mẫu portfolio">
        {samples.map((item, index) => (
          <button
            key={item.href}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-controls="portfolio-viewer-panel"
            onClick={() => setCurrent(index)}
          >
            <span>{item.number}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="portfolio-live-layout">
        <div className="portfolio-viewer" id="portfolio-viewer-panel" role="tabpanel">
          <div className="portfolio-viewer-bar">
            <span className="portfolio-viewer-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="portfolio-viewer-url">{sample.href}</span>
            <div className="portfolio-viewer-devices" role="group" aria-label="Chọn kích thước xem trước">
              {devices.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={device === item.id}
                  onClick={() => setDevice(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="portfolio-viewer-stage" ref={stageRef}>
            <iframe
              key={sample.href}
              src={sample.href}
              title={`Xem trước mẫu portfolio ${sample.name}`}
              style={{
                width: active.width,
                height: stage.height ? stage.height / scale : "100%",
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </div>

        <aside className="portfolio-live-info" aria-live="polite">
          <span className="portfolio-card-num">{sample.number}</span>
          <h3>{sample.name}</h3>
          <p className="portfolio-live-desc">{sample.description}</p>
          <span className="section-kicker">TRANG MẪU GỒM</span>
          <ul>
            {sample.sections.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      </div>
    </div>
  );
}
