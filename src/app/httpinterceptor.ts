// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    return next(req);
  }

  const token = sessionStorage.getItem('auth_token');
  if (token && req.url.startsWith('http://localhost:8080')) {
    req = req.clone({
      setHeaders: { Authorization: `Basic ${token}` }
    });
  }
  return next(req);
};
``