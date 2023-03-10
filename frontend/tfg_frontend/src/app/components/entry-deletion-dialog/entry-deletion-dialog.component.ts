import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entry-deletion-dialog',
  templateUrl: './entry-deletion-dialog.component.html',
  styleUrls: ['./entry-deletion-dialog.component.scss']
})
export class EntryDeletionDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<EntryDeletionDialogComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false)
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
