import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardInfo, CardLayout, DeviceItem, SensorItem } from '../../../../../../models';
import { ItemListFacade } from '../../../../../../store/item-list/item-list.facade';
import { Store } from '@ngrx/store';
import { selectItemListError } from '../../../../../../store/item-list/item-list.selectors';

@Component({
  selector: 'app-edit-card-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './edit-card-dialog.html',
  styleUrl: './edit-card-dialog.scss',
})
export class EditCardDialog implements OnInit {
  private readonly store = inject(Store);
  protected itemListFacade = inject(ItemListFacade);
  protected readonly CardLayout = CardLayout;
  public layouts = CardLayout;
  protected cardCopy: CardInfo;
  protected items: (SensorItem | DeviceItem)[] = [];
  protected data = inject<{ card: CardInfo }>(MAT_DIALOG_DATA);
  protected dialogRef = inject(MatDialogRef<EditCardDialog>);
  protected newItemId: string | undefined;
  protected itemListError = this.store.selectSignal(selectItemListError);

  public constructor() {
    this.cardCopy = {
      ...this.data.card,
      items: this.data.card.items.map((item) => ({ ...item })),
    };
  }

  public ngOnInit(): void {
    const allItems = this.itemListFacade.itemList();
    this.items =
      this.data.card.layout === CardLayout.Horizontal
        ? allItems.filter((item) => item.type !== 'device')
        : allItems;
  }

  protected addItem(): void {
    if (!this.newItemId) return;
    const entity = this.itemListFacade.itemList().find((item) => item.id === this.newItemId);
    if (entity) {
      this.cardCopy.items.push({ ...entity });
      this.newItemId = undefined;
    }
  }

  protected removeItem(index: number): void {
    this.cardCopy.items.splice(index, 1);
  }

  protected save(): void {
    this.cardCopy.title = this.cardCopy.title.slice(0, 50);
    this.dialogRef.close(this.cardCopy);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
