import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardList } from './card-list/card-list';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDashboardDataState } from '../../../store/dashboard-data/dashboard-data.selectors';
import { map } from 'rxjs';
import { CardInfo } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { loadDashboardData } from '../../../store/dashboard-data/dashboard-data.actions';
import { MatIconModule } from '@angular/material/icon';
import { DashboardFacade } from '../../../store/dashboard-data/dashboard-data.facade';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../ui/confirm-dialog/confirm-dialog';
import { deleteDashboard } from '../../../store/dashboard-list/dashboard.actions';
import { selectDashboardList } from '../../../store/dashboard-list/dashboard.selectors';
import { emptyTabMessage } from '../../../constants/fallback-messges';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tab-switcher',
  imports: [CardList, MatIconModule, MatTabsModule, MatButtonModule],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  protected readonly facade = inject(DashboardFacade);

  public currentTabIndex = computed(() => {
    const tabs = this.tabs();
    const id = this.tabId();
    const index = tabs.findIndex((t) => t.id === id);
    return Math.max(index, 0);
  });

  private dashboardId = toSignal(
    this.route.paramMap.pipe(map((parameters) => parameters.get('dashboardId') || '')),
    { initialValue: '' },
  );

  protected tabId = toSignal(
    this.route.paramMap.pipe(map((parameters) => parameters.get('tabId') || '')),
    { initialValue: '' },
  );

  private dashboard = this.store.selectSignal(selectDashboardDataState);
  protected tabs = computed(() => this.dashboard()?.tabs ?? []);

  public cards = computed<CardInfo[]>(() => {
    const tabs = this.tabs();
    const tab = tabs[this.currentTabIndex()];
    return tab?.cards ?? [];
  });

  protected loading = computed(() => !this.dashboard());

  private dialog = inject(MatDialog);
  protected emptyTabMessage = emptyTabMessage;
  protected error = signal('');

  public ngOnInit(): void {
    const id = this.dashboardId();
    if (id) this.store.dispatch(loadDashboardData({ dashboardId: id, tabId: this.tabId() }));
  }

  protected onRemoveDashboardClick(): void {
    const confirmDialog = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: { message: `Delete "${this.dashboardId()}" dashboard?` },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      const id = this.dashboardId();
      if (result && id) {
        this.store.dispatch(deleteDashboard({ dashboardId: id }));
        this.router.navigate(['/dashboard']);
      }
    });
  }
  protected onEditDashboardClick(): void {
    this.facade.toggleEditMode();
  }

  protected selectTab(tabIndex: number): void {
    const id = this.dashboardId();
    if (!id) return;
    const tab = this.tabs()[tabIndex];
    if (tab) {
      this.router.navigate(['/dashboard', this.dashboardId(), tab.id]);
    } else {
      this.router.navigate(['/dashboard', this.dashboardId(), '']);
    }
  }

  protected getActiveDashboardTitle(): string {
    return (
      this.store
        .selectSignal(selectDashboardList)()
        .find((d) => d.id === this.dashboardId())?.title ?? this.dashboardId()
    );
  }

  protected onSaveEditDashboardClick(): void {
    this.facade.updateDashboard(this.dashboardId());
  }

  protected onDiscardEditDashboardClick(): void {
    this.facade.discardChanges(this.dashboardId(), this.tabId());
  }

  protected onReorderTabClick(tabId: string, direction: 'left' | 'right'): void {
    this.facade.reorderTab(tabId, direction);
  }

  protected onTabTitleChange(tabId: string, newTitle: string): void {
    this.error.set('');
    const result = this.facade.updateTabTitle(tabId, newTitle);
    if (!result) this.error.set('Tab title already exists');
  }

  protected onRemoveTabClick(tabId: string): void {
    this.facade.removeTab(this.dashboardId(), tabId);
  }

  protected onAddTabClick(): void {
    this.facade.addTab('newTab');
    this.selectTab(this.tabs().length - 1);
  }
}
