import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddDashboardDialog } from './dialog/add-dashboard-dialog';
import { Store } from '@ngrx/store';
import { resetCreateDashboardError } from '../../../../store/dashboard-list/dashboard.actions';

@Component({
  selector: 'app-add-dashboard',
  imports: [MatIconModule],
  templateUrl: './add-dashboard.html',
  styleUrl: './add-dashboard.scss',
})
export class AddDashboard {
  private dialog = inject(MatDialog);
  private store = inject(Store);

  protected openDialog(): void {
    const reference = this.dialog.open(AddDashboardDialog, {
      width: '500px',
    });
    reference.afterClosed().subscribe(() => {
      this.store.dispatch(resetCreateDashboardError());
    });
  }
}
