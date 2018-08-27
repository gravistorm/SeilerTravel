import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    DashboardComponent
  ]
})
export class AdminModule { }
