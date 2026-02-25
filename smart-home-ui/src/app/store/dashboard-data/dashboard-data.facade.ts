import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private store = inject(Store);
  editMode = signal(false);

  toggleEditMode() {
    this.editMode.update((v) => !v);
  }
}
