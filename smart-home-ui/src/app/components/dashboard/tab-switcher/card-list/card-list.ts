import { Component, inject, input } from '@angular/core';
import { CardInfo, DeviceItem } from '../../../../models';
import { Card } from './card/card';
import { HighlightDirective } from '../../../../directives/highlight';
import { DashboardFacade } from '../../../../store/dashboard-data/dashboard-data.facade';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialog } from './add-card-dialog/add-card-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-list',
  imports: [Card, HighlightDirective, MatButtonModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  public tabId = input<string>('');
  public cards = input<CardInfo[]>();
  protected readonly editMode = inject(DashboardFacade).editMode;
  private readonly dialog = inject(MatDialog);
  private facade = inject(DashboardFacade);

  protected openDialog(): void {
    const reference = this.dialog.open(AddCardDialog, {
      width: '500px',
    });
    reference.afterClosed().subscribe((layout) => {
      // можно тут создавать карточку
      this.facade.addCard(this.tabId() || '', {
        id: crypto.randomUUID(),
        title: 'New Card',
        layout,
        items: [],
      });
    });
  }

  protected hasActiveDevice(card: CardInfo): boolean {
    return card.items.some(
      (item): item is DeviceItem => item.type === 'device' && item.state === true,
    );
  }
}
