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

import { Safe } from '../../shared/safeHtml';

import { VehicleRegistrationComponent } from './vehicle-registration.component';
import { VehicleRegistrationRoutingModule } from './vehicle-registration.routing';
import { ModalService } from '../../core/services/model.service';
import { ModalComponent } from '../../core/directives/model.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

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
    ReactiveFormsModule,
    ZXingScannerModule
  ],
  declarations: [
    VehicleRegistrationComponent,
    ModalComponent
  ],
  providers: [
    AuthGuard,
    Title,
    ModalService
  ]
})
export class VehicleRegistrationModule { }
