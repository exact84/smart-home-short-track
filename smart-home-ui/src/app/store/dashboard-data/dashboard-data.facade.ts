import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addTab,
  loadDashboardData,
  removeTab,
  reorderTab,
  saveDashboardData,
  updateTabTitle,
} from './dashboard-data.actions';
import { generateId } from '../../utils/generate-id';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private store = inject(Store);

  public editMode = signal(false);
  public newTabMode = signal(false);

  discardChanges(dashboardId: string, tabId: string) {
    this.editMode.set(false);
    this.newTabMode.set(false);
    this.store.dispatch(loadDashboardData({ dashboardId, tabId }));
  }

  updateDashboard(dashboardId: string) {
    this.newTabMode.set(false);
    this.store.dispatch(saveDashboardData({ dashboardId }));
  }

  toggleEditMode() {
    this.editMode.update((v) => !v);
  }

  addTab(title: string) {
    this.newTabMode.set(true);
    const tabId = generateId(title);
    this.store.dispatch(addTab({ tabId, title }));
  }

  removeTab(dashboardId: string, tabId: string) {
    this.store.dispatch(removeTab({ dashboardId, tabId }));
  }

  reorderTab(tabId: string, direction: 'left' | 'right') {
    this.store.dispatch(reorderTab({ tabId, direction }));
  }

  updateTabTitle(tabId: string, title: string) {
    this.store.dispatch(updateTabTitle({ tabId, title }));
  }
}
