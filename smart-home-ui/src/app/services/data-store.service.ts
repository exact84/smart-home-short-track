import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardData, DeviceItem, SensorItem, Tab } from '../models';
import { DashboardListItem } from '../models/dashboard-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private readonly http = inject(HttpClient);
  private readonly _tabs = signal<Tab[]>([]);
  public currentDashboardId = signal<string | undefined>(undefined);
  public currentTabId = signal<string | undefined>(undefined);
  public currentTabIndex = signal(0);

  public getDashboardList(): Observable<DashboardListItem[]> {
    return this.http.get<DashboardListItem[]>(`dashboards`);
  }

  public createDashboard(dashboard: DashboardListItem): Observable<DashboardListItem> {
    return this.http.post<DashboardListItem>(`dashboards`, dashboard);
  }

  public deleteDashboard(dashboardId: string): Observable<void> {
    return this.http.delete<void>(`dashboards/${dashboardId}`);
  }

  public getDashboardData(dashboardId: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(`dashboards/${dashboardId}`);
  }

  public saveDashboardData(
    dashboardId: string,
    dashboard: DashboardData,
  ): Observable<DashboardData> {
    return this.http.put<DashboardData>(`dashboards/${dashboardId}`, dashboard);
  }

  public getAllItemList(): Observable<(DeviceItem | SensorItem)[]> {
    return this.http.get<(DeviceItem | SensorItem)[]>(`devices`);
  }

  public updateItemState(id: string, state: boolean): Observable<DeviceItem | SensorItem> {
    return this.http.patch<DeviceItem | SensorItem>(`devices/${id}`, {
      state,
    });
  }

  public toggleDevice(cardId: string, deviceLabel: string, state?: boolean): void {
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
