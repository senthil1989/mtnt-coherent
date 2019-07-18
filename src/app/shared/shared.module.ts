import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { Safe } from './safeHtml';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadImagesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    Safe,
  ],
  exports: [
    Safe,
  ]
})
export class SharedModule { }
