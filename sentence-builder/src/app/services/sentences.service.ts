import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentencesService {

  constructor(private httpClient: HttpClient) {}

  // Method to get all previously submitted sentences from the backend
  getWordTypes() {
    const url = `${environment.apiUrl}/wordTypes`; // Replace with your API endpoint
    return this.httpClient.get<string[]>(url);
  }
}
