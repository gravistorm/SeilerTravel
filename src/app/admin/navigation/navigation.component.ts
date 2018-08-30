import { OnInit, Component } from '@angular/core';
import { NavigationService } from './navigation.service';

import { Links } from './links';

@Component({
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  title = 'Navigation';
  link: Links = {
    name: '',
    position: 0,
    status: true
  };

  show = false;

  constructor( private _navService: NavigationService ) { }

  showForm () {
    this.show = true;
  }

  add () {
    this.show = !this.show;
  }

  ngOnInit() { }
}
