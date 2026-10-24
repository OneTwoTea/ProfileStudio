"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    function syncTheme() {
      const isDark = window.localStorage.getItem("portfolio-studio-theme") === "dark";
      setDark(isDark);
      if (isDark) document.documentElement.dataset.theme = "dark";
      else delete document.documentElement.dataset.theme;
    }
    syncTheme();
    window.addEventListener("portfolio-studio-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener("portfolio-studio-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  function chooseCategory(slug: string) {
    window.dispatchEvent(new CustomEvent("course-category", { detail: slug }));
    document.getElementById("featured-courses")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.dataset.theme = "dark";
      window.localStorage.setItem("portfolio-studio-theme", "dark");
    } else {
      delete document.documentElement.dataset.theme;
      window.localStorage.setItem("portfolio-studio-theme", "light");
    }
    window.dispatchEvent(new Event("portfolio-studio-theme-change"));
  }

  return (
    <>
      <header className="market-header ps-header">
        <div className="ps-header-inner">
          <Link className="ps-logo" href="/" aria-label="PROFILE STUDIO - Trang chủ">
            <span className="ps-logo-mark" aria-hidden="true">PS</span>
            <span className="ps-logo-text">
              <span className="ps-logo-name">PROFILE STUDIO</span>
              <span className="ps-logo-sub">PORTFOLIO & LEARNING</span>
            </span>
          </Link>
          <nav className="ps-nav" aria-label="Điều hướng chính">
            <div className="course-nav-group">
              <Link className="course-nav-trigger" href="/#featured-courses">
                Khóa học
              </Link>
              <div className="course-nav-dropdown">
                <Link href="/#learning-path">Lộ trình học</Link>
                <Link href="/#testimonials">Học viên nói gì</Link>
              </div>
            </div>
            <Link href="/mau-portfolio">Mẫu Portfolio</Link>
            <Link href="/ve-chung-toi">Về chúng tôi</Link>
          </nav>
          <div className="ps-header-actions">
            <button
              className="ps-theme-button"
              type="button"
              aria-pressed={dark}
              aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
              onClick={toggleTheme}
            >
              <ThemeIcon dark={dark} />
            </button>
            <a className="ps-header-join" href="https://forms.gle/gd3vppCtePBSB2vh6">
              Đăng ký ngay
            </a>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        <div
          id="mobile-menu"
          className={menuOpen ? "mobile-menu is-open" : "mobile-menu"}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <nav aria-label="Điều hướng trên thiết bị di động">
            <Link href="/#featured-courses" onClick={() => setMenuOpen(false)}>
              Khóa học
            </Link>
            <Link
              className="mobile-subnav"
              href="/#featured-courses"
              onClick={() => setMenuOpen(false)}
            >
              Tất cả khóa học
            </Link>
            <Link
              className="mobile-subnav"
              href="/#learning-path"
              onClick={() => setMenuOpen(false)}
            >
              Lộ trình học
            </Link>
            <Link
              className="mobile-subnav"
              href="/#testimonials"
              onClick={() => setMenuOpen(false)}
            >
              Học viên nói gì
            </Link>
            <Link href="/mau-portfolio" onClick={() => setMenuOpen(false)}>
              Mẫu Portfolio
            </Link>
            <Link href="/ve-chung-toi" onClick={() => setMenuOpen(false)}>
              Về chúng tôi
            </Link>
          </nav>
          <div className="mobile-utilities">
            <button
              className="utility-button"
              type="button"
              aria-pressed={dark}
              onClick={toggleTheme}
            >
              <ThemeIcon dark={dark} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dark ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      ) : (
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      )}
    </svg>
  );
}

export function MagneticLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`magnetic-link ${className}`}
      href={href}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.transform = `translate(${
          (event.clientX - rect.left - rect.width / 2) * 0.035
        }px, ${(event.clientY - rect.top - rect.height / 2) * 0.08}px)`;
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "";
      }}
    >
      {children}
    </a>
  );
}
