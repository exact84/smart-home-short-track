import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemListState } from './item-list.reducers';

export const selectItemListState = createFeatureSelector<ItemListState>('itemList');

export const selectAllItemList = createSelector(selectItemListState, (state) => state.itemList);

export const selectItemListError = createSelector(selectItemListState, (state) => state.error);
