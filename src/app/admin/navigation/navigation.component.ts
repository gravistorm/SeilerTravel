import { OnInit, Component } from '@angular/core';
import { NavigationService } from './navigation.service';

import { Links } from './links';

@Component({
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  title = 'Navigation';
  errorMessage: String;
  link: Links = {
    name: '',
    position: 0,
    status: true
  };
  links: Links[];
  showId: string;
  show = false;

  constructor( private _navService: NavigationService ) { }

  showForm () {
    this.show = true;
  }

  showOptions(id) {
    if (this.showId !== id) {
      this.showId = id;
    }
  }

  add () {
    return this._navService.createLink(this.link)
      .subscribe(data => {
        this.links.push(this.link);
        this.show = !this.show;
        console.log(data);
      },
      error => this.errorMessage = <any>error);
  }

  changeStatus(link) {
    const id = link._id;
    link.status = !link.status;

    return this._navService.changeStatus(id, link)
      .subscribe(data => {
        console.log(data);
        this.showId = '';
      }),
      error => this.errorMessage = <any>error;
  }

  updateLink(link) {
    const id = link._id;

    return this._navService.updateLink(id, link)
      .subscribe(data => {
        console.log(data);
        this.showId = '';
      }),
      error => this.errorMessage = <any>error;
  }

  removeLink(link) {
    if (confirm(`¿Eliminar ${link.name}?`)) {
      const id = link._id;

      return this._navService.removeLink(id)
        .subscribe(data => {
          console.log(data);
          for (let i = 0; i < this.links.length; i++) {
            if (this.links[i].name === link.name) {
              this.links.splice(i, 1);
              break;
            }
          }
          this.showId = '';
        }),
        error => this.errorMessage = <any>error;
    }
  }

  ngOnInit() {
    this._navService.getLink()
      .subscribe(links => {
        this.links = links;
      },
      error => this.errorMessage = <any>error);
  }
}
