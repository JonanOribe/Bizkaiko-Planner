import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-experience-dialog',
  templateUrl: './delete-experience-dialog.component.html',
})
export class DeleteExperienceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(element:string): void {
    this.dialogRef.close(true);
    let filteredData = JSON. parse(localStorage['favourites']).filter((elem: { [x: string]: string; }) => elem['IZENBURUA_EU/TITULO_EU']!==element);
    localStorage.setItem('favourites',JSON.stringify(filteredData))
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
