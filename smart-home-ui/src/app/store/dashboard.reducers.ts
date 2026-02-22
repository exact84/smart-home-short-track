import { createReducer, on } from '@ngrx/store';
import {
  dashboardListLoaded,
  dashboardListLoadFailed,
  initialState,
  loadDashboardList,
} from './dashboard.actions';

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
