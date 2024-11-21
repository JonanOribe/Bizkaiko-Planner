import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditExperienceDialogComponent } from '../edit-experience-dialog/edit-experience-dialog.component';
import { DeleteExperienceDialogComponent } from '../delete-experience-dialog/delete-experience-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

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
  displayedColumns: string[] = ['name', 'rating', 'actions'];
  experiences: Experience[] = [];
  /*
    { name: 'Bermeoko San Silbestrea 2023', category: 'deportes', rating: 4 },
    { name: 'Concierto Coral', category: 'música', rating: 5 },
    { name: 'Bilboko Berreginen Museoa. Gau Irekia 2023', category: 'cultura', rating: 4 },
    { name: 'Taller de pintura de TOTE BAG', category: 'otros', rating: 3 }
  ];
  */

  constructor(public dialog: MatDialog) {}

    // Construct the social media sharing URL
    constructShareUrl(experience: any, comment: string): string {
      const encodedComment = encodeURIComponent(comment);
      const encodedName = encodeURIComponent(experience.name);
      return `https://twitter.com/intent/tweet?text=${encodedComment}%20-Evento:%20${encodedName}`;
    }
  ngOnInit() {
    this.loadFavorites();
  }

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

  // Combine existing data with local storage favourites
  loadFavorites(): void {
      let finalArray: Experience[] = []
      const localStorageFavorites = JSON.parse(localStorage.getItem('favourites') || '[]');
      for (let i = 0; i < localStorageFavorites.length; i++) {
        finalArray.push({name:localStorageFavorites[i]['IZENBURUA_EU/TITULO_EU'], category: 'otros', rating: 4 });
      }
      this.experiences = [...this.experiences, ...finalArray];
    }

    shareExperience(experience: any): void {
      const dialogRef = this.dialog.open(ShareDialogComponent, {
        width: '400px',
        data: experience
      });

      dialogRef.afterClosed().subscribe(comment => {
        if (comment) {
          const shareUrl = this.constructShareUrl(experience, comment);
          window.open(shareUrl, '_blank');
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
      case 'cultura': return 'theater_comedy';
      case 'música': return 'music_note';
      default: return 'star';
    }
  }
}
