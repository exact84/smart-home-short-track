import { Component, input, computed, inject } from '@angular/core';
import { CardList } from './card-list/card-list';
import { CardInfo, Tab } from '../../../models';
import { Router } from '@angular/router';
import { DataStoreService } from '../../../services/data-store.service';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  private router = inject(Router);
  private dataStore = inject(DataStoreService);
  tabs = input<Tab[]>();
  private currentTabId = computed(() => this.dataStore.currentTabId());

  protected cards = computed<CardInfo[] | undefined>(() => {
    console.log(
      'FROM CARDS, curentDashboardId:',
      this.dataStore.currentDashboardId(),
      'selectTab:',
      'currentTabId:',
      this.currentTabId(),
    );
    const tabs = this.tabs();
    return tabs && tabs.length > 0 ? tabs[this.currentTabId()].cards : undefined;
  });

  selectTab(tabIndex: number) {
    this.dataStore.currentTabId.set(tabIndex);
    console.log('curentDashboardId:', this.dataStore.currentDashboardId(), 'selectTab:', tabIndex);
    // this.router.navigate(['dashboard', this.tabs()![tabIndex].id]);
  }
}
