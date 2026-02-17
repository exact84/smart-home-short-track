import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataStoreService } from '../../../services/data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  router = inject(Router);
  dataStore = inject(DataStoreService);
  public dashboardList = this.dataStore.dashboardList;

  constructor() {
    this.dataStore.getDashboardList();
  }
  onDashboardClick(dashboardId: string) {
    if (dashboardId === this.dataStore.currentDashboardId()) return;
    this.dataStore.getDashboardData(dashboardId);
    this.dataStore.currentTabIndex.set(0);
    this.router.navigate(['dashboard', dashboardId]);
  }
}
