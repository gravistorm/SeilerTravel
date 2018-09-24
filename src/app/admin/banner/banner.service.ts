import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Banners } from './banner';

@Injectable()
  export class BannerService {
    banner: Banners;
    status: any;
    type: string;

    constructor( private http: HttpClient ) { }

    createBanner(banner: FormData) {
      return this.http.post('api/admin/banner', banner)
        .pipe(
          tap(() => {
            this.status = 'Banner added successfully';
            this.type = 'success';
          }),
          catchError( err => this.handleError(err) )
        );
    }

    getBanner(): Observable<Banners[]> {
      return this.http.get<Banners[]>('api/admin/banner')
        .pipe(
          tap(data => {
            this.status = data;
            this.type = 'success';
          }),
          catchError(err => this.handleError(err))
        );
    }

    private handleError( err: HttpErrorResponse) {
      if (err.error instanceof ErrorEvent) {
        this.status = err.error.message;
        this.type = 'warning';
        console.error('An error occurred:', err.error.message);
      } else {
        console.error(
          `Backend returned code ${err.status}, ` +
          `body was: ${err.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
  }
