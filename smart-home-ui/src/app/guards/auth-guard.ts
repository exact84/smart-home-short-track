import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const token = inject(TokenService).getToken();
  const router = inject(Router);

  if (!token) return router.createUrlTree(['/login']);

  if (authService.isLoggedIn()) return true;

  return authService.loadUserData(token).pipe(
    map((response) => {
      return response ? true : router.createUrlTree(['/login']);
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    }),
  );
};
