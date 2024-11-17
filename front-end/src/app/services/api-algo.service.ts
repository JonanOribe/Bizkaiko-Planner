import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures the service is available application-wide
})
export class ApiServiceAlgo {
  private apiUrl = 'http://127.0.0.1:8006/cluster_cultura/'; // Replace with your endpoint URL

  constructor(private http: HttpClient) {}

  clusterCultura(data: any): Observable<any> {
    return this.http.post(this.apiUrl, { data });
  }
}
