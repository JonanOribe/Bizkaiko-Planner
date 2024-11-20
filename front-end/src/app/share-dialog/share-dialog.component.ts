import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html'
})
export class ShareDialogComponent {
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog without sharing
  close(): void {
    this.dialogRef.close();
  }

  // Share with the provided comment
  share(): void {
    this.dialogRef.close(this.comment);
  }
}
