import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from './app.service';

import { Books } from './books';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'app';
  books: Books[];

  constructor( private _appService: AppService) {}

  ngOnInit() {
    this._appService.getBooks()
      .subscribe(books => this.books = books);
  }
}
