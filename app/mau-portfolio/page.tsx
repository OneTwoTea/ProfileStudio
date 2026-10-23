import Link from "next/link";
import { StoreHeader } from "@/components/sections/store-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { PortfolioViewer, type PortfolioSample } from "@/components/sections/portfolio-viewer";

// Each sample is a standalone static page in public/mau/.
const samples: PortfolioSample[] = [
  {
    number: "01",
    name: "MC sự kiện",
    description: "Tông navy & vàng sang trọng cho MC hội nghị, gala và ra mắt sản phẩm.",
    href: "/mau/mc-su-kien.html",
    sections: ["Hero & nút đặt lịch", "Số liệu nổi bật", "Giới thiệu & phong cách dẫn", "Dịch vụ, showreel, hình ảnh", "Nhận xét khách hàng", "Form liên hệ"],
  },
  {
    number: "02",
    name: "MC song ngữ",
    description: "Bố cục sáng, thanh lịch, có nút chuyển Việt – Anh cho MC sự kiện quốc tế.",
    href: "/mau/mc-song-ngu.html",
    sections: ["Chuyển ngôn ngữ VI / EN", "Đối tác đã đồng hành", "Dịch vụ", "Dòng thời gian kinh nghiệm", "Trích dẫn khách hàng", "Form liên hệ"],
  },
  {
    number: "03",
    name: "MC tiệc cưới",
    description: "Tông ngà & hồng ấm áp, phù hợp MC tiệc cưới và lễ kỷ niệm.",
    href: "/mau/mc-tiec-cuoi.html",
    sections: ["Lịch trình ngày cưới", "Bảng gói dịch vụ", "Album khoảnh khắc", "Hỏi đáp thường gặp", "Form hỏi lịch trống"],
  },
  {
    number: "04",
    name: "MC livestream",
    description: "Nền tối, gradient nổi bật cho host livestream bán hàng trên sàn TMĐT.",
    href: "/mau/mc-livestream.html",
    sections: ["Mockup màn hình live", "Nền tảng hoạt động", "Kết quả bằng số", "Dự án nổi bật", "Quy trình làm việc", "Form booking"],
  },
  {
    number: "05",
    name: "MC talkshow",
    description: "Phong cách tạp chí đen – trắng, chữ lớn cho MC truyền hình và podcast.",
    href: "/mau/mc-talkshow.html",
    sections: ["Hero chữ lớn kiểu tạp chí", "Danh sách chương trình", "Hồ sơ & con số", "Trích dẫn báo chí", "Form hợp tác"],
  },
];

export default function PortfolioLibraryPage() {
  return (
    <main className="market-home portfolio-page">
      <StoreHeader />

      <section className="portfolio-live" id="xem-truc-tiep" aria-labelledby="portfolio-live-title">
        <div className="shell">
          <div className="portfolio-section-heading">
            <div>
              <h2 id="portfolio-live-title">Chọn phong cách của bạn</h2>
            </div>
          </div>
          <PortfolioViewer samples={samples} />
        </div>
      </section>

      <section className="portfolio-cta" aria-labelledby="portfolio-cta-title">
        <div className="shell portfolio-cta-inner">
          <div>
            <span className="section-kicker">BẮT ĐẦU NGAY</span>
            <h2 id="portfolio-cta-title">Muốn có một trang như thế này?</h2>
            <p>Tự làm theo khóa học từng bước, hoặc để Profile Studio thiết kế giúp bạn.</p>
          </div>
          <div className="portfolio-cta-actions">
            <Link className="button portfolio-primary" href="/#featured-courses">Xem khóa học</Link>
            <Link className="portfolio-secondary" href="/dich-vu-thiet-ke">Dịch vụ thiết kế</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
