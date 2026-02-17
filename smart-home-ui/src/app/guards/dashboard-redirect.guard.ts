import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { DataStoreService } from '../services/data-store.service';

export const dashboardRedirectGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const store = inject(DataStoreService);

  const dashboardId = route.paramMap.get('dashboardId');
  if (!dashboardId) {
    return router.parseUrl('/dashboard');
  }

  return store.loadDashboard(dashboardId).pipe(
    map((data) => {
      if (!data.tabs || data.tabs.length === 0) {
        return router.createUrlTree(['/dashboard']);
      }

      const defaultTabId = data.tabs[0].id;
      return router.createUrlTree(['/dashboard', dashboardId, defaultTabId]);
    }),
    catchError((error) => {
      console.error('Dashboard load failed', error);
      return of(router.createUrlTree(['/dashboard']));
    }),
  );
};
