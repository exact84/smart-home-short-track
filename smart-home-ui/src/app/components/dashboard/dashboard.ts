import { Component, inject } from '@angular/core';
import { TabSwitcher } from './tab-switcher/tab-switcher';

import { DataStore } from '../../services/data-store';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tabs = inject(DataStore).tabs;
}
