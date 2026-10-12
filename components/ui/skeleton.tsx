import type { CSSProperties } from "react";

interface SkeletonProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
}

export function Skeleton({ width, height = 10, className = "" }: SkeletonProps) {
  return <span aria-hidden="true" className={`skeleton ${className}`.trim()} style={{ display: "block", width, height }} />;
}
