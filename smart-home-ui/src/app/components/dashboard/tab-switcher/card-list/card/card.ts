import { Component, computed, input } from '@angular/core';
import { CardInfo } from '../../../../../models';
import { Device } from './device/device';
import { Sensor } from './sensor/sensor';

@Component({
  selector: 'app-card',
  imports: [Device, Sensor],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  public card = input<CardInfo>();
  public sensors = computed(() => this.card()?.items?.filter((item) => item.type === 'sensor'));
  public devices = computed(() => this.card()?.items?.filter((item) => item.type === 'device'));
}
