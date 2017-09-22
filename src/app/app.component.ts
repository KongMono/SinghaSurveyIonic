import { Component, Inject } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppUtilService } from './app.util';
import { ConfigApp, IAppConfig } from "./app.config";
import { LocationTracker } from './../providers/location-tracker';
import { CallApi } from './../providers/call-api';
import { SinghaSurveyService } from './../providers/service';

@Component({
  templateUrl: 'app.html',
  providers: [AppUtilService, CallApi, SinghaSurveyService]
})

export class MyApp {
  rootPage: String;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public util: AppUtilService,
    config: Config,
    public locationTracker: LocationTracker,
    public service: SinghaSurveyService,
    @Inject(ConfigApp) private configApp: IAppConfig) {

    /**
     * load store data.
     */
    Promise.all(this.util.loadData())
      .then((arrayOfResults) => {
        this.configApp.userInfo = arrayOfResults[0];
        this.configApp.isLogged = arrayOfResults[1];
        this.configApp.pin_logged = arrayOfResults[2];
        console.log(arrayOfResults);

        if (!this.configApp.isLogged) {
          this.rootPage = "LoginPage";
        } else {
          if (!this.configApp.pin_logged) {
            this.rootPage = "SetpinPage";
          } else {
            this.rootPage = "PinLoginPage";
          }
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      config.set('scrollPadding', false)
      config.set('scrollAssist', false)
      config.set('autoFocusAssist', false)

      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#455A64');
      splashScreen.hide();

      this.locationTracking();
      // location tracking every 5 min
      setInterval(() => {
        this.locationTracking();
      }, 60000);
    });
  }

  locationTracking() {
    this.locationTracker.startTracking();
    // setTimeout(() => {
    //   if (this.configApp.latitude && this.configApp.longitude) {
    //     console.log('tracking:' + this.configApp.latitude, this.configApp.longitude);
    //     this.service.setTrackingBackground(this.configApp.latitude, this.configApp.longitude)
    //     .then(
    //     (result: any) => {
    //       console.log(result.status_code);
    //     }, error => {
    //       console.log(error);
    //     });
    //   }
    // }, 1000);
  }
}

