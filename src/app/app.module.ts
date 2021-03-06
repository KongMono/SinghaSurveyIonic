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
import { LocationTracker } from './../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';

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
      monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      monthShortNames: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
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
    LocationTracker,
    BackgroundGeolocation,
    BackgroundMode,
    StatusBar,
    SplashScreen,
    { provide: ConfigApp, useValue: AppConfig },
    { provide: ErrorHandler, useClass: SSVErrorHandler }
  ],

})
export class AppModule { }
