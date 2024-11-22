import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLocationComponent } from './search-location/search-location.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { FavoriteExperiencesComponent } from './favorite-experiences/favorite-experiences.component';

const routes: Routes = [

  {
    path: '',
    component: SearchLocationComponent
  },
  {
    path: 'weather',
    component: WeatherDisplayComponent
  },
  { path: 'favorite-experiences', component: FavoriteExperiencesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
