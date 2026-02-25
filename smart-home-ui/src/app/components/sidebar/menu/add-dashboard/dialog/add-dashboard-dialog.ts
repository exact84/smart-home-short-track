import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AddDashboard } from '../add-dashboard';
import { Store } from '@ngrx/store';
import {
  createDashboard,
  createDashboardSuccess,
} from '../../../../../store/dashboard-list/dashboard.actions';
import {
  selectAddDashboardError,
  selectDashboardList,
} from '../../../../../store/dashboard-list/dashboard.selectors';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Actions, ofType } from '@ngrx/effects';
import { first } from 'rxjs';

@Component({
  selector: 'app-dialog',
  imports: [
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './add-dashboard-dialog.html',
  styleUrl: './add-dashboard-dialog.scss',
})
export class AddDashboardDialog {
  id = '';
  title = '';
  icon = '';

  private store = inject(Store);

  private dialogRef = inject(MatDialogRef<AddDashboard>);

  private actions$ = inject(Actions);

  public serverErrorSignal = toSignal(this.store.select(selectAddDashboardError));
  public localError = signal('');

  get error() {
    return (this.localError() || '') + (this.serverErrorSignal() || '');
  }

  constructor() {
    this.actions$.pipe(ofType(createDashboardSuccess), takeUntilDestroyed()).subscribe(() => {
      this.dialogRef.close();
    });
  }

  submit() {
    this.localError.set('');

    if (this.id.length > 40 || this.title.length > 40 || this.icon.length > 40) {
      this.localError.set(this.localError() + 'One or more fields exceed 40 chars length. ');
    }

    const result = {
      id: this.id,
      title: this.title,
      icon: this.icon,
    };

    this.store
      .select(selectDashboardList)
      .pipe(first())
      .subscribe((list) => {
        if (list.some((item) => item.id === this.id))
          this.localError.set(this.localError() + 'Dashboard with this ID already exists. ');
        if (!this.localError()) this.store.dispatch(createDashboard({ dashboardItem: result }));
      });
  }
}
