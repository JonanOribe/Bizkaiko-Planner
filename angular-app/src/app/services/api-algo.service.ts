import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceAlgo {
  private apiUrl = 'http://localhost:8000/cluster_cultura/';

  constructor(private http: HttpClient) {}

  clusterCultura(data: any): Observable<any> {
    return this.http.post(this.apiUrl, { data });
  }
}
