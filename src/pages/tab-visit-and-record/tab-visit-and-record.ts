import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController, ActionSheetController } from 'ionic-angular';
import { CallApi } from './../../providers/call-api';
import { SinghaSurveyService } from './../../providers/service';
import { AppUtilService } from './../../app/app.util';
import { ConfigApp, IAppConfig } from './../../app/app.config';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-tab-visit-and-record',
  templateUrl: 'tab-visit-and-record.html',
  providers: [
    CallApi,
    SinghaSurveyService]
})

export class TabVisitAndRecord {
  visitListData = []
  offset: number = 0;
  limit: number = 10;
  infiniteScroll: any;
  visitCycleData: VisitCycleModel;
  customersVisitList = [];
  actionSheet: any;
  showCheckNameDialog: boolean = true;
  waitData: boolean = false;
  actionScroll: any = 'up';
  private latLong = {
    lat: 0.0,
    long: 0.0
  }

  constructor(
    public app: App,
    private geolocation: Geolocation,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    @Inject(ConfigApp) private config: IAppConfig) {

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.latLong.lat = resp.coords.latitude;
        this.latLong.long = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  ionViewWillEnter() {
    
  }

  searchVisit() {
    this.app.getRootNav().push('SearchVisitPage');
  }

  ionViewDidLoad() {
    this.calVisitList();

    setInterval(() => {
      // call interval fix binding actionScroll hide fab
    });
  }

  scrollHandler(event) {
    if (this.actionScroll != event.directionY) {
      this.actionScroll = event.directionY;
      // console.log(this.actionScroll);
    }
  }

  overviewVisit() {
    this.util.showLoading();
    this.service.visitCycle()
      .then(
      (result: VisitCycleModel) => {
        this.util.hideLoading();
        this.visitCycleData = result;
        let modal = this.modalCtrl.create('OverviewVisitPage', { data: this.visitCycleData }, {
          cssClass: 'override-modal-overview-visit'
        });
        modal.present();
      });
  }

  calVisitList() {
    this.waitData = true;
    this.util.showLoading();
    this.service.visitList(this.limit, this.offset)
      .then(
      (result: VisitListModel) => {
        this.util.hideLoading();
        this.visitListData = result.data;
        setTimeout(() => {
          this.waitData = false;
        }, 800);

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

        console.log(this.visitListData);
        this.changeFormatDate();
      }, error => {
        this.util.hideLoading();
        setTimeout(() => {
          this.waitData = false;
        }, 800);
        console.log(error);
      });
  }

  pullRefresh(refresher) {
    this.offset = 0;
    this.visitListData = [];
    this.waitData = true;
    this.service.visitList(this.limit, this.offset)
      .then(
      (result: VisitListModel) => {
        this.visitListData = result.data;

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

        this.changeFormatDate();
        refresher.complete();
        setTimeout(() => {
          this.waitData = false;
        }, 300);
      }, error => {
        refresher.complete();
        setTimeout(() => {
          this.waitData = false;
        }, 300);
        console.log(error);
      });
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.offset += this.limit;
    this.service.visitList(this.limit, this.offset)
      .then(
      (result: VisitListModel) => {
        this.visitListData = this.visitListData.concat(this.changeFormatDateOffset(result.data));

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
    for (var i = 0; i < this.visitListData.length; i++) {
      this.visitListData[i].created_date = this.util.setFormatDateYearBE(this.visitListData[i].created_date, 'D MMM YYYY');
    }
  }

  changeFormatDateOffset(data) {
    let visitListData = data;
    for (var i = 0; i < visitListData.length; i++) {
      visitListData[i].created_date = this.util.setFormatDateYearBE(visitListData[i].created_date, 'D MMM YYYY');
    }
    return visitListData;
  }

  checkFab() {
    if (this.actionScroll == 'down')
      return 'animated bounceOutDown'
    else
      return 'animated bounceInUp'
  }


  checkNameVisit() {
    this.util.showLoading();
    this.service.visitCustomersListCheck(this.latLong.lat, this.latLong.long)
      .then(
      (result: visitCustomersListModel) => {
        this.util.hideLoading();
        this.showCheckNameDialog = false;
        this.customersVisitList = result.data;
        let modal = this.modalCtrl.create('CheckNameVisitPage', { data: this.customersVisitList }, {
          cssClass: 'override-modal-check-name-visit',
          enterAnimation: '',
          leaveAnimation: ''
        });

        modal.onDidDismiss(data => {
          this.showCheckNameDialog = true;
        });

        modal.present();


      }, error => {
        console.log(error);
      });
  }

  onClick(visit_id: any) {
    this.app.getRootNav().push('EditVisitPage', {
      data: visit_id, callback: this.pushCallback
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
              data: visit.visit_id, callback: this.pushCallback
            });
          }
        }
      ]
    });
    this.actionSheet.present();
  }

  pushCallback = () => {
    return new Promise(resolve => {
      this.calVisitList();
      resolve();
    });
  }
}
