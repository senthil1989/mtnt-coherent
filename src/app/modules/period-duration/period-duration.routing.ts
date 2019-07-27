import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodDurationComponent } from './period-duration.component';

const routes: Routes = [{
  path: '', component: PeriodDurationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PeriodDurationRoutingModule { }
