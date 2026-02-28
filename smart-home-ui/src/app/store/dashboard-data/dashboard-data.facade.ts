import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addCard,
  addTab,
  loadDashboardData,
  removeCard,
  removeTab,
  reorderCard,
  reorderTab,
  saveDashboardData,
  updateCard,
  updateTabTitle,
} from './dashboard-data.actions';
import { generateId } from '../../utils/generate-id';
import { CardInfo } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private store = inject(Store);

  public editMode = signal(false);
  public newTabMode = signal(false);

  public discardChanges(dashboardId: string, tabId: string): void {
    this.editMode.set(false);
    this.newTabMode.set(false);
    this.store.dispatch(loadDashboardData({ dashboardId, tabId }));
  }

  public updateDashboard(dashboardId: string): void {
    this.newTabMode.set(false);
    this.store.dispatch(saveDashboardData({ dashboardId }));
  }

  public toggleEditMode(): void {
    this.editMode.update((v) => !v);
  }

  public addTab(title: string): void {
    this.newTabMode.set(true);
    const tabId = generateId(title);
    this.store.dispatch(addTab({ tabId, title }));
  }

  public removeTab(dashboardId: string, tabId: string): void {
    this.store.dispatch(removeTab({ dashboardId, tabId }));
  }

  public reorderTab(tabId: string, direction: 'left' | 'right'): void {
    this.store.dispatch(reorderTab({ tabId, direction }));
  }

  public updateTabTitle(tabId: string, title: string): void {
    this.store.dispatch(updateTabTitle({ tabId, title }));
  }

  public addCard(tabId: string, card: CardInfo): void {
    console.log('Facade addCard:', tabId, card);
    this.store.dispatch(addCard({ tabId, card }));
  }

  public removeCard(tabId: string, cardId: string): void {
    console.log('Facade removeCard:', tabId, cardId);
    this.store.dispatch(removeCard({ tabId, cardId }));
  }

  public updateCard(tabId: string, card: CardInfo): void {
    console.log('Facade updateCard:', tabId, card);
    this.store.dispatch(updateCard({ tabId, card }));
  }

  public reorderCard(tabId: string, cardId: string, direction: 'left' | 'right'): void {
    console.log('Facade reorderCard:', tabId, cardId, direction);
    this.store.dispatch(reorderCard({ tabId, cardId, direction }));
  }
}
