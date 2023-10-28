import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, map, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { responsetimeout } from '../../assets/config'
import { environment } from './../../environments/environment'
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root'
})
export class SentencesService {

  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) {}

  public getWordTypes = (): Observable<any> => { // get word types
    return this.httpClient.get<any>(environment.apiUrl + '/wordTypes',
    { observe: 'response', headers: this.httpHeaderService.getHTTPHeaders() }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public getSubmittedSentences = (): Observable<any> => { // get database sentences
    return this.httpClient.get<any>(environment.apiUrl + '/sentences',
    { observe: 'response', headers: this.httpHeaderService.getHTTPHeaders() }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public getWordsByWordType = (data: any): Observable<any> => { // get words based on word type
    const type = {
      type: data
    }
    return this.httpClient.get<any>(environment.apiUrl + '/getByWordType',
    { params: type, observe: 'response', headers: this.httpHeaderService.getHTTPHeaders() }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public submitSentence = (sentence: any): Observable<any> => {  // save new sentence
    return this.httpClient.post<any>(environment.apiUrl + '/sentences',
      { params: sentence, observe: 'response', headers: this.httpHeaderService.getHTTPHeaders() }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
}
