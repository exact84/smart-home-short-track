import { createReducer, on } from '@ngrx/store';
import {
  createDashboard,
  createDashboardFailed,
  createDashboardSuccess,
  dashboardListLoaded,
  dashboardListLoadFailed,
  deleteDashboard,
  deleteDashboardFailed,
  deleteDashboardSuccess,
  loadDashboardList,
  resetCreateDashboardError,
} from './dashboard.actions';
import { DashboardListItem } from '../../models';
// import { resetCreateDashboardError } from '../dashboard-data/dashboard-data.actions';

export interface DashboardListState {
  dashboardList: DashboardListItem[];
  loading: boolean;
  error: string | undefined;
  createError: string | undefined;
  lastDeletedDashboard: DashboardListItem | undefined;
}

export const initialState: DashboardListState = {
  dashboardList: [],
  loading: true,
  error: undefined,
  createError: undefined,
  lastDeletedDashboard: undefined,
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

  on(deleteDashboard, (state, { dashboardId }) => {
    const dashboard = state.dashboardList.find((d) => d.id === dashboardId);
    return {
      ...state,
      dashboardList: state.dashboardList.filter((item) => item.id !== dashboardId),
      lastDeletedDashboard: dashboard,
      error: undefined,
    };
  }),

  on(deleteDashboardSuccess, (state) => {
    return {
      ...state,
      lastDeletedDashboard: undefined,
    };
  }),

  on(deleteDashboardFailed, (state, { dashboard, error }) => {
    return {
      ...state,
      dashboardList: [...state.dashboardList, dashboard],
      lastDeletedDashboard: undefined,
      error,
    };
  }),
);
