import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AdminGuardService } from './admin-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './login/login.service';
import { NavigationComponent } from './navigation/navigation.component';
import { BannerComponent } from './banner/banner.component';

const adminRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    // canActivate: [AdminGuardService],
    children: [
      {
        path: '',
        // canActivateChild: [AdminGuardService],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'navigation', component: NavigationComponent },
          { path: 'banner', component: BannerComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuardService,
    LoginService
  ]
})
export class AdminRoutingModule { }
