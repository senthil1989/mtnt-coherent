import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './modules/home/home.component';
import { SharedModule } from './shared/shared.module';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      closeButton: true,
      timeOut: 5000,
      autoDismiss: true,
      positionClass: 'toast-bottom-left',
      }),
      SharedModule,
    AppRoutingModule,
    LazyLoadImagesModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string,
              public translate: TranslateService) {
              translate.setDefaultLang('en');
              translate.use('en');
  }
 }
