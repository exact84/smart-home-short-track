import { Component, input, inject, computed } from '@angular/core';
import { CardLayout, DeviceItem } from '../../../../../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DataStoreService } from '../../../../../../services/data-store.service';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  private dataStore = inject(DataStoreService);
  public item = input<DeviceItem>();
  public cardId = input<string>();
  public layout = input<CardLayout>();
  protected cardLayout = CardLayout;
  protected isActive = computed(() => {
    return this.item()?.state ?? false;
  });

  protected toggleDevice(): void {
    if (!this.item) return;
    this.dataStore.toggleDevice(this.cardId() ?? '', this.item()?.label ?? '');
  }
}
