import { Component, Inject, ViewChild } from '@angular/core';
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
  @ViewChild('inputPasscode') inputPasscode ;

  constructor(public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.inputPasscode.setFocus();
    },800); //a least 150ms.
  }

  focusInputPasscode() {
    setTimeout(() => {
      this.inputPasscode.setFocus();
    },250); //a least 150ms.
  }

  setPasscode(e) {
    this.inputPinLoginData.pin1 = this.inputPinLoginData.passcode.charAt(0);
    this.inputPinLoginData.pin2 = this.inputPinLoginData.passcode.charAt(1);
    this.inputPinLoginData.pin3 = this.inputPinLoginData.passcode.charAt(2);
    this.inputPinLoginData.pin4 = this.inputPinLoginData.passcode.charAt(3);

    if (this.inputPinLoginData.passcode.length == 4) {
      setTimeout(() => {
        if (this.inputPinLoginData.passcode == this.config.pin_logged) {
          this.util.setVersion();
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
