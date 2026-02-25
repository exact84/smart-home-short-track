import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardListState } from './dashboard.reducers';

export const selectDashboardListState = createFeatureSelector<DashboardListState>('dashboardList');

export const selectDashboardList = createSelector(
  selectDashboardListState,
  (state) => state.dashboardList,
);

export const selectDashboardListLoading = createSelector(
  selectDashboardListState,
  (state) => state.loading,
);

export const selectDashboardListError = createSelector(
  selectDashboardListState,
  (state) => state.error,
);

export const selectAddDashboardError = createSelector(
  selectDashboardListState,
  (state) => state.createError,
);

export const selectLastDeletedDashboard = createSelector(
  selectDashboardListState,
  (state) => state.lastDeletedDashboard,
);
