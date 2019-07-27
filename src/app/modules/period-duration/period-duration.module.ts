import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { ReactiveFormsModule } from '@angular/forms';


import { PeriodDurationComponent } from './period-duration.component';
import { PeriodDurationRoutingModule } from './period-duration.routing';
import { ModalService } from '../../core/services/model.service';
import { VehicleNumberFilterPipe } from '../../core/pipes/vehicle-number-filter.pipe';
import { VendorNameFilterPipe } from '../../core/pipes/vendor-name-filter.pipe';
import { TypeOfVehicleFilterPipe } from '../../core/pipes/type-of-vehicle-filter.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    RouterModule,
    LazyLoadImagesModule,
    PeriodDurationRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    PeriodDurationComponent,
    VehicleNumberFilterPipe,
    VendorNameFilterPipe,
    TypeOfVehicleFilterPipe
    ],
  providers: [
    AuthGuard,
    Title,
    ModalService
  ],
  exports: [
    VehicleNumberFilterPipe
  ]
})
export class PeriodDurationModule { }
