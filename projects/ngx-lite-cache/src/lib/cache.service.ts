import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheItem, CacheMethod, MAX_CACHE_AGE } from './cache-method';

@Injectable({
  providedIn: 'root',
})
export class CacheService implements CacheMethod {
  cacheMap = new Map<string, CacheItem>();

  get(key: string): HttpResponse<unknown> | null {
    const entry = this.cacheMap.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.entryTime > MAX_CACHE_AGE;
    return isExpired ? null : entry.response;
  }

  put(key: string, response: HttpResponse<unknown>): void {
    const entry: CacheItem = { response, entryTime: Date.now() };
    this.cacheMap.set(key, entry);
    this.deleteExpiredCache(key);
  }

  delete(entry: string) {
    return this.cacheMap.delete(entry);
  }

  private deleteExpiredCache(key: string) {
    this.cacheMap.forEach((entry) => {
      if (Date.now() - entry.entryTime > MAX_CACHE_AGE) {
        this.delete(key);
      }
    });
  }
}
