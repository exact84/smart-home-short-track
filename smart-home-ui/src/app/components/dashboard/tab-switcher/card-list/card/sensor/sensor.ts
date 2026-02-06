import { Component, input } from '@angular/core';
import { SensorItem } from '../../../../../../models';

@Component({
  selector: 'app-sensor',
  imports: [],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  public item = input<SensorItem>();
}
