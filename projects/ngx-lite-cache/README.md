# NgxLiteCache

A lightweight, simple HTTP caching library for Angular applications. This library provides an easy way to cache HTTP responses using Angular's HttpClient interceptors, reducing unnecessary network requests and improving application performance.

## Features

- 🚀 **Simple Integration**: Easy to integrate with existing Angular applications
- ⚡ **Performance Boost**: Cache HTTP responses to reduce network requests
- 🎯 **Selective Caching**: Control which requests to cache using HttpContext
- 🔄 **Cache Invalidation**: Support for cache invalidation when needed
- 📦 **Lightweight**: Minimal dependencies, focused on HTTP caching
- 🔧 **TypeScript**: Full TypeScript support with proper typing

## Installation

```bash
npm install ngx-lite-cache
```

## Quick Start

### 1. Configure HttpClient with the Cache Interceptor

In your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cacheInterceptor } from 'ngx-lite-cache';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([cacheInterceptor])),
    // ... other providers
  ],
};
```

### 2. Use HttpContext to Cache Requests

```typescript
import { HttpClient, HttpContext } from '@angular/common/http';
import { CACHING_ENTRY } from 'ngx-lite-cache';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get('/api/posts', {
      context: new HttpContext().set(CACHING_ENTRY, 'posts'),
    });
  }
}
```

## API Reference

### HttpContext Tokens

- `CACHING_ENTRY`: Set a cache key for the request
- `CACHING_INVALIDATE`: Invalidate a specific cache entry

## Usage Examples

### Caching GET request

```typescript
import { HttpClient, HttpContext } from '@angular/common/http';
import { CACHING_ENTRY } from 'ngx-lite-cache';

getUserProfile(userId: string) {
  return this.http.get(`/api/users/${userId}`, {
    context: new HttpContext().set(CACHING_ENTRY, `/users/${userId}`),
  });
}
```

### Cache Invalidation

```typescript
import { HttpClient, HttpContext } from '@angular/common/http';
import { CACHING_ENTRY, CACHING_INVALIDATE } from 'ngx-lite-cache';

updateUserProfile(userId: string, data: any) {
  return this.http.put(`/api/users/${userId}`, data, {
    context: new HttpContext()
      .set(CACHING_INVALIDATE, `/users/${userId}`), // Invalidate the cached profile after the request is *ok*
  });
}
```

## Development

This project uses Angular CLI for development. The workspace contains both the library (`projects/ngx-lite-cache`) and a demo application (`projects/app`).

### Prerequisites

- Node.js
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Suleeyman/ngx-lite-cache.git
cd ngx-lite-cache
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Run the demo application:

```bash
npm start
```

Navigate to `http://localhost:4200/` to see the demo in action.

### Building the Library

```bash
ng build ngx-lite-cache
```

The build artifacts will be stored in the `dist/ngx-lite-cache/` directory.

### Running Tests

```bash
ng test ngx-lite-cache
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Feedback

Have suggestions, feedback, or need support? Open an issue or start a discussion — we’d love to hear from you.

## Contribution

We welcome all kinds of contributions!

**♥️ Financial support**

If you want to support me financially you can [buy me a coffee](https://ko-fi.com/ysuleyman) it will certainly motivate me on improving that library
