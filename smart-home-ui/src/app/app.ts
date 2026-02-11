import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Sidebar } from './components/sidebar/sidebar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Sidebar, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Smart-home-ui');
  sidebarOpen = signal(false);
  windowWidth = signal(window.innerWidth);

  constructor() {
    window.addEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
    });
  }

  showSidebar = computed(() => {
    return this.windowWidth() >= 768 || this.sidebarOpen();
  });

  toggleSidebar() {
    this.sidebarOpen.update((open) => !open);
  }
}
