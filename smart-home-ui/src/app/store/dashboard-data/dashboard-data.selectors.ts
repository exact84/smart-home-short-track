import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardDataState } from './dashboard-data.reducers';

export const selectDashboardData = createFeatureSelector<DashboardDataState>('dashboardData');

export const selectDashboardDataState = createSelector(
  selectDashboardData,
  (state) => state.dashboard,
);

export const selectDashboardDataLoading = createSelector(
  selectDashboardData,
  (state) => state.loading,
);

export const selectDashboardDataError = createSelector(selectDashboardData, (state) => state.error);

export const selectTabData = (tabId: string) =>
  createSelector(
    selectDashboardData,
    (state) => [...(state.dashboard?.tabs ?? [])].find((tab) => tab.id === tabId)?.cards ?? [],
  );
