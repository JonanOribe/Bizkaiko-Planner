// favorite-experiences.component.ts

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditExperienceDialogComponent } from '../edit-experience-dialog/edit-experience-dialog.component';
import { DeleteExperienceDialogComponent } from '../delete-experience-dialog/delete-experience-dialog.component';

interface Experience {
  name: string;
  category: 'sports' | 'theater' | 'music' | 'other';
  rating: number;
}

@Component({
  selector: 'app-favorite-experiences',
  templateUrl: './favorite-experiences.component.html',
  styleUrls: ['./favorite-experiences.component.sass']
})
export class FavoriteExperiencesComponent {
  // Add "actions" to displayedColumns array
  displayedColumns: string[] = ['name', 'category', 'rating', 'actions'];
  experiences: Experience[] = [
    { name: 'City Marathon', category: 'sports', rating: 4 },
    { name: 'Rock Concert', category: 'music', rating: 5 },
    { name: 'Broadway Show', category: 'theater', rating: 4 },
    { name: 'Art Festival', category: 'other', rating: 3 }
  ];

  constructor(public dialog: MatDialog) {}

  openEditDialog(experience: Experience): void {
    const dialogRef = this.dialog.open(EditExperienceDialogComponent, {
      width: '300px',
      data: { experience }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.experiences.findIndex(exp => exp === experience);
        if (index > -1) {
          this.experiences[index] = result;
        }
      }
    });
  }

  openDeleteDialog(experience: Experience): void {
    const dialogRef = this.dialog.open(DeleteExperienceDialogComponent, {
      width: '300px',
      data: { experience }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.experiences = this.experiences.filter(exp => exp !== experience);
      }
    });
  }

  getIcon(category: string): string {
    switch (category) {
      case 'sports': return 'sports_soccer';
      case 'theater': return 'theater_comedy';
      case 'music': return 'music_note';
      default: return 'star';
    }
  }
}
