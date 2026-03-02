import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, combineLatest, filter, map, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDashboardList,
  selectDashboardListLoading,
  selectDashboardListState,
} from '../store/dashboard-list/dashboard.selectors';
import { loadDashboardList } from '../store/dashboard-list/dashboard.actions';

export const dashboardFallbackGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const store = inject(Store);

  const dashboardId = route.paramMap.get('dashboardId');
  const dashboardList = store.selectSignal(selectDashboardListState);

  if (dashboardList().dashboardList.length === 0) store.dispatch(loadDashboardList());

  return combineLatest([
    store.select(selectDashboardList),
    store.select(selectDashboardListLoading),
  ]).pipe(
    filter(([, loading]) => !loading),
    take(1),
    map(([list]) => {
      if (list.length === 0 || list.some((d) => d.id === dashboardId)) return true;
      return router.createUrlTree(['/dashboard', list[0].id]);
    }),
    catchError((error) => {
      console.error('Dashboard load failed', error);
      return of(true);
    }),
  );
};
