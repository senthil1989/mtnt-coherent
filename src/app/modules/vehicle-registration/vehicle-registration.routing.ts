import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleRegistrationComponent } from './vehicle-registration.component';

const routes: Routes = [{
  path: '', component: VehicleRegistrationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class VehicleRegistrationRoutingModule { }
