import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
})
export class CsvReaderComponent {
  csvForm: FormGroup;
  csvData: any;

  constructor(private fb: FormBuilder, private papa: Papa) {
    this.csvForm = this.fb.group({});
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const csv = reader.result as string;
        this.parseCSV(csv);
      };

      reader.readAsText(file);
    }
  }

  parseCSV(csv: string): void {
    this.papa.parse(csv, {
      header: true,
      complete: (result: { data: any; }) => {
        this.csvData = result.data;
        console.log(this.csvData);
      },
      error: (error: any) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }
}
