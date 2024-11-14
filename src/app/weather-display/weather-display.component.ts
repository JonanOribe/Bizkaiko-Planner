import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiHttpService } from '../services/api-http.service';
import { getIconUrl, getUrlFromParams } from '../services/url-paths';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Papa from 'papaparse';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.sass'],
})
export class WeatherDisplayComponent implements OnInit {
  name = '';
  country = '';
  currentWeather: Weather = {} as Weather;
  temperature: number = 0;
  temperatureFeelsLike: number = 0;
  loaded = false;
  iconUrl = '';
  csvData: any[] = [];
  // Table columns and data
  displayedColumns: string[] = ['name', 'category', 'price','url'];
  //dataSource: any[] = [];
  dataSource = [
    { name: 'Antzerki partehartzailea, Dantza eta Performance-Arte biziak', category: 'cultura', price: 25,url:'https://www.google.com' },
    { name: 'Concierto Coral', category: 'música', price: 27,url:'https://www.google.com' },
    { name: 'Bizkaikoa. Ibiltari Arrigorriaga: Komikia', category: 'cultura', price: 28,url:'https://www.google.com' },
    { name: 'Itsasmuseum Bilbao. Umeentzako jarduerak. Atlantidaren altxorrak', category: 'cultura', price: 26,url:'https://www.google.com' },
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiHttpService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const info = getInfoFromParams(params);
      if (!info) {
        console.error('Missing parameters in query');
        return;
      }
      this.name = info.name;
      this.country = info.country;

      const fetchUrl = getUrlFromParams(info.latitude, info.longitude);

      this.apiService.get(fetchUrl).subscribe({
        next: (data) => {
          this.currentWeather = data as unknown as Weather;
        },
        complete: () => {
          this.iconUrl = getIconUrl(this.currentWeather.weather[0].icon);
          this.temperature = Math.round(this.currentWeather.main.temp);
          this.temperatureFeelsLike = Math.round(
            this.currentWeather.main.feels_like
          );
          this.loaded = true;
        },
        error: (err) => console.error(err),
      });
    });

    // Use `this.readCsv` instead of `readCsv`
    this.readCsv('assets/agenda-cultural-bizkaia-2023.csv').subscribe({
      next: (data) => {
        this.csvData = data;
        console.log('CSV Data:', this.csvData);
      },
      error: (error) => console.error('Error reading CSV file:', error),
    });

    //this.loadCSVData();
  }

  // Move readCsv inside the class
  readCsv(filePath: string): Observable<any[]> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map((csvData: string) => {
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        });
        return parsedData.data;
      })
    );
  }

    // Function to load and parse the CSV file
    //loadCSVData(): void {
    //  const csvFilePath = 'assets/agenda-cultural-bizkaia-2023.csv'; // Replace with the correct path to your CSV file
//
    //  Papa.parse(csvFilePath, {
    //    download: true,
    //    header: true,
    //    complete: (result) => {
    //      // Filter for "sport" activity and get the first 5 entries
    //      this.dataSource = result.data
    //        .filter((row: any) => row.category === 'sport') // Adjust 'activity' if column name differs
    //        .slice(0, 5); // Limit to first 5 entries
    //    },
    //    error: (error) => {
    //      console.error('Error loading CSV file:', error);
    //    }
    //  });
    //  console.log(this.dataSource)
    //}
    getIcon(category: string): string {
      switch (category) {
        case 'deportes': return 'sports_soccer';
        case 'cultura': return 'theater_comedy';
        case 'música': return 'music_note';
        default: return 'star';
      }
    }
}

export function getInfoFromParams(params: Params) {
  const name = params['name'];
  const country = params?.['country'];
  const latitude = params?.['lat'];
  const longitude = params?.['lon'];
  const preferences = JSON.parse(params?.['preferences']);
  if (!params || !name || !country || !latitude || !longitude) return null;
  return {
    name,
    country,
    latitude,
    longitude,
  };
}

interface Weather {
  coord: {};
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  rain?: {};
  snow?: {};
  dt: number;
  sys: {};
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
