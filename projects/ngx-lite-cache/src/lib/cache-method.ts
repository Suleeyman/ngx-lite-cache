import { HttpResponse } from "@angular/common/http";

export abstract class CacheMethod {
  abstract get(key: string): HttpResponse<unknown> | null;
  abstract put(key: string, cachedValue: HttpResponse<unknown>): void;
  abstract delete(key: string): boolean;
}

export interface CacheItem {
  url?: string;
  response: HttpResponse<unknown>;
  entryTime: number;
}

export const MAX_CACHE_AGE = 60 * 60 * 1000; // in milliseconds
