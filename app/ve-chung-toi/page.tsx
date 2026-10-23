import Link from "next/link";
import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";
import Image from "next/image";

// Logos from Devicon; mono icons are black and get inverted in dark mode.
const skills = [
  { name: "Next.js", icon: "/images/skills/nextjs.svg", mono: true },
  { name: "Tailwind CSS", icon: "/images/skills/tailwindcss.svg" },
  { name: "HTML", icon: "/images/skills/html5.svg" },
  { name: "CSS", icon: "/images/skills/css3.svg" },
  { name: "GitHub", icon: "/images/skills/github.svg", mono: true },
  { name: "VS Code", icon: "/images/skills/vscode.svg" },
  { name: "Vercel", icon: "/images/skills/vercel.svg", mono: true },
  { name: "Node.js", icon: "/images/skills/nodejs.svg" },
];

export default function AboutPage() {
  return (
    <main className="market-home about-page">
      <StoreHeader />

      <section className="about-hero" aria-labelledby="about-title">
        <div className="shell about-hero-inner">
          <div className="about-hero-copy">
            <h1 id="about-title">
              Sân khấu là nơi bạn tỏa sáng.
              <br />
              <em>Portfolio giúp câu chuyện ấy đi xa hơn.</em>
            </h1>
            <p>
              Profile Studio giúp người dẫn chương trình xây dựng hình ảnh chuyên nghiệp trên môi trường số - qua khóa học tự làm, dịch vụ thiết kế và những mẫu portfolio dành riêng cho MC.
            </p>
          </div>
          <aside className="about-skills" aria-labelledby="about-skills-title">
            <span className="section-kicker" id="about-skills-title">
              CÔNG NGHỆ CHÚNG TÔI SỬ DỤNG
            </span>
            <ul>
              {skills.map((skill) => (
                <li key={skill.name}>
                  <Image
                    src={skill.icon}
                    alt=""
                    width={22}
                    height={22}
                    unoptimized
                    className={skill.mono ? "about-skill-mono" : undefined}
                  />
                  {skill.name}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <section
        className="about-creator"
        id="nguoi-sang-tao"
        aria-labelledby="about-creator-title"
      >
        <div className="shell about-creator-inner">
          <div className="about-creator-mark" style={{ position: "relative" }}>
            <Image
              src="/images/about/anhdaidienmau.png"
              alt="Chân dung nhà sáng lập Profile Studio"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
              priority
            />
            <i>NGƯỜI SÁNG TẠO PROFILE STUDIO</i>
          </div>
          <div className="about-creator-copy" id="hanh-trinh">
            <span className="section-kicker">
              NGƯỜI SÁNG TẠO
            </span>
            <h2 id="about-creator-title">Phạm Hồng Thái</h2>
            <span className="about-creator-role">
              Nhà sáng lập &amp; người phát triển Profile Studio
            </span>
            <p>
              Tôi xây dựng Profile Studio với mong muốn giúp người dẫn chương trình kể câu chuyện nghề nghiệp của mình rõ ràng và chuyên
              nghiệp hơn. Dự án kết hợp hướng dẫn tự làm portfolio với dịch vụ thiết kế, để mỗi MC có thể chọn cách phù hợp với mình.
            </p>
            <p>
              Tôi tin rằng một hồ sơ tốt nên thể hiện được phong cách dẫn, kinh nghiệm, showreel và cách liên hệ - để khách hàng dễ hình dung người đứng trên sân khấu trước khi gửi lời mời.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
