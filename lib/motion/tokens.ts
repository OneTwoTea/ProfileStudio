export const motionTokens = {
  duration: { fast: 180, normal: 320, slow: 700 },
  easing: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    soft: "cubic-bezier(0.2, 0.7, 0.2, 1)",
  },
  stagger: 70,
  distance: { small: 6, medium: 14, large: 28 },
} as const;
