import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleRegistrationComponent } from './vehicle-registration.component';
import { VehicleRegistrationRoutingModule } from './vehicle-registration.routing';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    RouterModule,
    LazyLoadImagesModule,
    VehicleRegistrationRoutingModule,
    AngularMyDatePickerModule,
    ReactiveFormsModule
  ],
  declarations: [
    VehicleRegistrationComponent,
  ],
  providers: [
    AuthGuard,
    Title
  ]
})
export class VehicleRegistrationModule { }
