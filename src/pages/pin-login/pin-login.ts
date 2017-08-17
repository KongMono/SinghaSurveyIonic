import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App } from 'ionic-angular';
import { ConfigApp, IAppConfig } from "../../app/app.config";
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from './../../app/app.util';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-pin-login',
  templateUrl: 'pin-login.html',
  providers: [CallApi, SinghaSurveyService, Keyboard]
})

export class PinLoginPage {
  inputPinLoginData = {
    passcode: '',
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: ''
  }

  constructor(public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    this.keyboard.show();
    this.focusInputPasscode((<HTMLInputElement>window.document.getElementById('inputPasscode')));
  }

  focusInputPasscode(inputPasscode: HTMLInputElement) {
    inputPasscode.focus();
  }

  setPasscode(e) {
    this.inputPinLoginData.pin1 = this.inputPinLoginData.passcode.charAt(0);
    this.inputPinLoginData.pin2 = this.inputPinLoginData.passcode.charAt(1);
    this.inputPinLoginData.pin3 = this.inputPinLoginData.passcode.charAt(2);
    this.inputPinLoginData.pin4 = this.inputPinLoginData.passcode.charAt(3);

    if (this.inputPinLoginData.passcode.length == 4) {
      setTimeout(() => {
        if (this.inputPinLoginData.passcode == this.config.pin_logged) {
          this.navCtrl.setRoot('Tabs');
        } else {
          this.inputPinLoginData.passcode = '';
          this.inputPinLoginData.pin1 = '';
          this.inputPinLoginData.pin2 = '';
          this.inputPinLoginData.pin3 = '';
          this.inputPinLoginData.pin4 = '';
        }
      }, 250);
    }
  }

  logout() {
    this.util.showLoading();
    this.util.logout();
    setTimeout(() => {
      this.util.hideLoading();
      this.app.getRootNav().setRoot('LoginPage');
    }, 250);
  }
}
