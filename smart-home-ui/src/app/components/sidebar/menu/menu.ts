import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadDashboardList, selectDashboard } from '../../../store/dashboard.actions';
import { selectDashboardList } from '../../../store/dashboard.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  router = inject(Router);
  store = inject(Store);
  public dashboardList$ = this.store.select(selectDashboardList);
  public loading$ = this.store.select((state) => state.dashboardList.loading);
  public error$ = this.store.select((state) => state.dashboardList.error);

  constructor() {
    this.store.dispatch(loadDashboardList());
  }
  onDashboardClick(dashboardId: string) {
    console.log(dashboardId);
    this.store.dispatch(selectDashboard({ dashboardId }));
    // if (dashboardId === this.dataStore.currentDashboardId()) return;
    // this.dataStore.getDashboardData(dashboardId);
    // this.dataStore.currentTabIndex.set(0);
    // this.router.navigate(['dashboard', dashboardId]);
  }
}
