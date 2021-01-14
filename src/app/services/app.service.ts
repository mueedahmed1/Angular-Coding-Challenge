import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APIResponse } from '../interfaces/apiresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class APPService {
  private _config = environment;
  private url = this._config.API_URL;

  constructor(private http: HttpClient) {}

  public get(_apiUrl: string): Observable<APIResponse> {
    return this.http
      .get<APIResponse>(`${this.url}` + _apiUrl, this._header())
      .pipe(map(this.extractData), catchError(this.handleError));
  }


  _header() {
        const headers = new HttpHeaders(
            { 
                
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
                'Access-Control-Allow-Credentials': 'true',
                'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'

                
                 });
        const options = { headers: headers };
        return options;
}

  private extractData(res: APIResponse) {
    let body = res;
    return body;
  }
  private handleError(error: Response | any) {
    return throwError(error);
  }
}
