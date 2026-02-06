import { Component, inject, OnInit, signal } from '@angular/core';
import { TabSwitcher } from './tab-switcher/tab-switcher';
import { DashboardData, Tab } from '../../models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  http = inject(HttpClient);
  tabs = signal<Tab[]>([]);

  ngOnInit() {
    this.http.get<DashboardData>('api/mock-data.json').subscribe((data) => {
      this.tabs.set(data.tabs);
    });
  }
}
