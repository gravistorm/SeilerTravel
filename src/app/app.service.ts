import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Books } from './books';

@Injectable()
  export class AppService {
    constructor(private http: HttpClient) { }

    getBooks(): Observable<Books[]> {
      return this.http.get<Books[]>('api/books')
        .pipe(tap(data => console.log('all data: ' + JSON.stringify(data))));
    }
  }
