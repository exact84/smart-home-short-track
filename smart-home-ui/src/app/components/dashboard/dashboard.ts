import { Component, inject } from '@angular/core';
import { TabSwitcher } from './tab-switcher/tab-switcher';

import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tabs = inject(DataStoreService).tabs;
}
