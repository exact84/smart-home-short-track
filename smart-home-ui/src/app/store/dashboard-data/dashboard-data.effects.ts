import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataStoreService } from '../../services/data-store.service';
import {
  dashboardDataLoaded,
  dashboardDataLoadFailed,
  loadDashboardData,
  removeTab,
  saveDashboardData,
  saveDashboardDataFailure,
  saveDashboardDataSuccess,
} from './dashboard-data.actions';
import { switchMap, map, catchError, of, tap, withLatestFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDashboardDataState } from './dashboard-data.selectors';
import { DashboardFacade } from './dashboard-data.facade';

@Injectable()
export class DashboardDataEffects {
  private actions$ = inject(Actions);
  private storeService = inject(DataStoreService);
  private router = inject(Router);
  private store = inject(Store);
  private facade = inject(DashboardFacade);

  private dashboardData = this.store.selectSignal(selectDashboardDataState);

  private loadDashboardList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDashboardData),
      switchMap(({ dashboardId, tabId }) =>
        this.storeService.getDashboardData(dashboardId).pipe(
          map((dashboard) => {
            console.log('from effect:', dashboardId, tabId);
            return dashboardDataLoaded({ dashboard, dashboardId, tabId });
          }),
          catchError((error) => of(dashboardDataLoadFailed({ error }))),
        ),
      ),
    );
  });

  private navigateAfterLoad$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dashboardDataLoaded),
        tap(({ dashboard, dashboardId, tabId }) => {
          console.log('navigation effect:', dashboard);
          if (dashboard.tabs.length > 0 && (!tabId || !dashboard.tabs.some((t) => t.id === tabId)))
            tabId = dashboard.tabs[0].id;
          this.router.navigate(['dashboard', dashboardId, tabId]);
        }),
      ),
    { dispatch: false },
  );

  private removeTab$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeTab),
        withLatestFrom(this.store.select(selectDashboardDataState)),
        tap(([{ dashboardId, tabId }, dashboard]) => {
          const remaining = dashboard?.tabs.filter((t) => t.id !== tabId) || [];
          let newTabId = '';
          if (remaining.length > 0) newTabId = remaining[0].id;
          console.log('removeTab effect:', dashboardId, newTabId);
          this.router.navigate(['dashboard', dashboardId, newTabId], {
            replaceUrl: true,
          });
        }),
      ),
    { dispatch: false },
  );

  private saveDashboardData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveDashboardData),
      switchMap(({ dashboardId }) =>
        this.storeService.saveDashboardData(dashboardId, this.dashboardData()!).pipe(
          map(() => saveDashboardDataSuccess()),
          catchError((error) => of(saveDashboardDataFailure({ error }))),
        ),
      ),
    );
  });

  private saveDashboardDataSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveDashboardDataSuccess),
        tap(() => {
          console.log('saveDashboardDataSuccess effect');
          this.facade.toggleEditMode();
        }),
      ),
    { dispatch: false },
  );
}
