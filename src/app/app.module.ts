import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpBackend, HttpXhrBackend} from '@angular/common/http';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CustomHttpInterceptor,ApiService } from './providers/api/api.service';
import { NativeHttpBackend, NativeHttpFallback, NativeHttpModule } from 'ionic-native-http-connection-backend';



import { Network } from '@awesome-cordova-plugins/network/ngx';
import { GenericPipe } from './pipes/generic.pipe';
import { ShorttextPipe } from './pipes/shorttext.pipe';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';



// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, GenericPipe, ShorttextPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    NativeHttpModule
  ],
  providers: [ Network,ApiService,SocialSharing, { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage,{ provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend] }],
  bootstrap: [AppComponent],
})
export class AppModule { }
