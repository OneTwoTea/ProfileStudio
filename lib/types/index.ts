export type IsoDateTime = string;
export type VndAmount = number;

export type CourseStatus = "draft" | "published" | "archived";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type EnrollmentRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "expired";

export interface ImageAsset {
  url: string;
  width: number;
  height: number;
  alt: string;
  variants?: { sm?: string; md?: string; lg?: string };
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar: ImageAsset | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  courseCount: number;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  durationSeconds: number;
  order: number;
  isPreview: boolean;
  isCompleted?: boolean;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseProgress {
  percent: number;
  completedLessons: number;
  totalLessons: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: CourseStatus | (string & {});
  level: CourseLevel | (string & {});
  price: VndAmount;
  originalPrice?: VndAmount;
  currency: "VND" | (string & {});
  cover: ImageAsset | null;
  category: Category;
  instructor: Instructor;
  learningOutcomes: string[];
  requirements: string[];
  chapters: Chapter[];
  rating: number;
  reviewCount: number;
  studentCount?: number;
  totalLessons: number;
  totalDurationSeconds: number;
  progress?: CourseProgress;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export interface PaymentInstructions {
  amount: VndAmount;
  currency: "VND" | (string & {});
  bankName: string;
  accountNumber: string;
  accountName: string;
  transferContent: string;
  qrUrl: string | null;
  expiresAt: IsoDateTime;
}

export interface EnrollmentRequest {
  id: string;
  referenceCode: string;
  status: EnrollmentRequestStatus | (string & {});
  courseId: string;
  paymentInstructions: PaymentInstructions | null;
  createdAt: IsoDateTime;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: ImageAsset | null;
  rating: number;
}

export interface HomepageContent {
  testimonials: Testimonial[];
  heroImage: ImageAsset | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: ImageAsset | null;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  support: {
    email: string;
    phone: string | null;
    chatUrl: string | null;
    workingHours: string;
  };
  payment: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  } | null;
}

export interface PageMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PageMeta;
}

export interface CourseQuery {
  page?: number;
  pageSize?: number;
  q?: string;
  status?: string;
  category?: string;
  level?: string;
  sort?: string;
}

export interface EnrollmentInput {
  note?: string;
  idempotencyKey: string;
}

export type ApiErrorCode =
  | "TOKEN_EXPIRED"
  | "INVALID_QUERY"
  | "VALIDATION_ERROR"
  | "COURSE_NOT_ENROLLED"
  | "ENROLLMENT_REQUEST_ALREADY_PENDING"
  | "ALREADY_ENROLLED"
  | "RATE_LIMITED"
  | "NETWORK_ERROR"
  | (string & {});

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  requestId?: string;
  status?: number;
  details?: unknown;
}
