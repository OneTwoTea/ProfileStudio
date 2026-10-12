import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "neutral" | "gold" | "green" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

/** Small status/category label. Unknown domain values should use neutral tone. */
export function Badge({ children, tone = "neutral", className = "", ...props }: BadgeProps) {
  const toneClass = tone === "neutral" ? "" : `tag-${tone}`;
  return <span {...props} className={`tag ${toneClass} ${className}`.trim()}>{children}</span>;
}
