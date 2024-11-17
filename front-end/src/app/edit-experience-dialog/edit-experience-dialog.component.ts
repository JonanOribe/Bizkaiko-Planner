import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-experience-dialog',
  templateUrl: './edit-experience-dialog.component.html',
})
export class EditExperienceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data.experience);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
