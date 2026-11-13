import { ApiError, ErrorResult } from "../constants/types";

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "GameBacklogApp/1.0",
    };
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = { ...this.defaultHeaders, ...options.headers };

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        let status = response.status;
        let message = `Request failed with status ${response.status}`;
        const errorBody = (await response.json()) as ErrorResult;
        if (errorBody?.status) status = errorBody.status;
        if (errorBody?.message) message = errorBody.message;
        throw new ApiError(status, message);
      }
      return data;
    } catch (e) {
      throw new ApiError(500, e instanceof Error ? e.message : "Network error");
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }
}

export const cheapSharkClient = new ApiClient(
  "https://www.cheapshark.com/api/1.0",
);
