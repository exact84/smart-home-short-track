import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { BASE_API_URL } from '../constants/base-url';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenStorage = inject(TokenService);
  const router = inject(Router);
  const token = tokenStorage.getToken();

  console.log('token in interceptor', token);

  console.log('before interceptor', request.url);

  // if (!request.url.startsWith('http')) {
  //   if (request.url.startsWith('/api')) {
  //     request = request.clone({
  //       url: BASE_API_URL + request.url,
  //     });
  //   }
  //   request = request.clone({
  //     url: BASE_API_URL + request.url,
  //   });
  // }

  if (!request.url.startsWith('http') && !request.url.startsWith('api')) {
    request = request.clone({
      url: `${BASE_API_URL}${request.url.startsWith('/') ? '' : '/'}${request.url}`,
    });
  }

  console.log('after interceptor', request.url);

  if (token) {
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401) {
        tokenStorage.deleteToken();
        router.navigate(['login']);
        return EMPTY;
      }
      return throwError(() => error);
    }),
  );
};
