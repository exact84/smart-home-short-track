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
  protected sidebarOpen = signal(false);
  protected windowWidth = signal(window.innerWidth);

  public constructor() {
    window.addEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
    });
  }

  protected showSidebar = computed(() => {
    return this.windowWidth() >= 768 || this.sidebarOpen();
  });

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }
}
