import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentencesService {

  constructor(private httpClient: HttpClient) {}

  public getWordTypes = (): Observable<any> => {
    return this.httpClient.get<any>(environment.apiUrl + '/wordTypes',
    { observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

}
