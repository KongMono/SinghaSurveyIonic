import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApi } from './../../providers/call-api';
import { SinghaSurveyService } from './../../providers/service';
import { AppUtilService } from './../../app/app.util';
import { ConfigApp, IAppConfig } from './../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-tab-manage-visit',
  templateUrl: 'tab-manage-visit.html',
  providers: [CallApi, SinghaSurveyService]
})

export class TabManageVisit {
  scheduleListData = []
  offset: number = 0;
  limit: number = 10;
  infiniteScroll: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    this.calScheduleList();
  }

  calScheduleList() {
    this.offset = 0;
    this.util.showLoading();
    this.service.scheduleList(this.limit, this.offset)
      .then(
      (result: ScheduleListModel) => {
        this.util.hideLoading();
        this.scheduleListData = result.data;

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

        this.changeFormatDate();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  pullRefresh(refresher) {
    this.offset = 0;
    this.scheduleListData = [];
    this.service.scheduleList(this.limit, this.offset)
      .then(
      (result: ScheduleListModel) => {
        this.scheduleListData = result.data;

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

        this.changeFormatDate();
        refresher.complete();
      }, error => {
        refresher.complete();
        console.log(error);
      });
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.offset += this.limit;
    this.service.scheduleList(this.limit, this.offset)
      .then(
      (result: ScheduleListModel) => {
        this.scheduleListData = this.scheduleListData.concat(this.changeFormatDateOffset(result.data));

        if (result.data.length === 0) {
          infiniteScroll.enable(false);
        } else {
          infiniteScroll.enable(true);
        }

        infiniteScroll.complete();
      }, error => {
        infiniteScroll.complete();
        console.log(error);
      });
  }

  changeFormatDate() {
    for (var i = 0; i < this.scheduleListData.length; i++) {
      this.scheduleListData[i].start_date = this.util.setFormatDateYearBE(this.scheduleListData[i].start_date, 'D MMM YYYY');
      this.scheduleListData[i].end_date = this.util.setFormatDateYearBE(this.scheduleListData[i].end_date, 'D MMM YYYY');
    }
  }

  changeFormatDateOffset(data) {
    let scheduleListData = data;
    for (var i = 0; i < scheduleListData.length; i++) {
      scheduleListData[i].start_date = this.util.setFormatDateYearBE(scheduleListData[i].created_date, 'D MMM YYYY');
      scheduleListData[i].end_date = this.util.setFormatDateYearBE(scheduleListData[i].created_date, 'D MMM YYYY');
    }
    return scheduleListData;
  }
}
