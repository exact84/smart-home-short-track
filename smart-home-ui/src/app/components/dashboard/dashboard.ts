import { Component, inject } from '@angular/core';
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
    this.route.firstChild!.paramMap.pipe(
      map((parameters) => {
        console.log('dashboardId from signal:', parameters.get('dashboardId'));
        return parameters.get('dashboardId');
      }),
    ),
  );

  constructor() {
    if (!this.dashboardId()) {
      return;
    }
    this.dataStore.getDashboardData(this.dashboardId()!);
    // effect(() => {
    //   const id = this.dashboardId();
    //   if (id) {
    //     console.log(`Сменился роут, dashboardId: ${id}`);
    //   }
    // });
  }
}
