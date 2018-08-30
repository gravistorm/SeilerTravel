import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavigationService } from './navigation/navigation.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    NavbarComponent
  ],
  providers: [
    NavigationService
  ]
})
export class AdminModule { }
