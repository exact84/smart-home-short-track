import { createReducer, on } from '@ngrx/store';
import { DashboardData } from '../../models';
import {
  addCard,
  addTab,
  dashboardDataLoaded,
  dashboardDataLoadFailed,
  loadDashboardData,
  removeCard,
  removeTab,
  reorderCard,
  reorderTab,
  saveDashboardData,
  saveDashboardDataFailure,
  saveDashboardDataSuccess,
  updateCard,
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
    return {
      ...state,
      loading: false,
      error,
    };
  }),

  on(addCard, (state, { tabId, card }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard!.tabs.map((tab) => {
        if (tab.id === tabId) {
          return {
            ...tab,
            cards: [...tab.cards, card],
          };
        }
        return tab;
      }),
    },
  })),

  on(removeCard, (state, { tabId, cardId }) => ({
    ...state,
    dashboard: {
      ...state.dashboard,
      tabs: state.dashboard!.tabs.map((tab) => {
        return tab.id === tabId
          ? { ...tab, cards: tab.cards.filter((card) => card.id !== cardId) }
          : tab;
      }),
    },
  })),

  on(reorderCard, (state, { tabId, cardId, direction }) => {
    const cards = [...state.dashboard!.tabs.find((tab) => tab.id === tabId)!.cards];
    const index = cards.findIndex((card) => card.id === cardId);

    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return state;

    [cards[index], cards[newIndex]] = [cards[newIndex], cards[index]];

    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        tabs: state.dashboard!.tabs.map((tab) => {
          return tab.id === tabId ? { ...tab, cards } : tab;
        }),
      },
    };
  }),

  on(updateCard, (state, { tabId, updatedCard }) => {
    const tabs = state.dashboard!.tabs.map((tab) =>
      tab.id === tabId
        ? {
            ...tab,
            cards: tab.cards.map((card) =>
              card.id === updatedCard.id ? { ...card, ...updatedCard } : card,
            ),
          }
        : tab,
    );
    return {
      ...state,
      dashboard: { ...state.dashboard!, tabs },
    };
  }),
);
