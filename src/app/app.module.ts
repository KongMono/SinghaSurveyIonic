import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';

import { MyApp } from './app.component';
import { ConfigApp, AppConfig, IAppConfig } from './app.config';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlljiKw4YdTDGYHfAaV-y55Iz__ibuq40',
      libraries: ['places']
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: "md",
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    GoogleMapsAPIWrapper,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ConfigApp, useValue: AppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],

})
export class AppModule { }
