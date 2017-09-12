import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from "../../app/app.util";
import { IAppConfig, ConfigApp } from '../../app/app.config';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

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

  constructor(
    @Inject(ConfigApp) private config: IAppConfig,
    private locationAccuracy: LocationAccuracy,
    public navCtrl: NavController,
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
    this.enableLocation();
    this.callCheckVersion();
  }

  callCheckVersion() {
    this.service.checkVersion()
      .then(result => {
        // result.data[0].value  -> versioncode
        // this.util.showAlertDialog(result.data[0].value);
      }, error => {
        console.log(error.message);
      });
  }


  enableLocation() {
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

}
