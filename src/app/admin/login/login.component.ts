import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Users } from './users';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login page';
  errorMessage: String;
  user: Users = {
    username: '',
    password: '',
    role: '',
    status: true
  };

  constructor( private _loginService: LoginService, private router: Router ) { }

  checkUser() {
    return this._loginService.checkUser(this.user)
      .subscribe(user => {
        if (this._loginService.isLogged) {
          const redirect = this._loginService.redirectUrl ? this._loginService.redirectUrl : '/admin';

          this.router.navigate([redirect]);
        }
        },
        error => this.errorMessage = <any>error);
  }

  logout() {
    this._loginService.logOut();
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
