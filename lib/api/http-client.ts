import { ApiClientError } from "@/lib/api/contracts";
import type {
  ApiError,
  Category,
  Course,
  CourseQuery,
  EnrollmentInput,
  EnrollmentRequest,
  Paginated,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

interface ApiEnvelope<T> {
  data: T;
}

interface ApiListEnvelope<T> extends ApiEnvelope<T[]> {
  meta: { page: number; page_size: number; total_items: number; total_pages: number };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
let refreshPromise: Promise<boolean> | null = null;

function readCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie.split("; ").find((value) => value.startsWith("csrf_token="));
  return entry ? decodeURIComponent(entry.slice("csrf_token=".length)) : null;
}

function toApiError(body: unknown, status: number, requestId?: string): ApiClientError {
  const error = (body as { error?: Partial<ApiError> } | null)?.error;
  return new ApiClientError({
    code: error?.code ?? `HTTP_${status}`,
    message: error?.message ?? "Yêu cầu chưa thể hoàn tất.",
    status,
    requestId: error?.requestId ?? (error as { request_id?: string } | undefined)?.request_id ?? requestId,
    details: error?.details,
  });
}

function camelize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(camelize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key.replace(/_([a-z0-9])/g, (_, character: string) => character.toUpperCase()),
      camelize(item),
    ]));
  }
  return value;
}

function mapPagination<T>(response: ApiListEnvelope<unknown>): Paginated<T> {
  return {
    data: response.data.map((item) => camelize(item) as T),
    meta: {
      page: response.meta.page,
      pageSize: response.meta.page_size,
      totalItems: response.meta.total_items,
      totalPages: response.meta.total_pages,
    },
  };
}

async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "X-CSRF-Token": readCsrfToken() ?? "" },
      });
      return response.ok;
    })().catch(() => false).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function request<T>(path: string, init: RequestInit = {}, canRefresh = true): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrf = readCsrfToken();
    if (csrf) headers.set("X-CSRF-Token", csrf);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, method, headers, credentials: "include" });
  } catch {
    throw new ApiClientError({ code: "NETWORK_ERROR", message: "Không thể kết nối. Vui lòng thử lại.", status: 0 });
  }

  const payload: unknown = response.status === 204 ? null : await response.json().catch(() => null);
  const code = (payload as { error?: { code?: string } } | null)?.error?.code;
  if (response.status === 401 && code === "TOKEN_EXPIRED" && canRefresh) {
    const refreshed = await refreshSession();
    if (refreshed) return request<T>(path, init, false);
    if (typeof window !== "undefined") {
      const route = `${window.location.pathname}${window.location.search}`;
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`/login?returnTo=${encodeURIComponent(route)}`);
    }
  }
  if (!response.ok) throw toApiError(payload, response.status, response.headers.get("X-Request-Id") ?? undefined);
  return payload as T;
}

function queryString(query: CourseQuery = {}) {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("page_size", String(query.pageSize));
  if (query.q) params.set("q", query.q);
  if (query.status) params.set("status", query.status);
  if (query.category) params.set("category", query.category);
  if (query.level) params.set("level", query.level);
  if (query.sort) params.set("sort", query.sort);
  return params.size ? `?${params.toString()}` : "";
}

export const httpApiClient = {
  async listCourses(query: CourseQuery = {}) {
    const response = await request<ApiListEnvelope<unknown>>(`/courses${queryString(query)}`);
    return mapPagination<Course>(response);
  },
  async getCourse(slug: string) {
    try {
      const response = await request<ApiEnvelope<unknown>>(`/courses/${encodeURIComponent(slug)}`);
      return camelize(response.data) as Course;
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) return null;
      throw error;
    }
  },
  async listCategories() {
    const response = await request<ApiEnvelope<unknown[]>>("/categories");
    return response.data.map((item) => camelize(item) as Category);
  },
  async listTestimonials(): Promise<Testimonial[]> {
    // No public testimonials endpoint has been agreed in the backend contract yet.
    return [];
  },
  async getPublicSettings() {
    const response = await request<ApiEnvelope<unknown>>("/public/config");
    return camelize(response.data) as SiteSettings;
  },
  async createEnrollmentRequest(courseId: string, input: EnrollmentInput) {
    const response = await request<ApiEnvelope<unknown>>(
      `/courses/${encodeURIComponent(courseId)}/enrollment-requests`,
      {
        method: "POST",
        headers: { "Idempotency-Key": input.idempotencyKey },
        body: JSON.stringify(input.note ? { note: input.note } : {}),
      },
    );
    return camelize(response.data) as EnrollmentRequest;
  },
};
