import type {
  Category,
  Course,
  CourseQuery,
  EnrollmentInput,
  EnrollmentRequest,
  Testimonial,
  Paginated,
  SiteSettings,
} from "@/lib/types";

/** Data boundary shared by mock preview and the future HTTP adapter. */
export interface ApiClient {
  listCourses(query?: CourseQuery): Promise<Paginated<Course>>;
  getCourse(slug: string): Promise<Course | null>;
  listCategories(): Promise<Category[]>;
  listTestimonials(): Promise<Testimonial[]>;
  getPublicSettings(): Promise<SiteSettings>;
  createEnrollmentRequest(
    courseId: string,
    input: EnrollmentInput,
  ): Promise<EnrollmentRequest>;
}

export class ApiClientError extends Error {
  readonly code: string;
  readonly status: number;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(input: {
    code: string;
    message: string;
    status: number;
    requestId?: string;
    details?: unknown;
  }) {
    super(input.message);
    this.name = "ApiClientError";
    this.code = input.code;
    this.status = input.status;
    this.requestId = input.requestId;
    this.details = input.details;
  }
}

export interface AuthAdapter {
  getCurrentUser(): Promise<
    | { state: "anonymous" }
    | { state: "authenticated"; user: import("@/lib/types").UserProfile }
    | { state: "error"; error: ApiClientError }
  >;
}
