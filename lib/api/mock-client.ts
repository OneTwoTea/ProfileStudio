import { mockCategories, mockCourses, mockEnrollment, mockSiteSettings, mockTestimonials } from "@/mocks/data";
import type { ApiClient } from "@/lib/api/contracts";
import type { Course, Paginated } from "@/lib/types";

const mockDelay = () => new Promise<void>((resolve) => setTimeout(resolve, 180));

export const mockApiClient: ApiClient = {
  async listCourses(query = {}): Promise<Paginated<Course>> {
    await mockDelay();
    let items = [...mockCourses];
    if (query.q) {
      const term = query.q.toLocaleLowerCase("vi");
      items = items.filter((course) => `${course.title} ${course.description}`.toLocaleLowerCase("vi").includes(term));
    }
    if (query.category) items = items.filter((course) => course.category.slug === query.category || course.category.id === query.category);
    if (query.level) items = items.filter((course) => course.level === query.level);
    if (query.status) items = items.filter((course) => course.status === query.status);
    if (query.sort) {
      const [field, ...rest] = query.sort.split(",")[0].split("-").filter(Boolean);
      const descending = query.sort.split(",")[0].startsWith("-");
      // Mock sort whitelist mirrors fields intended for course listing.
      if (field === "created_at" || field === "title" || field === "price") {
        items.sort((a, b) => {
          const av = field === "title" ? a.title : field === "price" ? a.price : a.createdAt;
          const bv = field === "title" ? b.title : field === "price" ? b.price : b.createdAt;
          return (av < bv ? -1 : av > bv ? 1 : 0) * (descending ? -1 : 1);
        });
      }
      void rest;
    }
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 20));
    const totalItems = items.length;
    return {
      data: items.slice((page - 1) * pageSize, page * pageSize),
      meta: { page, pageSize, totalItems, totalPages: Math.ceil(totalItems / pageSize) },
    };
  },

  async getCourse(slug) {
    await mockDelay();
    return mockCourses.find((course) => course.slug === slug || course.id === slug) ?? null;
  },

  async listCategories() {
    await mockDelay();
    return mockCategories;
  },

  async listTestimonials() {
    await mockDelay();
    return mockTestimonials;
  },

  async getPublicSettings() {
    await mockDelay();
    return mockSiteSettings;
  },

  async createEnrollmentRequest(courseId, input) {
    await mockDelay();
    const course = mockCourses.find((item) => item.id === courseId);
    if (!course) throw new Error("Không tìm thấy khóa học (mock 404).");
    // Preview-only: does not submit to a backend, create a real request, or initiate payment.
    return { ...mockEnrollment, courseId, referenceCode: `ENR-${input.idempotencyKey.slice(0, 6).toUpperCase()}` };
  },
};
