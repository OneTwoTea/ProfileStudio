"use client";

import { useEffect } from "react";

const THEME_KEY = "portfolio-studio-theme";

export function ThemePreference() {
  useEffect(() => {
    function applySavedTheme() {
      try {
        const isDark = window.localStorage.getItem(THEME_KEY) === "dark";
        if (isDark) {
          document.documentElement.dataset.theme = "dark";
        } else {
          delete document.documentElement.dataset.theme;
        }
      } catch {
        delete document.documentElement.dataset.theme;
      }
    }

    applySavedTheme();
    window.addEventListener("storage", applySavedTheme);
    return () => window.removeEventListener("storage", applySavedTheme);
  }, []);

  return null;
}
