"use client";

import { useState, type FormEvent } from "react";

function goToCourses() {
  document.getElementById("featured-courses")?.scrollIntoView({
    behavior: "smooth",
  });
}

export function HeroSearch() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.dispatchEvent(new CustomEvent("course-search", { detail: data.get("q") ?? "" }));
    goToCourses();
  }

  function popularSearch(query: string) {
    const input = document.getElementById("hero-course-search") as HTMLInputElement | null;
    if (input) input.value = query;
    window.dispatchEvent(new CustomEvent("course-search", { detail: query }));
    goToCourses();
  }

  return <>
    <form className="ps-search" role="search" onSubmit={submit}>
      <label className="visually-hidden" htmlFor="hero-course-search">Tìm khóa học cho MC</label>
      <svg className="ps-search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      <input id="hero-course-search" name="q" placeholder="VD: landing page, showreel, thương hiệu..." />
      <button type="submit">Tìm khóa học</button>
    </form>
    <div className="ps-popular">
      <span>ĐƯỢC QUAN TÂM</span>
      {["Landing page", "Showreel", "Thương hiệu"].map((label) => <button key={label} type="button" onClick={() => popularSearch(label)}>{label}</button>)}
    </div>
  </>;
}

export function CategoryChips({ categories }: { categories: { slug: string; name: string; icon: string }[] }) {
  function choose(slug: string) {
    window.dispatchEvent(new CustomEvent("course-category", { detail: slug }));
    goToCourses();
  }

  return <div className="category-chips">{categories.map((category) => <button className="category-chip" type="button" key={category.slug} onClick={() => choose(category.slug)}><span>{category.icon}</span>{category.name}<i>↗</i></button>)}</div>;
}

export function MockNewsletter() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return <><form onSubmit={submit}><label className="visually-hidden" htmlFor="newsletter-email">Email nhận tin</label><input id="newsletter-email" type="email" placeholder="Địa chỉ email" required /><button type="submit" aria-label="Đăng ký nhận tin"></button></form></>;
}

export function TestimonialControls() {
  function scrollBy(amount: number) {
    document.getElementById("review-list")?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }
  return <div className="testimonial-controls"><button aria-label="Lời chứng thực trước" type="button" onClick={() => scrollBy(-340)}>←</button><button aria-label="Lời chứng thực tiếp" type="button" onClick={() => scrollBy(340)}>→</button></div>;
}
