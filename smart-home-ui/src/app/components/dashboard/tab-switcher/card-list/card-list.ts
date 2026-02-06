import { Component, input } from '@angular/core';
import { CardInfo } from '../../../../models';
import { Card } from './card/card';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  public cards = input<CardInfo[]>();
  // protected cards: DashboardData[] = [];
  // protected cards = this.selectedTab()?.cards;
}
