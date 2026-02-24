import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataStoreService } from '../../services/data-store.service';
import {
  dashboardListLoaded,
  dashboardListLoadFailed,
  loadDashboardList,
} from './dashboard.actions';
import { switchMap, map, catchError, of } from 'rxjs';

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
}
