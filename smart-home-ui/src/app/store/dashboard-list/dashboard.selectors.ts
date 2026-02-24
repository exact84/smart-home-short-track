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
