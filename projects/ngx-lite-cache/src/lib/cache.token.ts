import { HttpContextToken } from '@angular/common/http';

export const CACHING_ENTRY = new HttpContextToken<string | undefined>(() => undefined);
export const CACHING_INVALIDATE = new HttpContextToken<string | undefined>(() => undefined);
