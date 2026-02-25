import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataStoreService } from '../../services/data-store.service';
import {
  createDashboard,
  createDashboardFailed,
  createDashboardSuccess,
  dashboardListLoaded,
  dashboardListLoadFailed,
  loadDashboardList,
} from './dashboard.actions';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';
import { extractHttpErrorMessage } from '../../utils/http-error.utility';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private storeService = inject(DataStoreService);

  loadDashboardList$ = createEffect(() => {
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

  createDashboard$ = createEffect(() =>
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
}
