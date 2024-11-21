import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-experience-dialog',
  templateUrl: './edit-experience-dialog.component.html',
})
export class EditExperienceDialogComponent {
  lastUpdatedRating:number=1;
  constructor(
    public dialogRef: MatDialogRef<EditExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(element:any): void {
    this.dialogRef.close(this.data.experience);
    let filteredData = JSON. parse(localStorage['favourites']).filter((elem: { [x: string]: string; }) => elem['IZENBURUA_EU/TITULO_EU']!==element);
    let updatedData = JSON. parse(localStorage['favourites']).filter((elem: { [x: string]: string; }) => elem['IZENBURUA_EU/TITULO_EU']==element);
    updatedData[0].rating=this.lastUpdatedRating;
    const merged = [...filteredData, ...updatedData];
    localStorage.setItem('favourites',JSON.stringify(merged))
  }

  changeRating(value:any) {
    this.lastUpdatedRating=value;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
