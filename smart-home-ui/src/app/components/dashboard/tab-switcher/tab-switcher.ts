import { Component, input, computed, signal } from '@angular/core';
import { CardList } from './card-list/card-list';
import { CardInfo, Tab } from '../../../models';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  tabs = input<Tab[]>();
  currentTabId = signal(0);

  protected cards = computed<CardInfo[] | undefined>(() => {
    const tabs = this.tabs();
    return tabs && tabs.length > 0 ? tabs[this.currentTabId()].cards : undefined;
  });

  selectTab(tabIndex: number) {
    this.currentTabId.set(tabIndex);
  }
}
