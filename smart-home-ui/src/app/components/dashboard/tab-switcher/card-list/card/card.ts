import { Component, computed, inject, input } from '@angular/core';
import { CardInfo, CardLayout } from '../../../../../models';
import { Device } from './device/device';
import { Sensor } from './sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DataStoreService } from '../../../../../services/data-store.service';
import { DashboardFacade } from '../../../../../store/dashboard-data/dashboard-data.facade';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { EditCardDialog } from './edit-card-dialog/edit-card-dialog';

@Component({
  selector: 'app-card',
  imports: [Device, Sensor, MatSlideToggleModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  public tabId = input<string>('');
  public card = input<CardInfo>();

  private readonly facade = inject(DashboardFacade);
  public editMode = this.facade.editMode;
  private dialog: MatDialog = inject(MatDialog);
  private overlay: Overlay = inject(Overlay);
  public error = '';

  public layouts = CardLayout;
  public sensors = computed(
    () => this.card()?.items?.filter((item) => item.type === 'sensor') ?? [],
  );
  public devices = computed(
    () => this.card()?.items?.filter((item) => item.type === 'device') ?? [],
  );
  public hasToggle = computed(() => this.devices().length > 1);
  protected readonly isMasterToggleOn = computed(() =>
    this.devices().some((device) => device.state),
  );
  private readonly dataStore = inject(DataStoreService);

  public status(): string {
    return this.devices()[0]?.state ? 'On' : 'Off';
  }

  protected toggleAll(): void {
    for (const device of this.devices()) {
      this.dataStore.toggleDevice(
        this.card()?.id ?? '',
        device.label ?? '',
        !this.isMasterToggleOn(),
      );
    }
  }

  protected onMoveCardClick(cardId: string, direction: 'left' | 'right'): void {
    this.facade.reorderCard(this.tabId(), cardId, direction);
  }

  protected onEditCardClick(): void {
    this.error = '';
    const reference = this.dialog.open(EditCardDialog, {
      width: '400px',
      panelClass: 'dialog-container',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: { card: this.card },
    });

    reference.afterClosed().subscribe((updatedCard: CardInfo | undefined) => {
      if (updatedCard) {
        this.facade.updateCard(this.tabId(), updatedCard);
        // this.cardSignal.set(updatedCard);
      }
    });
  }

  protected onDeleteCardClick(cardId: string): void {
    this.facade.removeCard(this.tabId(), cardId);
  }
}
