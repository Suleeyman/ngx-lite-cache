import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { CacheService } from './cache.service';
import { CACHING_ENTRY, CACHING_INVALIDATE } from './cache.token';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cachingEntry = req.context.get(CACHING_ENTRY);
  const cachingInvalidate = req.context.get(CACHING_INVALIDATE);

  const cache = inject(CacheService);
  if (cachingEntry) {
    const cachedResponse = cache.get(cachingEntry);
    if (cachedResponse !== null) {
      return of(cachedResponse);
    }
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.ok) {
        if (cachingInvalidate) {
          cache.delete(cachingInvalidate);
        }

        if (cachingEntry) {
          cache.put(cachingEntry, event);
        }
      }
    }),
  );
};
