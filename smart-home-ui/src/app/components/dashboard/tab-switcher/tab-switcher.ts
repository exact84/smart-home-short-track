import { Component, input, computed, inject, untracked } from '@angular/core';
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
  private currentTabIndex = computed(() => this.dataStore.currentTabIndex());

  protected cards = computed<CardInfo[] | undefined>(() => {
    const tabs = this.tabs();
    return tabs && tabs.length > 0
      ? untracked(() => tabs[this.currentTabIndex()].cards)
      : undefined;
  });

  selectTab(tabIndex: number) {
    if (tabIndex === this.currentTabIndex()) return;
    this.dataStore.currentTabIndex.set(tabIndex);
    this.dataStore.currentTabId.set(this.tabs()![tabIndex].id);
    this.router.navigate(
      [`/dashboard/${this.dataStore.currentDashboardId()}/${this.dataStore.currentTabId()}`],
      {
        replaceUrl: true,
      },
    );
  }
}
