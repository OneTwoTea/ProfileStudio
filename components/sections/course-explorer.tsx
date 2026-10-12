"use client";

import { useEffect, useMemo, useState, type PointerEvent } from "react";
import { apiClient } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category, Course } from "@/lib/types";

const money = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });
const tabLabels = ["Tất cả", "Mới bắt đầu", "Sáng tạo", "Kinh doanh"];

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 2.2}deg) rotateY(${x * 2.2}deg) translateY(-3px)`;
  }

  function resetPointer() {
    const element = document.getElementById(`course-${course.id}`);
    if (element) element.style.transform = "";
  }

  const name = course.instructor?.name || "Giảng viên đang cập nhật";
  const status = course.status === "published" ? "Đang mở" : course.status === "draft" ? "Sắp ra mắt" : "Khóa học";

  return (
    <article id={`course-${course.id}`} className={`store-course-card card-tone-${index % 3}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <a className="store-course-link" href="#faq" aria-label={`Xem thông tin khóa học ${course.title}`}>
        <div className="store-course-image">
          <span className="course-image-note">ẢNH KHÓA HỌC · SẼ CẬP NHẬT</span>
          <span className="course-image-monogram" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <Badge tone={course.status === "published" ? "green" : "neutral"}>{status}</Badge>
          <span className="course-image-arrow" aria-hidden="true">↗</span>
        </div>
        <div className="store-course-content">
          <span className="store-course-category">{course.category?.name ?? "Chủ đề"}</span>
          <h3>{course.title}</h3>
          <span className="store-course-instructor">{name} <span>·</span> Giảng viên</span>
          <div className="store-course-facts">
            <span>{formatDuration(course.totalDurationSeconds)}</span>
            <span>{money.format(course.studentCount ?? 0)} học viên</span>
          </div>
          <div className="store-course-rating"><span aria-label={`Đánh giá ${course.rating} trên 5`}>★ {course.rating.toFixed(1)}</span><span>({course.reviewCount} đánh giá)</span></div>
          <div className="store-course-price"><strong>{money.format(course.price)} ₫</strong><span>học trọn đời*</span></div>
        </div>
      </a>
    </article>
  );
}

export function CourseExplorer() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const [query, setQuery] = useState("");
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    Promise.all([apiClient.listCourses({ page: 1, pageSize: 100 }), apiClient.listCategories()])
      .then(([coursePage, categoryList]) => {
        if (!active) return;
        setCourses(coursePage.data);
        setCategories(categoryList);
        setState("ready");
      })
      .catch(() => { if (active) setState("error"); });
    const search = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setQuery(detail ?? "");
      setSelectedTab("Tất cả");
    };
    const category = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      setQuery("");
      setSelectedTab(slug ?? "Tất cả");
    };
    window.addEventListener("course-search", search);
    window.addEventListener("course-category", category);
    return () => {
      active = false;
      window.removeEventListener("course-search", search);
      window.removeEventListener("course-category", category);
    };
  }, []);

  const visibleCourses = useMemo(() => courses.filter((course) => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    const matchesQuery = !normalizedQuery || `${course.title} ${course.subtitle} ${course.category?.name ?? ""} ${course.instructor?.name ?? ""}`.toLocaleLowerCase("vi").includes(normalizedQuery);
    const matchesTab = selectedTab === "Tất cả"
      || (selectedTab === "Mới bắt đầu" && course.level === "beginner")
      || (selectedTab === "Sáng tạo" && /sáng tạo|nhiếp ảnh|hình ảnh|tư duy/i.test(course.category?.name ?? ""))
      || (selectedTab === "Kinh doanh" && /kinh doanh|thương hiệu/i.test(course.category?.name ?? ""))
      || selectedTab === course.category?.name
      || selectedTab === course.category?.slug;
    return matchesQuery && matchesTab;
  }), [courses, query, selectedTab]);

  return (
    <div className="course-explorer">
      <div className="course-tabs" role="tablist" aria-label="Lọc khóa học nổi bật">
        {tabLabels.map((label) => <button key={label} type="button" role="tab" aria-selected={selectedTab === label} className={selectedTab === label ? "course-tab is-selected" : "course-tab"} onClick={() => { setSelectedTab(label); setQuery(""); }}>{label}</button>)}
        {categories.slice(0, 2).map((category) => <button key={category.id} type="button" role="tab" aria-selected={selectedTab === category.name} className={selectedTab === category.name ? "course-tab is-selected" : "course-tab"} onClick={() => { setSelectedTab(category.name); setQuery(""); }}>{category.name}</button>)}
      </div>
      {query && <p className="search-result-note">Kết quả cho “{query}” <button type="button" onClick={() => setQuery("")}>Xóa tìm kiếm</button></p>}
      {state === "loading" && <div className="store-course-grid" aria-label="Đang tải khóa học">{[0,1,2].map((item) => <div className="store-skeleton-card" key={item}><Skeleton height={190} /><Skeleton className="skeleton-line" /><Skeleton className="skeleton-line short" /></div>)}</div>}
      {state === "error" && <div className="store-empty" role="alert"><strong>Chưa tải được danh sách khóa học.</strong><p>Kiểm tra kết nối rồi thử lại.</p><button type="button" className="button button-outline" onClick={() => { setState("loading"); apiClient.listCourses({ page: 1, pageSize: 100 }).then((page) => { setCourses(page.data); setState("ready"); }).catch(() => setState("error")); }}>Thử lại</button></div>}
      {state === "ready" && visibleCourses.length > 0 && <div className="store-course-grid">{visibleCourses.map((course, index) => <CourseCard key={course.id} course={course} index={index} />)}</div>}
      {state === "ready" && visibleCourses.length === 0 && <div className="store-empty"><strong>Chưa tìm thấy khóa học phù hợp.</strong><p>Thử chủ đề hoặc từ khóa khác.</p><button type="button" className="button button-outline" onClick={() => { setQuery(""); setSelectedTab("Tất cả"); }}>Xem tất cả khóa học</button></div>}
      <p className="mock-disclosure">* Dữ liệu khóa học, học viên, đánh giá và giá hiện là mẫu preview. Thời hạn truy cập thật cần xác nhận.</p>
    </div>
  );
}
