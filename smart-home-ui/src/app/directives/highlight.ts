import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appHighlightDirective]',
  host: {
    '[class.highlight]': 'active()',
  },
})
export class HighlightDirective {
  public active = input(false, { alias: 'appHighlightDirective' });
}
