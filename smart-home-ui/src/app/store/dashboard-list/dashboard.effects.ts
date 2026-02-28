import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataStoreService } from '../../services/data-store.service';
import {
  createDashboard,
  createDashboardFailed,
  createDashboardSuccess,
  dashboardListLoaded,
  dashboardListLoadFailed,
  deleteDashboard,
  deleteDashboardFailed,
  deleteDashboardSuccess,
  loadDashboardList,
} from './dashboard.actions';
import { switchMap, map, catchError, of, mergeMap, withLatestFrom } from 'rxjs';
import { extractHttpErrorMessage } from '../../utils/http-error.utility';
import { selectLastDeletedDashboard } from './dashboard.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private storeService = inject(DataStoreService);
  private store = inject(Store);

  private loadDashboardList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDashboardList),
      switchMap(() =>
        this.storeService.getDashboardList().pipe(
          map((dashboardList) => dashboardListLoaded({ dashboardList })),
          catchError((error) => of(dashboardListLoadFailed({ error }))),
        ),
      ),
    );
  });

  private createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDashboard),
      mergeMap(({ dashboardItem }) =>
        this.storeService.createDashboard(dashboardItem).pipe(
          map(() => createDashboardSuccess()),
          catchError((error) =>
            of(
              createDashboardFailed({
                dashboardId: dashboardItem.id,
                error: extractHttpErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  private deleteDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDashboard),
      withLatestFrom(this.store.select(selectLastDeletedDashboard)),
      mergeMap(([{ dashboardId }, dashboard]) => {
        return this.storeService.deleteDashboard(dashboardId).pipe(
          map(() => deleteDashboardSuccess()),
          catchError((error) => {
            return of(
              deleteDashboardFailed({
                dashboard: dashboard!,
                error: extractHttpErrorMessage(error),
              }),
            );
          }),
        );
      }),
    ),
  );
}
