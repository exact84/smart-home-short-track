import { Component, effect, inject, untracked } from '@angular/core';
import { TabSwitcher } from './tab-switcher/tab-switcher';

import { DataStoreService } from '../../services/data-store.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  dataStore = inject(DataStoreService);
  tabs = this.dataStore.tabs;
  private route = inject(ActivatedRoute);
  readonly dashboardId = toSignal(
    this.route.paramMap.pipe(map((parameters) => parameters.get('dashboardId'))),
  );

  readonly tabId = toSignal(this.route.paramMap.pipe(map((parameters) => parameters.get('tabId'))));

  constructor() {
    effect(() => {
      if (this.dataStore.dashboardList().length === 0 && !untracked(() => this.dashboardId())) {
        return;
      }

      const id = untracked(() => this.dashboardId()) || this.dataStore.dashboardList()[0].id;
      if (id) this.dataStore.getDashboardData(id, this.tabId()!);
    });
  }
}
