import { Item } from './item.model';

export enum CardLayout {
  Horizontal = 'horizontalLayout',
  Vertical = 'verticalLayout',
  SingleDevice = 'singleDevice',
}

export interface CardInfo {
  id: string;
  title: string;
  layout: CardLayout;
  items: Item[];
}
