import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, combineLatest, filter, map, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDashboardList, selectDashboardListLoading } from '../store/dashboard.selectors';
import { loadDashboardList } from '../store/dashboard.actions';

export const dashboardFallbackGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const store = inject(Store);

  const dashboardId = route.paramMap.get('dashboardId');

  store.dispatch(loadDashboardList());

  return combineLatest([
    store.select(selectDashboardList),
    store.select(selectDashboardListLoading),
  ]).pipe(
    filter(([, loading]) => !loading),
    take(1),
    map(([list]) => {
      if (list.length === 0 || list.some((d) => d.id === dashboardId)) return true;

      // console.log('dashboard не найден', list[0].id);
      return router.createUrlTree(['/dashboard', list[0].id]);
    }),
    catchError((error) => {
      console.error('Dashboard load failed', error);
      return of(true);
    }),
  );
};
