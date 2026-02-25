import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataStoreService } from '../../services/data-store.service';
import {
  dashboardDataLoaded,
  dashboardDataLoadFailed,
  loadDashboardData,
} from './dashboard-data.actions';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class DashboardDataEffects {
  private actions$ = inject(Actions);
  private storeService = inject(DataStoreService);
  private router = inject(Router);

  loadDashboardList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDashboardData),
      switchMap(({ dashboardId }) =>
        this.storeService.getDashboardData(dashboardId).pipe(
          map((dashboard) => {
            console.log('from effect:', dashboardId);
            return dashboardDataLoaded({ dashboard, dashboardId });
          }),
          catchError((error) => of(dashboardDataLoadFailed({ error }))),
        ),
      ),
    );
  });

  navigateAfterLoad$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dashboardDataLoaded),
        tap(({ dashboard, dashboardId }) => {
          let tabId = '';
          if (dashboard.tabs.length > 0) tabId = dashboard.tabs[0].id;
          this.router.navigate(['dashboard', dashboardId, tabId]);
        }),
      ),
    { dispatch: false },
  );
}
