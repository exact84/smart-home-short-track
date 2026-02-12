import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../components/sidebar/sidebar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, MatIconModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
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
