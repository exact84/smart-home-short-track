import { createAction, props } from '@ngrx/store';
import { DashboardData } from '../../models';

export const loadDashboardData = createAction(
  '[DashboardData] Load Dashboard Data',
  props<{ dashboardId: string; tabId: string }>(),
);

export const dashboardDataLoaded = createAction(
  '[DashboardData] Dashboard Data Load Success',
  props<{ dashboard: DashboardData; dashboardId: string; tabId: string }>(),
);

export const dashboardDataLoadFailed = createAction(
  '[DashboardData] Dashboard Data Load Failed',
  props<{ error: string }>(),
);

export const reorderTab = createAction(
  '[DashboardData] Reorder Tab',
  props<{ tabId: string; direction: 'left' | 'right' }>(),
);

export const addTab = createAction(
  '[DashboardData] Add Tab',
  props<{ tabId: string; title: string }>(),
);

export const removeTab = createAction(
  '[DashboardData] Remove Tab',
  props<{ dashboardId: string; tabId: string }>(),
);

export const updateTabTitle = createAction(
  '[DashboardData] Update Tab Title',
  props<{ tabId: string; title: string }>(),
);

export const saveDashboardData = createAction(
  '[Dashboard] Save Dashboard Data',
  props<{ dashboardId: string }>(),
);

export const saveDashboardDataSuccess = createAction('[Dashboard] Save Dashboard Data Success');

export const saveDashboardDataFailure = createAction(
  '[Dashboard] Save Dashboard Data Failure',
  props<{ error: string }>(),
);
