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
import { selectDashboardDataState } from './dashboard-data.selectors';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private store = inject(Store);

  public editMode = signal(false);
  private readonly dashboardData = this.store.selectSignal(selectDashboardDataState);

  public discardChanges(dashboardId: string, tabId: string): void {
    this.editMode.set(false);
    this.store.dispatch(loadDashboardData({ dashboardId, tabId }));
  }

  public updateDashboard(dashboardId: string): void {
    this.store.dispatch(saveDashboardData({ dashboardId }));
  }

  public toggleEditMode(): void {
    this.editMode.update((v) => !v);
  }

  public addTab(title: string): void {
    const tabId = generateId(title);
    this.store.dispatch(addTab({ tabId, title: tabId }));
  }

  public removeTab(dashboardId: string, tabId: string): void {
    this.store.dispatch(removeTab({ dashboardId, tabId }));
  }

  public reorderTab(tabId: string, direction: 'left' | 'right'): void {
    this.store.dispatch(reorderTab({ tabId, direction }));
  }

  public updateTabTitle(tabId: string, title: string): boolean {
    const tabs = this.dashboardData()?.tabs;

    const duplicate = tabs?.some((tab) => tab.id !== tabId && tab.title === title);

    if (duplicate) return false;

    this.store.dispatch(updateTabTitle({ tabId, title }));
    return true;
  }

  public addCard(tabId: string, card: CardInfo): void {
    this.store.dispatch(addCard({ tabId, card }));
  }

  public removeCard(tabId: string, cardId: string): void {
    this.store.dispatch(removeCard({ tabId, cardId }));
  }

  public updateCard(tabId: string, updatedCard: CardInfo): void {
    this.store.dispatch(updateCard({ tabId, updatedCard }));
  }

  public reorderCard(tabId: string, cardId: string, direction: 'left' | 'right'): void {
    this.store.dispatch(reorderCard({ tabId, cardId, direction }));
  }
}
