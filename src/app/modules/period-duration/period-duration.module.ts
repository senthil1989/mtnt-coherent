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
  ],
  declarations: [
    PeriodDurationComponent,
    ],
  providers: [
    AuthGuard,
    Title,
  ],
  exports: [
  ]
})
export class PeriodDurationModule { }
