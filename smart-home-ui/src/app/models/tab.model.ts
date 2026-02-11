import { CardInfo } from './card-info.model';

export interface Tab {
  id: string;
  title: string;
  cards: CardInfo[];
}
