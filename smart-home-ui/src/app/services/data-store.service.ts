import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardData, Tab } from '../models';
import { DashboardListItem } from '../models/dashboard-list.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  http = inject(HttpClient);
  router = inject(Router);
  private readonly _tabs = signal<Tab[]>([]);
  readonly tabs = this._tabs.asReadonly();
  readonly dashboardList = signal<DashboardListItem[]>([]);
  public currentDashboardId = signal<string | undefined>(undefined);
  public currentTabId = signal<string | undefined>(undefined);
  public currentTabIndex = signal(0);

  getDashboardList() {
    return this.http.get<DashboardListItem[]>(`dashboards`);
  }

  createDashboard(dashboard: DashboardListItem) {
    return this.http.post<DashboardListItem>(`dashboards`, dashboard);
  }

  deleteDashboard(dashboardId: string) {
    return this.http.delete(`dashboards/${dashboardId}`);
  }

  getDashboardData(dashboardId: string) {
    return this.http.get<DashboardData>(`dashboards/${dashboardId}`);
  }

  saveDashboardData(dashboardId: string, dashboard: DashboardData) {
    return this.http.put<DashboardData>(`dashboards/${dashboardId}`, dashboard);
  }

  public toggleDevice(cardId: string, deviceLabel: string, state?: boolean) {
    this._tabs.update((tabs) =>
      tabs.map((tab) => ({
        ...tab,
        cards: tab.cards.map((card) => ({
          ...card,
          items: card.items.map((item) => {
            const isTargetDevice =
              item.type === 'device' && item.label === deviceLabel && card.id === cardId;
            if (!isTargetDevice) return item;
            return state === undefined ? { ...item, state: !item.state } : { ...item, state };
          }),
        })),
      })),
    );
  }
}
