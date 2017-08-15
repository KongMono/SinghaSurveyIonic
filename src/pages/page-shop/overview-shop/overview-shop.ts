import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ViewController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";

@IonicPage()
@Component({
  selector: 'page-overview-shop',
  templateUrl: 'overview-shop.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class OverviewShopPage {
  customersCycleData = {};

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public viewCtrl: ViewController,
    @Inject(ConfigApp) private config: IAppConfig) {
  }

  ionViewDidLoad() {
    this.customersCycleData = this.navParams.get('data');
    console.log(this.customersCycleData);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
