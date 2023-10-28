import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { catchError, map, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { responsetimeout } from '../../assets/config'
@Injectable({
  providedIn: 'root'
})
export class SentencesService {

  constructor(private httpClient: HttpClient) {}

  public getWordTypes = (): Observable<any> => {
    return this.httpClient.get<any>(environment.apiUrl + '/wordTypes',
    { observe: 'response' }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public getSubmittedSentences = (): Observable<any> => {
    return this.httpClient.get<any>(environment.apiUrl + '/sentences',
    { observe: 'response' }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public getWordsByWordType = (data: any): Observable<any> => {
    const type = {
      type: data
    }
    return this.httpClient.get<any>(environment.apiUrl + '/getByWordType',
    { params: type, observe: 'response' }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  public submitSentence = (sentence: any): Observable<any> => {
    return this.httpClient.post<any>(environment.apiUrl + '/sentences',
      { params: sentence, observe: 'response' }).pipe(
      timeout(responsetimeout),
        map((response: HttpResponse<any>) => {
          return response;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

}
