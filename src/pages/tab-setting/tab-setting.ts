import { ConfigApp, IAppConfig } from './../../app/app.config';
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { CallApi } from './../../providers/call-api';
import { SinghaSurveyService } from './../../providers/service';
import { AppUtilService } from "../../app/app.util";

@IonicPage()
@Component({
  selector: 'page-tab-setting',
  templateUrl: 'tab-setting.html',
  providers: [
    CallApi,
    AppUtilService,
    SinghaSurveyService]
})

export class TabSetting {
  profileData = {
    fullname: '',
    image: '',
    mobile: '',
    type: '',
    area: [{
      province: '',
      ampher: []
    }]
  };

  constructor(public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public util: AppUtilService,
    public service: SinghaSurveyService,
    @Inject(ConfigApp) public config: IAppConfig) {
    this.plt.ready().then(() => {

    })
  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    this.profile();
  }

  profile() {
    this.util.showLoading();
    this.service.profile()
      .then(
      (result: ProfileModel) => {
        this.util.hideLoading();
        this.profileData = result.data;
        console.log(this.profileData);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  announceChangeArea() {
    this.app.getRootNav().push('AnnounceChangeAreaPage', {data: this.profileData});
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
