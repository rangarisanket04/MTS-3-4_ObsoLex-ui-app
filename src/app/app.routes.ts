import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'device-list', component: DeviceListComponent },
  { path: 'device-details', component: DeviceDetailsComponent}
];

