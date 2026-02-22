import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardData, Tab } from '../models';
import { DashboardList } from '../models/dashboard-list.model';
import { catchError, EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  http = inject(HttpClient);
  router = inject(Router);
  private readonly _tabs = signal<Tab[]>([]);
  readonly tabs = this._tabs.asReadonly();
  readonly dashboardList = signal<DashboardList[]>([]);
  public currentDashboardId = signal<string | undefined>(undefined);
  public currentTabId = signal<string | undefined>(undefined);
  public currentTabIndex = signal(0);

  // getDashboardList() {
  //   this.http.get<DashboardList[]>(`dashboards`).subscribe((response) => {
  //     this.dashboardList.set(response);
  //     if (response.length > 0) this.currentDashboardId.set(response[0].id);
  //   });
  // }

  getDashboardList() {
    return this.http.get<DashboardList[]>(`dashboards`);
  }

  createDashboard(dashboard: DashboardList) {
    return this.http.post<DashboardList>(`dashboards`, dashboard);
  }

  loadDashboard(dashboardId: string) {
    return this.http.get<DashboardData>(`dashboards/${dashboardId}`);
  }

  getDashboardData(dashboardId: string, tabId?: string) {
    this.currentDashboardId.set(dashboardId);

    this.http
      .get<DashboardData>(`dashboards/${dashboardId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.getDashboardList();
            this.router.navigate(['/dashboard', this.dashboardList()[0].id]);
            return EMPTY;
          }
          return throwError(() => error);
        }),
      )
      .subscribe((response) => {
        const exists = response.tabs.some((tab) => tab.id === tabId);

        if (!exists)
          this.router.navigate([`/dashboard/${dashboardId}/${response.tabs[0].id}`], {
            replaceUrl: true,
          });
        this._tabs.set(response.tabs);
        this.currentTabId.set(exists ? tabId : response.tabs[0].id);
        this.currentTabIndex.set(response.tabs.findIndex((tab) => tab.id === this.currentTabId()));
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
