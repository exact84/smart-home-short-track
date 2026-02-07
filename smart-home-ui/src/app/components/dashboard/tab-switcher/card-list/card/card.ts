import { Component, computed, inject, input } from '@angular/core';
import { CardInfo, CardLayout } from '../../../../../models';
import { Device } from './device/device';
import { Sensor } from './sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DataStore } from '../../../../../services/data-store';

@Component({
  selector: 'app-card',
  imports: [Device, Sensor, MatSlideToggleModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  public card = input<CardInfo>();
  public layouts = CardLayout;
  public sensors = computed(
    () => this.card()?.items?.filter((item) => item.type === 'sensor') ?? [],
  );
  public devices = computed(
    () => this.card()?.items?.filter((item) => item.type === 'device') ?? [],
  );
  public hasToggle = computed(() => this.devices().length > 1);
  readonly isMasterToggleOn = computed(() => this.devices().some((device) => device.state));
  dataStore = inject(DataStore);

  public status() {
    return this.devices()[0]?.state ? 'On' : 'Off';
  }

  toggleAll() {
    for (const device of this.devices()) {
      this.dataStore.toggleDevice(
        this.card()?.id ?? '',
        device.label ?? '',
        !this.isMasterToggleOn(),
      );
    }
  }
}
