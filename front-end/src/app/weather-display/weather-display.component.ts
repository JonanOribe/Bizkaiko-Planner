import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiHttpService } from '../services/api-http.service';
import { getIconUrl, getUrlFromParams } from '../services/url-paths';
import { HttpClient } from '@angular/common/http';
import { ApiServiceAlgo } from '../services/api-algo.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.sass'],
})
export class WeatherDisplayComponent implements OnInit {
  response: any;
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
    private http: HttpClient,
    private apiAlgo: ApiServiceAlgo
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
          this.sendData(info.preferences);
        },
        error: (err) => console.error(err),
      });
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

    sendData(preferences:any): void {
      const data = [preferences];

      this.apiAlgo.clusterCultura(data).subscribe(
        (res) => {
          this.response = res; // Save the response to display in the template
          console.log('Response:', res);
        },
        (err) => {
          console.error('Error:', err);
        }
      );
    }

  }

export function getInfoFromParams(this: any, params: Params) {
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
    preferences
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
