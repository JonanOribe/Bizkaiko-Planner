import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchLocationComponent } from './search-location/search-location.component';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ApiHttpService } from './services/api-http.service';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CsvReaderComponent } from './csv-reader/csv-reader.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Papa } from 'ngx-papaparse';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FavoriteExperiencesComponent } from './favorite-experiences/favorite-experiences.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditExperienceDialogComponent } from './edit-experience-dialog/edit-experience-dialog.component';
import { DeleteExperienceDialogComponent } from './delete-experience-dialog/delete-experience-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiServiceAlgo } from './services/api-algo.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchLocationComponent,
    WeatherDisplayComponent,
    CsvReaderComponent,
    FavoriteExperiencesComponent,
    NavbarComponent,
    EditExperienceDialogComponent,
    DeleteExperienceDialogComponent,
    ShareDialogComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [ApiHttpService,Papa,ApiServiceAlgo],
  bootstrap: [AppComponent],
})
export class AppModule {}
