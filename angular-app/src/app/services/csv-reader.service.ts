import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class CsvReaderService {
  constructor(private http: HttpClient) {}

  readCsv(filePath: string): Observable<any[]> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map((csvData: string) => {
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true
        });
        return parsedData.data; // Returns parsed CSV data as JSON array
      })
    );
  }
}
