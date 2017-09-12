import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { AppVersion } from '@ionic-native/app-version';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { MyApp } from './app.component';
import { ConfigApp, AppConfig } from './app.config';
import { SSVErrorHandler } from "./app.errorhandler";
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
    LocationAccuracy,
    AppVersion,
    GoogleMapsAPIWrapper,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ConfigApp, useValue: AppConfig },
    { provide: ErrorHandler, useClass: SSVErrorHandler }
  ],

})
export class AppModule { }
