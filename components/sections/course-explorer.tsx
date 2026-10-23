"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { apiClient } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import type { Course } from "@/lib/types";

const money = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });
const enrollUrl = "https://forms.gle/gd3vppCtePBSB2vh6";

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
}

function FeaturedCourse({ course }: { course: Course }) {
  const name = course.instructor?.name || "Giảng viên đang cập nhật";

  return (
    <article className="course-spotlight">
      <a className="course-spotlight-media" href="#faq" aria-label={`Xem thông tin khóa học ${course.title}`}>
        {course.cover?.url ? (
          <Image
            src={course.cover.url}
            alt={course.cover.alt ?? course.title}
            fill
            sizes="(max-width: 860px) 100vw, 58vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="course-image-monogram" aria-hidden="true">01</span>
        )}
      </a>
      <div className="course-spotlight-body">
        <div className="course-spotlight-tags">
          <span className="course-spotlight-tag">{course.category?.name ?? "Khóa học"}</span>
          <span className="course-spotlight-tag is-hot">Bán chạy</span>
        </div>
        <h3>{course.title}</h3>
        <span className="course-spotlight-instructor">{name} <span>·</span> Giảng viên</span>
        <div className="course-spotlight-facts">
          <span aria-label={`Đánh giá ${course.rating} trên 5`}><b>★ {course.rating.toFixed(1)}</b> ({course.reviewCount} đánh giá)</span>
          <span>{formatDuration(course.totalDurationSeconds)}</span>
          <span>{money.format(course.studentCount ?? 0)} học viên</span>
        </div>
        <div className="course-spotlight-offer">
          <div className="course-spotlight-price">
            {course.originalPrice != null && course.originalPrice > course.price && (
              <s>{money.format(course.originalPrice)} ₫</s>
            )}
            <strong>{money.format(course.price)} ₫</strong>
            <span>Học trọn đời</span>
          </div>
          <a className="course-spotlight-enroll" href={enrollUrl}>Đăng ký ngay</a>
        </div>
      </div>
    </article>
  );
}

function UpcomingCourse({ course, index }: { course: Course; index: number }) {
  return (
    <article className={`course-upcoming card-tone-${(index + 1) % 3}`}>
      <span className="course-upcoming-thumb" aria-hidden="true">
        {course.cover?.url && <Image src={course.cover.url} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />}
      </span>
      <div className="course-upcoming-body">
        <span className="course-upcoming-category">{course.category?.name ?? "Chủ đề"}</span>
        <h4>{course.title}</h4>
        <span className="course-upcoming-instructor">{course.instructor?.name || "Giảng viên đang cập nhật"}</span>
      </div>
      <a className="course-upcoming-notify" href={enrollUrl}>Nhận thông báo</a>
    </article>
  );
}

export function CourseExplorer() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  function load() {
    setState("loading");
    return apiClient.listCourses({ page: 1, pageSize: 100 }).then((page) => {
      setCourses(page.data);
      setState("ready");
    }).catch(() => setState("error"));
  }

  useEffect(() => {
    let active = true;
    apiClient.listCourses({ page: 1, pageSize: 100 })
      .then((page) => {
        if (!active) return;
        setCourses(page.data);
        setState("ready");
      })
      .catch(() => { if (active) setState("error"); });
    const search = (event: Event) => {
      setQuery((event as CustomEvent<string>).detail ?? "");
      setCategory("");
    };
    const pickCategory = (event: Event) => {
      setQuery("");
      setCategory((event as CustomEvent<string>).detail ?? "");
    };
    window.addEventListener("course-search", search);
    window.addEventListener("course-category", pickCategory);
    return () => {
      active = false;
      window.removeEventListener("course-search", search);
      window.removeEventListener("course-category", pickCategory);
    };
  }, []);

  const visibleCourses = useMemo(() => courses.filter((course) => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    const matchesQuery = !normalizedQuery || `${course.title} ${course.subtitle} ${course.category?.name ?? ""} ${course.instructor?.name ?? ""}`.toLocaleLowerCase("vi").includes(normalizedQuery);
    const matchesCategory = !category || category === course.category?.slug || category === course.category?.name;
    return matchesQuery && matchesCategory;
  }), [courses, query, category]);

  const featured = visibleCourses.find((course) => course.status === "published");
  const upcoming = visibleCourses.filter((course) => course !== featured);
  const clearFilters = () => { setQuery(""); setCategory(""); };

  return (
    <div className="course-explorer">
      {(query || category) && <p className="search-result-note">Kết quả cho “{query || category}” <button type="button" onClick={clearFilters}>Xóa bộ lọc</button></p>}
      {state === "loading" && <div className="course-spotlight is-loading" aria-label="Đang tải khóa học"><Skeleton height={280} /><div><Skeleton className="skeleton-line" /><Skeleton className="skeleton-line short" /></div></div>}
      {state === "error" && <div className="store-empty" role="alert"><strong>Chưa tải được danh sách khóa học.</strong><p>Kiểm tra kết nối rồi thử lại.</p><button type="button" className="button button-outline" onClick={load}>Thử lại</button></div>}
      {state === "ready" && featured && <FeaturedCourse course={featured} />}
      {state === "ready" && upcoming.length > 0 && <div className="course-upcoming-section">
        <span className="course-upcoming-label">Sắp ra mắt</span>
        <div className="course-upcoming-grid">{upcoming.map((course, index) => <UpcomingCourse key={course.id} course={course} index={index} />)}</div>
      </div>}
      {state === "ready" && visibleCourses.length === 0 && <div className="store-empty"><strong>Chưa tìm thấy khóa học phù hợp.</strong><p>Thử chủ đề hoặc từ khóa khác.</p><button type="button" className="button button-outline" onClick={clearFilters}>Xem tất cả khóa học</button></div>}
    </div>
  );
}
