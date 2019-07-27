import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'vehicleRegistration',
    loadChildren: './modules/vehicle-registration/vehicle-registration.module#VehicleRegistrationModule'
  },
  {
    path: 'vehicleList',
    loadChildren: './modules/vehicle-list/vehicle-list.module#VehicleListModule'
  },
  {
    path: 'periodDuration',
    loadChildren: './modules/period-duration/period-duration.module#PeriodDurationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
