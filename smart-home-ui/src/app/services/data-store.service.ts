import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DashboardData, Tab } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  http = inject(HttpClient);
  private readonly _tabs = signal<Tab[]>([]);
  readonly tabs = this._tabs.asReadonly();

  constructor() {
    this.http.get<DashboardData>('api/mock-data.json').subscribe((data) => {
      this._tabs.set(data.tabs);
    });
  }

  public toggleDevice(cardId: string, deviceLabel: string, state?: boolean) {
    this._tabs.update((tabs) =>
      tabs.map((tab) => ({
        ...tab,
        cards: tab.cards.map((card) => ({
          ...card,
          items: card.items.map((item) => {
            const isTargetDevice =
              item.type === 'device' && item.label === deviceLabel && card.id === cardId;
            if (!isTargetDevice) return item;
            return state === undefined ? { ...item, state: !item.state } : { ...item, state };
          }),
        })),
      })),
    );
  }
}
