import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Links } from './links';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable()
  export class NavigationService {
    link: Links;
    status: any;

    constructor( private http: HttpClient ) { }

    createLink(link: Links): Observable<Links> {
      return this.http.post<Links>('api/admin/navigation', link)
        .pipe(
          tap(data => {
            this.status = data;
          }),
          catchError( err => this.handleError(err) )
        );
    }

    getLink(): Observable<Links[]> {
      return this.http.get<Links[]>('api/admin/navigation')
        .pipe(
          tap(data => console.log(`ALL: ${JSON.stringify(data)}`)),
          catchError( err => this.handleError(err))
        );
    }

    changeStatus(id, link) {
      return this.http.patch('api/admin/navigation/' + id, link)
        .pipe(
          tap(data => this.status = data),
          catchError(err => this.handleError(err))
        );
    }

    updateLink(id, link) {
      return this.http.patch('api/admin/navigation/' + id, link)
        .pipe(
          tap(data => this.status = data),
          catchError(err => this.handleError(err))
        );
    }

    removeLink(id) {
      return this.http.delete('api/admin/navigation/' + id)
        .pipe(
          tap(data => this.status = data),
          catchError(err => this.handleError(err))
        );
    }

    private handleError( err: HttpErrorResponse) {
      if (err.error instanceof ErrorEvent) {
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
