import { Component, input, inject, computed } from '@angular/core';
import { CardLayout, DeviceItem } from '../../../../../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ItemListFacade } from '../../../../../../store/item-list/item-list.facade';
import { Store } from '@ngrx/store';
import { selectAllItemList } from '../../../../../../store/item-list/item-list.selectors';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  private readonly store = inject(Store);
  private readonly itemListFacade = inject(ItemListFacade);
  public itemId = input<string>();
  public cardId = input<string>();
  public layout = input<CardLayout>();
  protected cardLayout = CardLayout;
  protected item = computed(() => {
    const id = this.itemId();
    if (!id) return undefined;

    return this.store
      .selectSignal(selectAllItemList)()
      .find((item) => item.id === id) as DeviceItem | undefined;
  });
  protected isActive = computed(() => {
    return this.item()?.state ?? false;
  });

  protected toggleDevice(): void {
    if (!this.item()) return;
    this.itemListFacade.toggleItemState(this.item()?.id ?? '', !this.item()?.state);
  }
}
