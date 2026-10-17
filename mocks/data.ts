import type {
  Category,
  Course,
  EnrollmentRequest,
  SiteSettings,
} from "@/lib/types";

// Preview-only sample content. Replace this module through the ApiClient adapter when a backend is available.
export const mockCategories: Category[] = [
  { id: "cat-brand", name: "Định vị thương hiệu MC", slug: "dinh-vi-thuong-hieu-mc", courseCount: 1 },
  { id: "cat-landing", name: "Thiết kế landing page", slug: "thiet-ke-landing-page", courseCount: 1 },
  { id: "cat-showreel", name: "Showreel & hình ảnh", slug: "showreel-hinh-anh", courseCount: 1 },
  { id: "cat-content", name: "Nội dung chốt show", slug: "noi-dung-chot-show", courseCount: 0 },
];

const founder = {
  id: "instructor-preview",
  name: "Phạm Hồng Thái",
  bio: "Nhà thiết kế portfolio cho MC và người dẫn chương trình.",
  avatar: null,
};

export const mockCourses: Course[] = [
  {
    id: "course-looking",
    slug: "landing-page-portfolio-mc",
    title: "Tự tạo landing page portfolio MC từ A đến Z",
    subtitle: "Dựng trang giới thiệu chuyên nghiệp bằng công cụ kéo thả, không cần code.",
    description: "Thiết kế landing page portfolio cho MC: bố cục, showreel, sự kiện đã dẫn, cảm nhận khách hàng và nút đặt lịch.",
    status: "published",
    level: "beginner",
    price: 1490000,
    currency: "VND",
    cover: null,
    category: mockCategories[1],
    instructor: founder,
    learningOutcomes: ["Dựng landing page portfolio hoàn chỉnh", "Gắn tên miền riêng và form đặt lịch"],
    requirements: ["Không yêu cầu kinh nghiệm thiết kế hay lập trình"],
    chapters: [],
    rating: 4.9,
    reviewCount: 24,
    studentCount: 1280,
    totalLessons: 8,
    totalDurationSeconds: 12000,
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    id: "course-frame",
    slug: "showreel-hinh-anh-mc",
    title: "Showreel & hình ảnh MC thu hút khách hàng",
    subtitle: "Chọn lọc, dựng clip và sắp xếp hình ảnh sự kiện cho portfolio.",
    description: "Biên tập showreel, chọn ảnh sân khấu và trình bày kinh nghiệm dẫn chương trình trên landing page.",
    status: "published",
    level: "intermediate",
    price: 1890000,
    currency: "VND",
    cover: null,
    category: mockCategories[2],
    instructor: founder,
    learningOutcomes: ["Dựng showreel 60–90 giây ấn tượng", "Chọn ảnh sự kiện đúng phong cách"],
    requirements: ["Có sẵn video hoặc ảnh các chương trình đã dẫn"],
    chapters: [],
    rating: 4.8,
    reviewCount: 18,
    studentCount: 860,
    totalLessons: 12,
    totalDurationSeconds: 18600,
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    id: "course-signature",
    slug: "dinh-vi-thuong-hieu-mc",
    title: "Định vị thương hiệu cá nhân cho MC",
    subtitle: "Tìm phong cách dẫn riêng và thông điệp khiến khách hàng nhớ đến bạn.",
    description: "Xác định tệp khách, phong cách dẫn và thông điệp thương hiệu MC trước khi xây portfolio.",
    status: "published",
    level: "beginner",
    price: 1690000,
    currency: "VND",
    cover: null,
    category: mockCategories[0],
    instructor: founder,
    learningOutcomes: ["Xác định thế mạnh và tệp khách mục tiêu", "Viết lời giới thiệu bản thân thuyết phục"],
    requirements: ["Đang hoặc muốn hành nghề MC dẫn chương trình"],
    chapters: [],
    rating: 5,
    reviewCount: 12,
    studentCount: 642,
    totalLessons: 10,
    totalDurationSeconds: 17100,
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
  },
];

export const mockTestimonials = [
  { id: "review-1", name: "Minh Anh", role: "MC đám cưới", quote: "Trước đây mình gửi khách cả chục ảnh và link rời rạc. Giờ chỉ cần một đường link portfolio, khách xem xong là chốt lịch.", avatar: null, rating: 5 },
  { id: "review-2", name: "Quang Huy", role: "MC sự kiện doanh nghiệp", quote: "Không biết code vẫn tự dựng được trang portfolio chỉn chu. Agency đánh giá hồ sơ của mình chuyên nghiệp hơn hẳn.", avatar: null, rating: 5 },
  { id: "review-3", name: "Thảo Vy", role: "MC livestream", quote: "Phần định vị giúp mình rõ phong cách dẫn của bản thân, nhờ vậy trang portfolio có cá tính và dễ được nhớ đến.", avatar: null, rating: 5 },
];

export const mockSiteSettings: SiteSettings = {
  brandName: "Profile Studio",
  tagline: "Portfolio chuyên nghiệp cho người dẫn chương trình.",
  support: {
    email: "support@example.invalid",
    phone: null,
    chatUrl: null,
    workingHours: "Chưa cấu hình (dữ liệu preview)",
  },
  payment: null,
};

export const mockEnrollment: EnrollmentRequest = {
  id: "enrollment-preview",
  referenceCode: "ENR-PREVIEW",
  status: "pending",
  courseId: mockCourses[0].id,
  paymentInstructions: null,
  createdAt: "2026-10-01T00:00:00Z",
};
