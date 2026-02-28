import { Component, input } from '@angular/core';
import { CardInfo, DeviceItem } from '../../../../models';
import { Card } from './card/card';
import { HighlightDirective } from '../../../../directives/highlight';

@Component({
  selector: 'app-card-list',
  imports: [Card, HighlightDirective],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  public cards = input<CardInfo[]>();

  protected hasActiveDevice(card: CardInfo): boolean {
    return card.items.some(
      (item): item is DeviceItem => item.type === 'device' && item.state === true,
    );
  }
}
