import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ViewController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";

@IonicPage()
@Component({
  selector: 'page-overview-visit',
  templateUrl: 'overview-visit.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class OverviewVisitPage {
  visitCycleData = {};

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
    this.visitCycleData = this.navParams.get('data');
    console.log(this.visitCycleData);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
