import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Users } from './users';

@Injectable()
  export class LoginService {
    user: Users;
    redirectUrl: String;
    isLogged = false;

    constructor( private http: HttpClient ) {}

    checkUser(user: Users): Observable<Users> {
      return this.http.post<Users>('api/admin', user)
        .pipe(
          tap(data => {
            this.isLogged = true;
            this.user = data;
          }),
          catchError( err => this.handleError(err))
        );
    }

    private handleError( err: HttpErrorResponse) {
      if (err.error instanceof ErrorEvent) {
        console.error('An error ocurred:', err.error.message);
      } else {
        console.error(
          `Backend returned code ${err.status}, ` +
          `Body was: ${err.error}`
        );
      }

      return throwError(`Something bad happened: ${err.error.message}`);
    }

    logOut(): void {
      this.isLogged = false;
    }
  }
