import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardListState } from './dashboard.actions';

export const selectDashboardListState = createFeatureSelector<DashboardListState>('dashboardList');

export const selectDashboardList = createSelector(
  selectDashboardListState,
  (state) => state.dashboardList,
);
