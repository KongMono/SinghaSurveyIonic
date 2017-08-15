import { Component, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppUtilService } from './app.util';
import { ConfigApp, IAppConfig } from "./app.config";

@Component({
  templateUrl: 'app.html',
  providers: [AppUtilService]
})

export class MyApp {
  rootPage: String;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public util: AppUtilService,
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
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#455A64');
      splashScreen.hide();
    });
  }
}

