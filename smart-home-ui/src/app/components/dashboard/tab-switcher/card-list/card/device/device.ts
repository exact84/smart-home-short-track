import { Component, input, DoCheck, signal } from '@angular/core';
import { CardLayout, DeviceItem } from '../../../../../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device implements DoCheck {
  public item = input<DeviceItem>();
  public layout = input<CardLayout>();
  cardLayout = CardLayout;
  protected isActive = signal(false);
  // protected isActive = computed(() => {
  //   console.log('recompute isActive', this.item()?.state);
  //   return this.item()?.state ?? false;
  // });

  toggleDevice() {
    if (!this.item) return;
    // this.item.update((item) => {item.state = !item.state; return item;});
    console.log('Переключить устройство:', this.item()?.label, this.cardLayout);
    this.isActive.update((value) => !value);
  }

  ngDoCheck() {
    console.log('onDoCheck');
  }
}
