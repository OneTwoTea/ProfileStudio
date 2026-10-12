"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  function chooseCategory(slug: string) {
    window.dispatchEvent(new CustomEvent("course-category", { detail: slug }));
    document.getElementById("featured-courses")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
  }

  return <>
    <div className="market-banner"><span className="market-banner-dot" /> LỚP HỌC, KỸ NĂNG VÀ NHỮNG GỢI Ý HỌC TẬP · NỘI DUNG PREVIEW</div>
    <header className="market-header">
      <div className="market-header-inner">
        <Link className="market-logo" href="/" aria-label="Trang chủ — tên thương hiệu đang chờ xác nhận"><span className="market-logo-mark">S</span><span>STUDY<span className="market-logo-sub">STUDIO · HONG THAI</span></span></Link>
        <nav className="market-nav" aria-label="Điều hướng chính"><a href="#featured-courses">Khóa học</a><a href="#learning-path">Lộ trình</a><a href="#testimonials">Học viên</a></nav>
        <div className="header-tools"><button className="utility-button theme-control" type="button" aria-pressed={dark} onClick={toggleTheme} title="Đổi giao diện sáng/tối">{dark ? "☾" : "☼"}</button><a className="header-join" href="#featured-courses">Khám phá lớp học <span>→</span></a></div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
      </div>
      <div id="mobile-menu" className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Điều hướng trên thiết bị di động"><a href="#featured-courses" onClick={() => setMenuOpen(false)}>Khóa học <span>→</span></a><a href="#learning-path" onClick={() => setMenuOpen(false)}>Lộ trình <span>→</span></a><a href="#testimonials" onClick={() => setMenuOpen(false)}>Học viên <span>→</span></a><button type="button" onClick={() => chooseCategory("tu-duy-sang-tao")}>Tư duy sáng tạo <span>→</span></button></nav>
        <div className="mobile-utilities"><button className="utility-button" type="button" aria-pressed={dark} onClick={toggleTheme}>{dark ? "☾" : "☼"} Giao diện sáng/tối</button></div>
        <p className="mobile-menu-note">Nội dung hiện tại là bản xem trước với dữ liệu minh họa.</p>
      </div>
    </header>
  </>;
}

export function MagneticLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`magnetic-link ${className}`} href={href} onPointerMove={(event) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .035}px, ${(event.clientY - rect.top - rect.height / 2) * .08}px)`;
  }} onPointerLeave={(event) => { event.currentTarget.style.transform = ""; }}>{children}</a>;
}
