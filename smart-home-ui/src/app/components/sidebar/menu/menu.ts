import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDashboardList } from '../../../store/dashboard-list/dashboard.selectors';
import { AsyncPipe } from '@angular/common';
import { loadDashboardData } from '../../../store/dashboard-data/dashboard-data.actions';
import { selectDashboardDataState } from '../../../store/dashboard-data/dashboard-data.selectors';
import { Tab } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, filter } from 'rxjs';
import { AddDashboard } from './add-dashboard/add-dashboard';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, AsyncPipe, AddDashboard],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  public dashboardList$ = this.store.select(selectDashboardList);
  public loading$ = this.store.select((state) => state.dashboardList.loading);
  public error$ = this.store.select((state) => state.dashboardList.error);
  private tabs: Tab[] = [];
  private dashboardData = toSignal(this.store.select(selectDashboardDataState));

  private currentDashboardId = toSignal(
    this.route.children[0].paramMap.pipe(
      map((parameters) => parameters.get('dashboardId')),
      filter((id) => id !== null),
    ),
  );

  protected onDashboardClick(dashboardId: string): void {
    if (dashboardId === this.currentDashboardId()) return;

    let tabId = '';
    if (this.tabs.length > 0) tabId = this.dashboardData()?.tabs[0].id || '';
    this.store.dispatch(loadDashboardData({ dashboardId, tabId }));
  }
}
