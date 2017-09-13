import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ActionSheetController } from 'ionic-angular';
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
  customersVisitList = [];
  keyName: string;
  endDate: string;
  actionSheet: any;
  startDate: string;
  actionScroll: any = 'up';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public actionSheetCtrl: ActionSheetController,
    public app: App,
    @Inject(ConfigApp) public config: IAppConfig) {
  }

  ionViewDidLoad() {
    setInterval(() => {
      // call interval fix binding actionScroll hide fab
    });
  }

  scrollHandler(event) {
    if (this.actionScroll != event.directionY) {
      this.actionScroll = event.directionY;
      console.log(this.actionScroll);
    }
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  searchVisit() {
    this.searchVisitCustomer();
  }

  changeFormatDate() {
    for (var i = 0; i < this.customersVisitList.length; i++) {
      this.customersVisitList[i].created_date = this.util.setFormatDateYearBE(this.customersVisitList[i].created_date, 'D MMM YYYY');
    }
  }

  searchVisitCustomer() {
    let name: string = "";

    if (this.keyName) {
      name = this.keyName
    }
    this.util.showLoading();
    this.service.searchVisitCustomer(name, this.startDate, this.endDate)
      .then(
      (result: visitCustomersListModel) => {
        this.util.hideLoading();
        this.customersVisitList = result.data;
        this.changeFormatDate();
        console.log(result);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  onClick(visit_id: any) {
    this.app.getRootNav().push('EditVisitPage', {
      data: visit_id
    });
  }

  onLongPress(visit: any) {
    if (this.actionSheet) {
      this.actionSheet.dismiss();
    }
    this.actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: '_icon-map',
          text: 'แผนที่',
          handler: () => {
            this.app.getRootNav().push('ViewMapPage', {
              data: {
                title: visit.customer_name,
                latitude: visit.latitude,
                longitude: visit.longitude
              }
            }, { animate: true, animation: 'transition', direction: 'forward' });
          }
        }, {
          icon: '_icon-visit',
          text: 'แก้ไข',
          handler: () => {
            this.app.getRootNav().push('EditVisitPage', {
              data: visit.visit_id
            });
          }
        }
      ]
    });
    this.actionSheet.present();
  }

}
