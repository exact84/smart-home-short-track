import { Component, input } from '@angular/core';
import { DeviceItem } from '../../../../../../models';

@Component({
  selector: 'app-device',
  imports: [],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  public item = input<DeviceItem>();
}
