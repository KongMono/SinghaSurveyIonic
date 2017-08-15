import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";

@IonicPage()
@Component({
  selector: 'page-search-visit',
  templateUrl: 'search-visit.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class SearchVisitPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public app: App,
    @Inject(ConfigApp) private config: IAppConfig) {
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  searchVisit() {
    
  }
}
