import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Links } from './links';

@Injectable()
  export class NavigationService {
    link: Links;
    status: any;
    type: string;

    constructor( private http: HttpClient ) { }

    createLink(link: Links) {
      return this.http.post('api/admin/navigation', link)
        .pipe(
          tap(() => {
            this.status = 'Link Added Successfully';
            this.type = 'success';
          }),
          catchError( err => this.handleError(err) )
        );
    }

    getLink(): Observable<Links[]> {
      return this.http.get<Links[]>('api/admin/navigation')
        .pipe(
          tap(data => {
            this.status = data;
            this.type = 'success';
          }),
          catchError( err => this.handleError(err))
        );
    }

    changeStatus(id, link) {
      return this.http.patch('api/admin/navigation/' + id, link)
        .pipe(
          tap(data => {
            this.status = data;
            this.type = 'success';
          }),
          catchError(err => this.handleError(err))
        );
    }

    updateLink(id, link) {
      return this.http.patch('api/admin/navigation/' + id, link)
        .pipe(
          tap(data => {
            this.status = data;
            this.type = 'success';
          }),
          catchError(err => this.handleError(err))
        );
    }

    removeLink(id) {
      return this.http.delete('api/admin/navigation/' + id)
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
