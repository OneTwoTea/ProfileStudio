import type {
  Category,
  Course,
  EnrollmentRequest,
  SiteSettings,
} from "@/lib/types";

// Preview-only sample content. Replace this module through the ApiClient adapter when a backend is available.
export const mockCategories: Category[] = [
  { id: "cat-creative", name: "Tư duy sáng tạo", slug: "tu-duy-sang-tao", courseCount: 4 },
  { id: "cat-image", name: "Nhiếp ảnh & hình ảnh", slug: "nhiep-anh-hinh-anh", courseCount: 6 },
  { id: "cat-brand", name: "Thương hiệu cá nhân", slug: "thuong-hieu-ca-nhan", courseCount: 3 },
  { id: "cat-story", name: "Kể chuyện & nội dung", slug: "ke-chuyen-noi-dung", courseCount: 5 },
];

const founder = {
  id: "instructor-preview",
  name: "Phạm Hồng Thái",
  bio: "Thông tin người sáng lập sẽ được cập nhật.",
  avatar: null,
};

export const mockCourses: Course[] = [
  {
    id: "course-looking",
    slug: "nghe-thuat-nhin",
    title: "Nghệ thuật nhìn thấy điều chưa được gọi tên",
    subtitle: "Rèn luyện con mắt sáng tạo và khả năng quan sát.",
    description: "Nội dung minh họa cho giao diện preview; chủ đề và bài học thật chưa được cung cấp.",
    status: "published",
    level: "beginner",
    price: 1490000,
    currency: "VND",
    cover: null,
    category: mockCategories[0],
    instructor: founder,
    learningOutcomes: ["Quan sát có chủ đích", "Diễn đạt ý tưởng bằng hình ảnh"],
    requirements: ["Không yêu cầu kinh nghiệm trước đó"],
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
    slug: "mot-khuon-hinh",
    title: "Một khuôn hình, ngàn lời chưa nói",
    subtitle: "Kể chuyện bằng ánh sáng, nhịp điệu và bố cục.",
    description: "Nội dung minh họa cho giao diện preview; chủ đề và bài học thật chưa được cung cấp.",
    status: "published",
    level: "intermediate",
    price: 1890000,
    currency: "VND",
    cover: null,
    category: mockCategories[1],
    instructor: founder,
    learningOutcomes: ["Tạo bố cục có chủ đích", "Xây nhịp kể chuyện bằng hình ảnh"],
    requirements: ["Có thể dùng điện thoại hoặc máy ảnh"],
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
    slug: "dau-an-rieng",
    title: "Dấu ấn riêng trong một thế giới đồng thanh",
    subtitle: "Tìm tiếng nói cá nhân và định hình thương hiệu của bạn.",
    description: "Nội dung minh họa cho giao diện preview; chủ đề và bài học thật chưa được cung cấp.",
    status: "published",
    level: "beginner",
    price: 1690000,
    currency: "VND",
    cover: null,
    category: mockCategories[2],
    instructor: founder,
    learningOutcomes: ["Nhận diện thế mạnh cá nhân", "Xây thông điệp nhất quán"],
    requirements: ["Sẵn sàng thử nghiệm và tự phản tư"],
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
  { id: "review-1", name: "Minh Anh", role: "Học viên · thiết kế", quote: "Bài học giúp mình hệ thống lại cách quan sát. Mỗi lần quay lại, mình đều tìm thấy một điều mới.", avatar: null, rating: 5 },
  { id: "review-2", name: "Quang Huy", role: "Học viên · nhiếp ảnh", quote: "Nội dung rõ, có chiều sâu và cho mình không gian thử nghiệm theo nhịp riêng.", avatar: null, rating: 5 },
  { id: "review-3", name: "Thảo Vy", role: "Học viên · sáng tạo nội dung", quote: "Mình bắt đầu nhìn công việc quen thuộc bằng một góc nhìn khác và tự tin hơn với ý tưởng của mình.", avatar: null, rating: 5 },
];

export const mockSiteSettings: SiteSettings = {
  brandName: "Nocturne Atelier (tên preview)",
  tagline: "Học cách nhìn thế giới khác đi.",
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
