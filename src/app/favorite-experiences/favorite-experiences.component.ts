import { Component } from '@angular/core';

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
  displayedColumns: string[] = ['name', 'category', 'rating'];
  experiences: Experience[] = [
    { name: 'City Marathon', category: 'sports', rating: 4 },
    { name: 'Rock Concert', category: 'music', rating: 5 },
    { name: 'Broadway Show', category: 'theater', rating: 4 },
    { name: 'Art Festival', category: 'other', rating: 3 }
  ];

  getIcon(category: string): string {
    switch (category) {
      case 'sports': return 'sports_soccer';
      case 'theater': return 'theater_comedy';
      case 'music': return 'music_note';
      default: return 'star';
    }
  }
}
