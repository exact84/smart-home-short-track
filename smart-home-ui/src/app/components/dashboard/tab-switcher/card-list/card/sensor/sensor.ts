import { Component, input, OnInit } from '@angular/core';
import { CardLayout, SensorItem } from '../../../../../../models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sensor',
  imports: [MatIconModule],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor implements OnInit {
  public item = input<SensorItem>();
  public layout = input<CardLayout>();
  public cardLayout = CardLayout;

  ngOnInit() {
    console.log('Sensor:', this.item(), this.layout());
  }
}
