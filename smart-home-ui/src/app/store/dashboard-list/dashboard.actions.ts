import { createAction, props } from '@ngrx/store';
import { DashboardListItem } from '../../models';

export const loadDashboardList = createAction('[DashboardList] Load Dashboard List');

export const dashboardListLoaded = createAction(
  '[DashboardList] Dashboard List Load Success',
  props<{ dashboardList: DashboardListItem[] }>(),
);

export const dashboardListLoadFailed = createAction(
  '[DashboardList] Dashboard List Load Failed',
  props<{ error: string }>(),
);

export const createDashboard = createAction(
  '[DashboardList] Create Dashboard',
  props<{ dashboardItem: DashboardListItem }>(),
);

export const createDashboardSuccess = createAction('[DashboardList] Create Dashboard Success');

export const createDashboardFailed = createAction(
  '[DashboardList] Create Dashboard Failed',
  props<{ dashboardId: string; error: string }>(),
);

export const deleteDashboard = createAction(
  '[DashboardList] Delete Dashboard',
  props<{ dashboardId: string }>(),
);

export const deleteDashboardSuccess = createAction('[DashboardList] Delete Dashboard Success');

export const deleteDashboardFailed = createAction(
  '[DashboardList] Delete Dashboard Failed',
  props<{ dashboard: DashboardListItem; error: string }>(),
);

// export const selectDashboard = createAction(
//   '[DashboardList] Select Dashboard',
//   props<{ dashboardId: string }>(),
// );
