import { createReducer, on } from '@ngrx/store';
import { DashboardData } from '../../models';
import { initialState } from '../dashboard-list/dashboard.reducers';
import {
  dashboardDataLoaded,
  dashboardDataLoadFailed,
  loadDashboardData,
} from './dashboard-data.actions';

export interface DashboardDataState {
  dashboard?: DashboardData;
  loading: boolean;
  error?: string;
}

export const dashboardDataReducer = createReducer(
  initialState,
  on(loadDashboardData, (state) => {
    return {
      ...state,
      loading: true,
      error: undefined,
    };
  }),

  on(dashboardDataLoaded, (state, { dashboard }) => {
    // console.log('from reducer:', dashboard);
    return {
      ...state,
      dashboard,
      loading: false,
      error: undefined,
    };
  }),

  on(dashboardDataLoadFailed, (state, { error }) => {
    console.log('from reducer:', error);
    return {
      ...state,
      loading: false,
      error,
    };
  }),
);
