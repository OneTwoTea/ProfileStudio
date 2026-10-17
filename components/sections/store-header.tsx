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
      <header className="market-header">
        <div className="market-header-inner">
          <Link
            className="market-logo"
            href="/"
            aria-label="PORTFOLIO STUDIO"
          >
            <span className="market-logo-mark">PS</span>
            <span>
              PROFILE STUDIO
              <span className="market-logo-sub">PORTFOLIO & LEARNING</span>
            </span>
          </Link>
          <nav className="market-nav" aria-label="Điều hướng chính">
            <div className="course-nav-group">
              <Link className="course-nav-trigger" href="/#featured-courses">
                Khóa học <span aria-hidden="true"></span>
              </Link>
              <div className="course-nav-dropdown">
                <Link href="/#featured-courses">Tất cả khóa học</Link>
                <Link href="/#learning-path">Lộ trình học</Link>
                <Link href="/#testimonials">Học viên nói gì</Link>
              </div>
            </div>
            <Link href="/mau-portfolio">Mẫu Portfolio</Link>
            <Link href="/ve-chung-toi">Về chúng tôi</Link>
          </nav>
          <div className="header-actions">
            <div className="header-tools">
              <button
                className="utility-button theme-control"
                type="button"
                aria-pressed={dark}
                onClick={toggleTheme}
                title="Đổi giao diện sáng/tối"
              >
                {dark ? "☾" : "☼"}
              </button>
            </div>
            <a className="header-join" href="/dich-vu-thiet-ke">
              Thuê thiết kế <span>→</span>
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
              Khóa học <span>→</span>
            </Link>
            <Link
              className="mobile-subnav"
              href="/#featured-courses"
              onClick={() => setMenuOpen(false)}
            >
              Tất cả khóa học <span>↗</span>
            </Link>
            <Link
              className="mobile-subnav"
              href="/#learning-path"
              onClick={() => setMenuOpen(false)}
            >
              Lộ trình học <span>↗</span>
            </Link>
            <Link
              className="mobile-subnav"
              href="/#testimonials"
              onClick={() => setMenuOpen(false)}
            >
              Học viên nói gì <span>↗</span>
            </Link>
            <Link href="/mau-portfolio" onClick={() => setMenuOpen(false)}>
              Mẫu Portfolio <span>→</span>
            </Link>
            <Link href="/ve-chung-toi" onClick={() => setMenuOpen(false)}>
              Về chúng tôi <span>→</span>
            </Link>
            <button
              type="button"
              onClick={() => chooseCategory("thiet-ke-landing-page")}
            >
              Thiết kế landing page <span>→</span>
            </button>
          </nav>
          <div className="mobile-utilities">
            <button
              className="utility-button"
              type="button"
              aria-pressed={dark}
              onClick={toggleTheme}
            >
              {dark ? "☾" : "☼"} Giao diện sáng/tối
            </button>
          </div>
          <p className="mobile-menu-note">
            Nội dung hiện tại là bản xem trước với dữ liệu minh họa.
          </p>
        </div>
      </header>
    </>
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
