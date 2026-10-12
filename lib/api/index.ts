import type { ApiClient } from "@/lib/api/contracts";
import { httpApiClient } from "@/lib/api/http-client";
import { mockApiClient } from "@/lib/api/mock-client";

// DATA MODE: mock is the preview default; HTTP mode requires the documented backend contract.
export const apiClient: ApiClient = process.env.NEXT_PUBLIC_API_MODE === "http"
  ? httpApiClient
  : mockApiClient;
