import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardData, Tab } from '../models';
import { DashboardList } from '../models/dashboard-list.model';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  http = inject(HttpClient);
  private readonly _tabs = signal<Tab[]>([]);
  readonly tabs = this._tabs.asReadonly();
  readonly dashboardList = signal<DashboardList[]>([]);
  public currentDashboardId = signal<string | undefined>(undefined);
  public currentTabId = signal(0);

  constructor() {
    // this.getDashboardList();
    // this.dashboardList.set(this.getDashboardList());
    // this.http
    //   .get<DashboardData>('/dashboards/electricity')
    //   .pipe(
    //     tap((response: DashboardData) => {
    //       console.log(response);
    //       this._tabs.set(response.tabs);
    //     }),
    //     catchError((error: HttpErrorResponse) => {
    //       console.log(error);
    //       return throwError(() => error);
    //     }),
    //   )
    //   .subscribe({
    //     error: (error) => {
    //       console.error('Subscription error:', error);
    //     },
    //   });
  }

  getDashboardList() {
    this.http.get<DashboardList[]>(`dashboards`).subscribe((response) => {
      this.dashboardList.set(response);
      this.currentDashboardId.set(response[0].id);
    });
  }

  createDashboard(dashboard: DashboardList) {
    return this.http.post<DashboardList>(`dashboards`, dashboard);
  }

  getDashboardData(dashboardId: string) {
    this.currentDashboardId.set(dashboardId);
    this.currentTabId.set(0);
    console.log(`getDashboardData: dashboards/${dashboardId}`);

    this.http.get<DashboardData>(`dashboards/${dashboardId}`).subscribe((response) => {
      this._tabs.set(response.tabs);
    });
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
