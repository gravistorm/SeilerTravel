import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { NavigationService } from './navigation/navigation.service';
import { AlertsComponent } from './share/alerts/alerts.component';

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
    NavbarComponent,
    AlertsComponent
  ],
  providers: [
    NavigationService
  ]
})
export class AdminModule { }
