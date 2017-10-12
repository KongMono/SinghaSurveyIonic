import { Component, Inject } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppUtilService } from './app.util';
import { ConfigApp, IAppConfig } from "./app.config";
import { LocationTracker } from './../providers/location-tracker';
import { CallApi } from './../providers/call-api';
import { SinghaSurveyService } from './../providers/service';
import { BackgroundMode } from '@ionic-native/background-mode';

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
    public backgroundMode: BackgroundMode,
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

      // update location first
      this.locationTracker.startTracking();
      // update location every 1 min
      setInterval(() => {
        this.locationTracker.startTracking();
      }, 60000);

      this.backgroundMode.enable();
      // location tracking every 5 min
      setInterval(() => {
        // console.log('isEnabled: ' , this.backgroundMode.isEnabled());
        // console.log('isActive: ' , this.backgroundMode.isActive());
        if (this.backgroundMode.isActive()) {
          console.log('locationTracking', new Date);
          this.locationTracking();
        }
      }, 300000);
    });
  }

  locationTracking() {
    if (this.configApp.latitude && this.configApp.longitude) {
      console.log('tracking: ' + this.configApp.latitude, this.configApp.longitude);
      let username = '';
      if (this.configApp.userInfo) {
        username = this.configApp.userInfo.username;
      }
      if (this.configApp.isBuildDevice) {
        this.service.setTrackingBackground(username, this.configApp.latitude, this.configApp.longitude)
          .then(
          (result: any) => {
            console.log(result.status_code);
          }, error => {
            console.log(error);
          });
        }
    }
  }
}

