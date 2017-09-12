import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, ModalController } from 'ionic-angular';
import { ConfigApp, IAppConfig } from "../../app/app.config";
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from "../../app/app.util";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';

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
    password: 'boon555',
    lat: null,
    long: null
  }

  constructor(
    @Inject(ConfigApp) private config: IAppConfig,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public modalCtrl: ModalController) {

    this.enableLocation();

  }

  callLogin() {
    this.util.showLoading();
    this.service.login(
      this.inputLoginData.username,
      this.inputLoginData.password,
      this.inputLoginData.lat,
      this.inputLoginData.long)
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

  enableLocation() {

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.inputLoginData.lat = resp.coords.latitude;
        this.inputLoginData.long = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });


    if (this.config.isBuildDevice) {
      this.locationAccuracy.canRequest().then(
        (canRequest: boolean) => {
          if (canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => alert('Request successful'),
              error => alert('Error requesting location permissions' + JSON.stringify(error))
            );
          }
        });
    }
  }

  callForgot(username) {
    this.util.showLoading();
    this.service.forgot(username)
      .then(
      (result: ForgotModel) => {
        console.log(result);
        this.util.hideLoading();
        this.util.showAlertDialog(result.msg);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }


  forgetPassword() {
    let modal = this.modalCtrl.create('ForgetPasswordInput', {}, {
      cssClass: 'override-modal-forget-password-input'
    });
    modal.present();

    modal.onDidDismiss(username => {
      console.log(username);
      if (username) {
        this.callForgot(username);
      }
    });
  }



}
