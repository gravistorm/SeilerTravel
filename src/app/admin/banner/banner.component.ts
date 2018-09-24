import { OnInit, Component } from '@angular/core';
import { Banners } from './banner';
import { BannerService } from './banner.service';

@Component({
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

  title = 'BANNER';
  errorMessage: any;
  selectedFile: File;
  fd = new FormData();
  banners: Banners[];
  banner: Banners = {
    name: '',
    position: 0,
    status: true,
    path: ''
  };
  alerts = {
    msg: {},
    type: ''
  };

  constructor( private _bannerService: BannerService ) { }

  ngOnInit() {
  this._bannerService.getBanner()
    .subscribe(banners => {
      this.banners = banners;
      console.log(this.banners);
    },
    error => this.errorMessage = <any>error);
  }

  uploadFile(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('bannerImage', this.selectedFile);
  }

  add() {
    this.fd.append('name', this.banner.name);
    this.fd.append('position', this.banner.position.toString());
    this.fd.append('status', this.banner.status.toString()); /* Chequear que el valor enviado sea boolean */
    return this._bannerService.createBanner(this.fd)
      .subscribe(() => {
        // this.refresh();
        this.banner.name = '';
        this.banner.position = 0;
        this.alerts.msg = this._bannerService.status;
        this.alerts.type = this._bannerService.type;
      });
  }

}
