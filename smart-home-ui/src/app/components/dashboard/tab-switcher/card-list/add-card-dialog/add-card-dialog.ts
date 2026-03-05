import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CardLayout } from '../../../../../models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-card-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './add-card-dialog.html',
  styleUrl: './add-card-dialog.scss',
})
export class AddCardDialog {
  private dialogRef = inject(MatDialogRef<AddCardDialog>);

  protected readonly CardLayout = CardLayout;

  protected close(layout?: CardLayout): void {
    this.dialogRef.close(layout);
  }
}
