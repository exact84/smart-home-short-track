import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadItemList, toggleItemStateOptimistic } from './item-list.actions';
import { selectAllItemList, selectItemListError } from './item-list.selectors';

@Injectable({ providedIn: 'root' })
export class ItemListFacade {
  private readonly store = inject(Store);

  public readonly itemList = this.store.selectSignal(selectAllItemList);
  public readonly error = this.store.selectSignal(selectItemListError);

  public loadItemList(): void {
    this.store.dispatch(loadItemList());
  }

  public toggleItemState(itemId: string, newState: boolean): void {
    this.store.dispatch(toggleItemStateOptimistic({ itemId, newState }));
  }
}
