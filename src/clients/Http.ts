export interface Get {
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface Post {
  url: string;
  payload?: unknown;
  headers?: Record<string, string>;
}

export interface Put {
  url: string;
  payload?: unknown;
  headers?: Record<string, string>;
}

export interface Patch {
  url: string;
  payload?: unknown;
  headers?: Record<string, string>;
}

export interface Delete {
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export abstract class IHttpClient {
  abstract get<T>(options: Get): Promise<T | null>;
  abstract post<T>(options: Post): Promise<T | null>;
  abstract put<T>(options: Put): Promise<T | null>;
  abstract patch<T>(options: Patch): Promise<T | null>;
  abstract delete<T>(options: Delete): Promise<T | null>;
}
