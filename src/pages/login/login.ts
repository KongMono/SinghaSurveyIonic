import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ConfigApp, IAppConfig } from "../../app/app.config";
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from "../../app/app.util";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class LoginPage {
  inputLoginData = {
    username: '002605',
    password: 'boon555'
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService) {
  }

  callLogin() {
    this.util.showLoading();
    this.service.login(this.inputLoginData.username, this.inputLoginData.password)
      .then(
      (result: LoginModel) => {
        console.log(result);
        this.util.hideLoading();
        this.util.setDataInfo(result);
        this.util.setLogin();

        this.navCtrl.push('SetpinPage');

      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callForgot(username) {
    this.util.showLoading();
    this.service.forgot(username)
      .then(
      (result: ForgotModel) => {
        console.log(result);
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }


  forgetPassword() {

  }



}
