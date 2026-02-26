import { createReducer, on } from '@ngrx/store';
import { DashboardData } from '../../models';
import {
  addTab,
  dashboardDataLoaded,
  dashboardDataLoadFailed,
  loadDashboardData,
  removeTab,
  reorderTab,
  saveDashboardData,
  saveDashboardDataFailure,
  saveDashboardDataSuccess,
  updateTabTitle,
} from './dashboard-data.actions';

export interface DashboardDataState {
  dashboard?: DashboardData;
  currentTabId?: string;
  loading: boolean;
  error?: string;
}

const initialState: DashboardDataState = {
  dashboard: undefined,
  currentTabId: undefined,
  loading: false,
  error: undefined,
};

export const dashboardDataReducer = createReducer(
  initialState,
  on(loadDashboardData, (state) => {
    return {
      ...state,
      loading: true,
      error: undefined,
    };
  }),

  on(dashboardDataLoaded, (state, { dashboard }) => {
    return {
      ...state,
      dashboard,
      loading: false,
      error: undefined,
    };
  }),

  on(dashboardDataLoadFailed, (state, { error }) => {
    console.log('from reducer:', error);
    return {
      ...state,
      loading: false,
      error,
    };
  }),

  on(addTab, (state, { title, tabId }) => {
    const tabs = [...(state.dashboard?.tabs ?? []), { id: tabId, title, cards: [] }];

    return {
      ...state,
      dashboard: state.dashboard ? { ...state.dashboard, tabs } : { tabs },
      currentTabId: tabId,
    };
  }),

  on(removeTab, (state, { tabId }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard!.tabs.filter((tab) => tab.id !== tabId),
    },
    currentTabId: undefined,
  })),

  on(reorderTab, (state, { tabId, direction }) => {
    const tabs = [...state.dashboard!.tabs];
    const index = tabs.findIndex((t) => t.id === tabId);

    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tabs.length) return state;

    [tabs[index], tabs[newIndex]] = [tabs[newIndex], tabs[index]];

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs,
      },
    };
  }),

  on(updateTabTitle, (state, { tabId, title }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard!.tabs.map((tab) => (tab.id === tabId ? { ...tab, title } : tab)),
    },
  })),

  on(saveDashboardData, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(saveDashboardDataSuccess, (state) => ({
    ...state,
    loading: false,
    error: undefined,
  })),

  on(saveDashboardDataFailure, (state, { error }) => {
    console.log('from reducer:', error);
    return {
      ...state,
      loading: false,
      error,
    };
  }),
);
