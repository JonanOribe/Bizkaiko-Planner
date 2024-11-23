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
  displayedColumns: string[] = ['name', 'rating', 'actions'];
  experiences: Experience[] = [];

  constructor(public dialog: MatDialog) {}

  // Construct the social media sharing URL
  constructShareUrl(network:string,experience: any, comment: string): string {
    let link:string='';
    const encodedComment = encodeURIComponent(comment);
    const encodedName = encodeURIComponent(experience.name);
    if (network === 'twitter') {
      link = `https://twitter.com/intent/tweet?text=${encodedComment}%20-Evento:%20${encodedName}`;
    } else if (network === 'facebook') {
      link = `https://www.facebook.com/sharer/sharer.php?quote=${encodedComment}%20-Evento:%20${encodedName}`;
    }
    return link
  }

  ngOnInit() {
    this.deleteDuplicates();
    this.loadFavorites();
  }

  removeDuplicatesByTitle(data: any[]) {
    const uniqueItems = new Map();

    data.forEach(item => {
        const title = item['IZENBURUA_EU/TITULO_EU'];
        if (!uniqueItems.has(title)) {
            uniqueItems.set(title, item);
        }
    });

    return Array.from(uniqueItems.values());
}

  deleteDuplicates(){
    let getFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    if(getFavourites!==null){
      const unique = this.removeDuplicatesByTitle(getFavourites)
      localStorage.setItem('favourites',JSON.stringify(unique));
    }
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

  loadFavorites(): void {
      let finalArray: Experience[] = []
      const localStorageFavorites = JSON.parse(localStorage.getItem('favourites') || '[]');
      for (let i = 0; i < localStorageFavorites.length; i++) {
        finalArray.push({name:localStorageFavorites[i]['IZENBURUA_EU/TITULO_EU'], category: 'otros', rating: localStorageFavorites[i]['rating']?localStorageFavorites[i]['rating']:3 });
      }
      this.experiences = [...this.experiences, ...finalArray];
    }

    shareExperience(experience: any): void {
      const dialogRef = this.dialog.open(ShareDialogComponent, {
        width: '400px',
        data: experience
      });

      dialogRef.afterClosed().subscribe(items => {
        if (items[1]) {
          const shareUrl = this.constructShareUrl(items[0],experience, items[1]);
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
