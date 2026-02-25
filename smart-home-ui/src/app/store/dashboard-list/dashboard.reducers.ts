import { createReducer, on } from '@ngrx/store';
import {
  createDashboard,
  createDashboardFailed,
  createDashboardSuccess,
  dashboardListLoaded,
  dashboardListLoadFailed,
  loadDashboardList,
} from './dashboard.actions';
import { DashboardListItem } from '../../models';
import { resetCreateDashboardError } from '../dashboard-data/dashboard-data.actions';

export interface DashboardListState {
  dashboardList: DashboardListItem[];
  loading: boolean;
  error: string | undefined;
  createError: string | undefined;
}

export const initialState: DashboardListState = {
  dashboardList: [],
  loading: true,
  error: undefined,
  createError: undefined,
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

  on(createDashboard, (state, { dashboardItem }) => {
    return {
      ...state,
      dashboardList: [...state.dashboardList, dashboardItem],
      createError: undefined,
    };
  }),

  on(createDashboardSuccess, (state) => {
    return state;
  }),

  on(createDashboardFailed, (state, { dashboardId, error }) => {
    return {
      ...state,
      dashboardList: state.dashboardList.filter((item) => item.id !== dashboardId),
      createError: error,
    };
  }),

  on(resetCreateDashboardError, (state) => ({
    ...state,
    createError: undefined,
  })),
);
