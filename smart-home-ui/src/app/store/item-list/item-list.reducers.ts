import { createReducer, on } from '@ngrx/store';
import { DeviceItem, SensorItem } from '../../models';
import {
  loadItemList,
  loadItemListSuccess,
  loadItemListFailure,
  toggleItemStateOptimistic,
  toggleItemStateRevert,
} from './item-list.actions';

export interface ItemListState {
  itemList: (DeviceItem | SensorItem)[];
  error: string | undefined;
}

export const initialState: ItemListState = {
  itemList: [],
  error: undefined,
};

export const itemListReducer = createReducer(
  initialState,

  on(loadItemList, (state) => ({
    ...state,
    error: undefined,
  })),

  on(loadItemListSuccess, (state, { itemList }) => ({
    ...state,
    itemList,
    error: undefined,
  })),

  on(loadItemListFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(toggleItemStateOptimistic, (state: ItemListState, { itemId, newState }) => ({
    ...state,
    itemList: state.itemList.map((item) =>
      item.id === itemId ? { ...item, state: newState } : item,
    ),
  })),

  on(toggleItemStateRevert, (state: ItemListState, { itemId, prevState }) => ({
    ...state,
    itemList: state.itemList.map((item) =>
      item.id === itemId ? { ...item, state: prevState } : item,
    ),
  })),
);
