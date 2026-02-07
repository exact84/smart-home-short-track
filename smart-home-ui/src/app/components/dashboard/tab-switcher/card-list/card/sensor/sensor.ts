import { Component, input } from '@angular/core';
import { CardLayout, SensorItem } from '../../../../../../models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sensor',
  imports: [MatIconModule],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  public item = input<SensorItem>();
  public layout = input<CardLayout>();
  public cardLayout = CardLayout;
}
