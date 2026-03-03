import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataStoreService } from '../../services/data-store.service';
import {
  loadItemList,
  loadItemListFailure,
  loadItemListSuccess,
  toggleItemStateOptimistic,
  toggleItemStateRevert,
  toggleItemStateSuccess,
} from './item-list.actions';

@Injectable()
export class ItemListEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DataStoreService);

  public loadItemList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItemList),
      mergeMap(() =>
        this.dashboardService.getAllItemList().pipe(
          map((itemList) => loadItemListSuccess({ itemList })),
          catchError((error) => of(loadItemListFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  public toggleItemState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleItemStateOptimistic),
      mergeMap(({ itemId, newState }) =>
        this.dashboardService.updateItemState(itemId, newState).pipe(
          map(() => toggleItemStateSuccess({ itemId, newState })),
          catchError(() => {
            return of(
              toggleItemStateRevert({
                itemId,
                prevState: !newState,
              }),
            );
          }),
        ),
      ),
    ),
  );
}
