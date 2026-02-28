import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(click)': 'toggleFn.emit()',
  },
})
export class Header {
  protected readonly toggleFn = output<void>();
}
