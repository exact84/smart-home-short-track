import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DashboardDataState } from './dashboard-data.reducers';
import { CardInfo } from '../../models';

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

export const selectTabData = (tabId: string): MemoizedSelector<DashboardDataState, CardInfo[]> =>
  createSelector(
    selectDashboardData,
    (state) => [...(state.dashboard?.tabs ?? [])].find((tab) => tab.id === tabId)?.cards ?? [],
  );
