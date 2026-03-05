import { Component, inject, input, OnInit } from '@angular/core';
import { CardInfo, DeviceItem } from '../../../../models';
import { Card } from './card/card';
import { HighlightDirective } from '../../../../directives/highlight';
import { DashboardFacade } from '../../../../store/dashboard-data/dashboard-data.facade';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialog } from './add-card-dialog/add-card-dialog';
import { MatButtonModule } from '@angular/material/button';
import { ItemListFacade } from '../../../../store/item-list/item-list.facade';

@Component({
  selector: 'app-card-list',
  imports: [Card, HighlightDirective, MatButtonModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList implements OnInit {
  public tabId = input<string>('');
  public cards = input<CardInfo[]>();
  protected readonly editMode = inject(DashboardFacade).editMode;
  private readonly dialog = inject(MatDialog);
  private dashboardFacade = inject(DashboardFacade);
  private itemListFacade = inject(ItemListFacade);

  public ngOnInit(): void {
    this.itemListFacade.loadItemList();
  }

  protected openDialog(): void {
    const reference = this.dialog.open(AddCardDialog, {
      width: '500px',
    });
    reference.afterClosed().subscribe((layout) => {
      this.dashboardFacade.addCard(this.tabId() || '', {
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
