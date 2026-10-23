"use client";

import { useRef, useState } from "react";

// TODO: thay bằng đường dẫn video quảng cáo khóa học thật (vd: "/videos/khoa-hoc-mc.mp4").
const COURSE_VIDEO_SRC = "";
const COURSE_VIDEO_POSTER = "/images/hero/anh1.png";
const COURSE_VIDEO_DURATION = "02:48";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const video = videoRef.current;
    if (!video || !COURSE_VIDEO_SRC) return;
    setPlaying(true);
    video.play().catch(() => setPlaying(false));
  }

  return (
    <figure className="ps-video">
      <div className="ps-video-stage">
        <div className="ps-video-frame">
          <video
            ref={videoRef}
            poster={COURSE_VIDEO_POSTER}
            preload="metadata"
            playsInline
            controls={playing}
            onPause={(event) => {
              if (event.currentTarget.ended) setPlaying(false);
            }}
            onEnded={() => setPlaying(false)}
            aria-label="Video giới thiệu khóa học Profile Studio"
          >
            {COURSE_VIDEO_SRC && <source src={COURSE_VIDEO_SRC} type="video/mp4" />}
          </video>
  
          {!playing && (
            <>
              <span className="ps-video-tag">
                <i aria-hidden="true" />
                Video giới thiệu khóa học
              </span>
              <button
                className="ps-video-play"
                type="button"
                onClick={play}
                aria-label="Phát video giới thiệu khóa học"
                disabled={!COURSE_VIDEO_SRC}
                title={COURSE_VIDEO_SRC ? undefined : "Video đang được cập nhật"}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
                </svg>
              </button>
              <div className="ps-video-bar" aria-hidden="true">
                <span>00:00</span>
                <span className="ps-video-track"><span /></span>
                <span>{COURSE_VIDEO_DURATION}</span>
              </div>
            </>
          )}
        </div>

        <div className="ps-video-badge">
          <span className="ps-video-badge-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span>
            <strong>Portfolio của bạn</strong>
            <small>hoàn thiện sau khóa học</small>
          </span>
        </div>
      </div>

      <figcaption className="ps-video-caption">
        <span>
          <strong>Xem khóa học hoạt động thế nào</strong>
          <small>Từ con số 0 đến portfolio MC hoàn chỉnh</small>
        </span>
        <a href="#featured-courses">Xem chi tiết khóa học <span aria-hidden="true">→</span></a>
      </figcaption>
    </figure>
  );
}
