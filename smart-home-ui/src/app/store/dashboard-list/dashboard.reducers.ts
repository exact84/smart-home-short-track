import { createReducer, on } from '@ngrx/store';
import {
  dashboardListLoaded,
  dashboardListLoadFailed,
  loadDashboardList,
} from './dashboard.actions';
import { DashboardList } from '../../models';

export interface DashboardListState {
  dashboardList: DashboardList[];
  loading: boolean;
  error: string | undefined;
}

export const initialState: DashboardListState = {
  dashboardList: [],
  loading: true,
  error: undefined,
};

export const dashboardListReducer = createReducer(
  initialState,

  on(loadDashboardList, (state) => {
    return {
      ...state,
      loading: true,
      error: undefined,
    };
  }),

  on(dashboardListLoaded, (state, { dashboardList }) => {
    return {
      ...state,
      dashboardList,
      loading: false,
      error: undefined,
    };
  }),

  on(dashboardListLoadFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
);
