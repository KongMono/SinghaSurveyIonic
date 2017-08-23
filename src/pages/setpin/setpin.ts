import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ConfigApp, IAppConfig } from "../../app/app.config";
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from './../../app/app.util';

@IonicPage()
@Component({
  selector: 'page-setpin',
  templateUrl: 'setpin.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class SetpinPage {
  inputSetPinData = {
    passcode: '1111',
    confirmPasscode: '1111',
    passcodeLength: '',
    confirmPasscodeLength: ''
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    @Inject(ConfigApp) private config: IAppConfig) {
    this.inputSetPinData.passcodeLength = this.inputSetPinData.passcode.length.toString();
    this.inputSetPinData.confirmPasscodeLength = this.inputSetPinData.confirmPasscode.length.toString();
  }

  changePasscodeLength(e) {
    // console.log(e);
    this.inputSetPinData.passcodeLength = this.inputSetPinData.passcode.length.toString();
  }

  changeConfirmPasscodeLength(e) {
    // console.log(e);
    this.inputSetPinData.confirmPasscodeLength = this.inputSetPinData.confirmPasscode.length.toString();
  }

  createPasscode() {
    if ((this.inputSetPinData.passcodeLength == '4' && this.inputSetPinData.confirmPasscodeLength == '4') && (this.inputSetPinData.passcode == this.inputSetPinData.confirmPasscode)) {
      this.util.setPin(this.inputSetPinData.passcode);
      this.navCtrl.push('PinLoginPage'); //forward: right to left
      // this.navCtrl.push('PinLoginPage', {}, {animate:true,animation:'transition',duration:1000,direction:'back'}); //back: left to right
    }
  }
}
