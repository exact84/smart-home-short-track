import { Component, computed, inject, OnInit } from '@angular/core';
import { CardList } from './card-list/card-list';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDashboardDataState } from '../../../store/dashboard-data/dashboard-data.selectors';
import { map } from 'rxjs';
import { CardInfo } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { loadDashboardData } from '../../../store/dashboard-data/dashboard-data.actions';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  currentTabIndex = computed(() => {
    const tabs = this.tabs();
    const id = this.tabId();
    const index = tabs.findIndex((t) => t.id === id);
    return Math.max(index, 0);
  });

  dashboardId = toSignal(
    this.route.paramMap.pipe(map((parameters) => parameters.get('dashboardId'))),
  );

  tabId = toSignal(
    this.route.paramMap.pipe(
      map((parameters) => {
        return parameters.get('tabId');
      }),
    ),
  );

  dashboard = this.store.selectSignal(selectDashboardDataState);
  tabs = computed(() => this.dashboard()?.tabs ?? []);

  public cards = computed<CardInfo[]>(() => {
    const tabs = this.tabs();
    console.log('cards changed', this.currentTabIndex(), tabs[this.currentTabIndex()]);
    const tab = tabs[this.currentTabIndex()];
    return tab?.cards ?? [];
  });

  loading = computed(() => !this.dashboard());

  // private hasNavigated = signal(false);

  // private initNavigationEffect = effect(() => {
  //   console.log('effect run');
  //   const dashboard = this.dashboard();
  //   const tabId = untracked(() => this.tabId());
  //   const dashboardId = untracked(() => this.dashboardId());

  //   if (!dashboard) return;
  //   if (this.hasNavigated()) return;

  //   if (tabId && dashboard.tabs.some((tab) => tab.id === tabId)) return;

  //   const firstTabId = dashboard.tabs[0]?.id;
  //   if (!firstTabId || !dashboardId) return;

  //   console.log('before navigate:', dashboardId, firstTabId);
  //   this.hasNavigated.set(true);
  //   this.router.navigate(['/dashboard', dashboardId, firstTabId], {
  //     replaceUrl: true,
  //   });
  // });

  ngOnInit() {
    const id = this.dashboardId();
    if (id) this.store.dispatch(loadDashboardData({ dashboardId: id }));
    console.log('from tab-switcher', this.dashboard(), this.tabs());
  }

  selectTab(tabIndex: number) {
    if (tabIndex === this.currentTabIndex()) return;

    const id = this.dashboardId();
    if (!id) return;

    this.router.navigate(['/dashboard', this.dashboardId(), this.tabs()[tabIndex].id], {
      replaceUrl: true,
    });
  }
}
