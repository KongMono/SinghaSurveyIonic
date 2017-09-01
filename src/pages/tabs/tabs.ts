import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from "../../app/app.util";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class Tabs {
  tabs: any;

  @ViewChild('Tabs') tabsRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService) {
    this.tabs = [
      {
        'icon': '_icon-dashboard',
        'root': 'TabShop'
      },
      {
        'icon': '_icon-visit',
        'root': 'TabVisitAndRecord'
      },
      {
        'icon': '_icon-overtime',
        'root': 'TabManageVisit'
      },
      {
        'icon': '_icon-settings',
        'root': 'TabSetting'
      }
    ]
  }

  onTabsChange() {
    var tab_index = this.tabsRef.getSelected().index;
    // this.callCheckVersion();
  }

  callCheckVersion() {
    this.service.checkVersion()
      .then(result => {
        this.util.showAlertDialog(result);
      }, error => {
        console.log(error.message);
      });
  }

}
