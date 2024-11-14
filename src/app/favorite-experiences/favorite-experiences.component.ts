// favorite-experiences.component.ts

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditExperienceDialogComponent } from '../edit-experience-dialog/edit-experience-dialog.component';
import { DeleteExperienceDialogComponent } from '../delete-experience-dialog/delete-experience-dialog.component';

interface Experience {
  name: string;
  category: 'deportes' | 'cultura' | 'música' | 'otros';
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
    { name: 'Bermeoko San Silbestrea 2023', category: 'deportes', rating: 4 },
    { name: 'Concierto Coral', category: 'música', rating: 5 },
    { name: 'Bilboko Berreginen Museoa. Gau Irekia 2023', category: 'cultura', rating: 4 },
    { name: 'Taller de pintura de TOTE BAG', category: 'otros', rating: 3 }
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
      case 'deportes': return 'sports_soccer';
      case 'culture': return 'theater_comedy';
      case 'música': return 'music_note';
      default: return 'star';
    }
  }
}
