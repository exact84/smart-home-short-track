import { Component, computed, input } from '@angular/core';
import { CardInfo, CardLayout } from '../../../../../models';
import { Device } from './device/device';
import { Sensor } from './sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-card',
  imports: [Device, Sensor, MatSlideToggleModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  toggleAll() {
    throw new Error('Method not implemented.');
  }
  public card = input<CardInfo>();
  public layouts = CardLayout;
  public sensors = computed(
    () => this.card()?.items?.filter((item) => item.type === 'sensor') ?? [],
  );
  public devices = computed(
    () => this.card()?.items?.filter((item) => item.type === 'device') ?? [],
  );
  public hasToggle = computed(() => this.devices().length > 1);

  public status() {
    return this.devices()[0]?.state ? 'On' : 'Off';
  }
}
