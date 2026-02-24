import { createAction, props } from '@ngrx/store';
import { DashboardData } from '../../models';

export const loadDashboardData = createAction(
  '[DashboardData] Load Dashboard Data',
  props<{ dashboardId: string }>(),
);

export const dashboardDataLoaded = createAction(
  '[DashboardData] Dashboard Data Load Success',
  props<{ dashboard: DashboardData; dashboardId: string }>(),
);

export const dashboardDataLoadFailed = createAction(
  '[DashboardData] Dashboard Data Load Failed',
  props<{ error: string }>(),
);
