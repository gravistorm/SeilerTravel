import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { AlertsComponent } from './share/alerts/alerts.component';
import { BannerComponent } from './banner/banner.component';

import { NavigationService } from './navigation/navigation.service';
import { BannerService } from './banner/banner.service';

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
    BannerComponent,
    NavbarComponent,
    AlertsComponent
  ],
  providers: [
    NavigationService,
    BannerService
  ]
})
export class AdminModule { }
