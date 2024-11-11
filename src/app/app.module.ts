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
import { ReactiveFormsModule } from '@angular/forms';
import { Papa } from 'ngx-papaparse';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SearchLocationComponent,
    WeatherDisplayComponent,
    CsvReaderComponent,
  ],
  imports: [
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
  providers: [ApiHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
