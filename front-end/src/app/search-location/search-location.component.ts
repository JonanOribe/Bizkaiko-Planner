import { ApiHttpService } from './../services/api-http.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getFetchUrl } from '../services/url-paths';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiServiceAlgo } from '../services/api-algo.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.sass'],
})
export class SearchLocationComponent {
  response: any;
  preferencesForm: FormGroup;
  searched = false;
  loaded = false;
  displayedColumns: string[] = ['name', 'country'];
  dataSource:Location[] = [];

  constructor(private apiService: ApiHttpService, private router: Router,private fb: FormBuilder,private apiAlgo: ApiServiceAlgo) {
        // Initialize the form group with form controls for each checkbox
        this.preferencesForm = this.fb.group({
          sport: [false],
          aventures: [false],
          culture: [false],
          food: [false],
          others: [false]
        });
  }

  ngOnInit(): void {this.sendData()}

  sendData(): void {
    const data = [
      { category: 'Sports Event', sport: 'Basketball', organizer: 'OrgA' },
      { category: 'Training', sport: 'Soccer', organizer: 'OrgB' },
      { category: 'Competition', sport: 'Swimming', organizer: 'OrgC' },
      { category: 'Sports Event', sport: 'Tennis', organizer: 'OrgA' },
    ];

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

  getLocations(cityCountry: string) {
    const data = getCityAndCountry(cityCountry);
    const city = data.city;
    if (!city) {
      console.error('Missing parameters in query');
      return;
    }
    const country = data.country;
    const fetchUrl = getFetchUrl(city, country);
    this.searched = true;
    this.apiService.get(fetchUrl).subscribe({
      next: (data) => {
        this.dataSource = data as unknown as Location[];
      },
      complete: () => {
        this.loaded = true;
      },
      error: (err) => console.error(err),
    });
  }

  public checkboxStatus(event: MatCheckboxChange,id:string) {
    const preferences = this.preferencesForm.value;
    preferences[id]=!preferences[id];
  };

  selectedLocation(selectedLocation: Location) {
    const preferences = this.preferencesForm.value;
    console.log('Selected Location Preferences:', preferences);

    this.router.navigate(['/weather'], {
      queryParams: {
        name: selectedLocation.name,
        country: selectedLocation.country,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
        preferences: JSON.stringify(preferences)
      },
    });
  }
}

export function getCityAndCountry(inputString: string) {
  const location = inputString.split(',', 2);
  const trimmedLocation = location.map((element) => {
    return element.trim();
  });
  return {
    city: trimmedLocation[0],
    country: trimmedLocation[1],
  };
}

interface Location {
  name: string;
  local_names?: {};
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
