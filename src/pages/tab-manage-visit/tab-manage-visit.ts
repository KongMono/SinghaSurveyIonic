import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App, ModalController } from 'ionic-angular';
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
  scheduleCycleList = [];
  offset: number = 0;
  limit: number = 10;
  infiniteScroll: any;
  waitData: boolean = false;
  actionScroll: any = 'up';
  actionSheet: any;
  showCheckNameDialog: boolean = true;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    this.callScheduleList();

    setInterval(() => {
      // call interval fix binding actionScroll hide fab
    });
  }

  scrollHandler(event) {
    if (this.actionScroll != event.directionY) {
      this.actionScroll = event.directionY;
    }
  }

  callScheduleList() {
    this.offset = 0;
    this.waitData = true;
    this.util.showLoading();
    this.service.scheduleList(this.limit, this.offset)
      .then(
      (result: ScheduleListModel) => {
        this.util.hideLoading();
        this.scheduleListData = result.data;
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
    this.scheduleListData = [];
    this.waitData = true;
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

  addSchedule() {
    this.util.showLoading();
    this.service.getScheduleCycleList()
      .then(
      (result: scheduleCycleListModel) => {
        this.util.hideLoading();

        if (result.data.length == 0) {
          this.util.showAlertDialog("ไม่มีข้อมูลรอบ");
          return;
        }

        this.showCheckNameDialog = false;
        this.scheduleCycleList = result.data;
        let modal = this.modalCtrl.create('SelectNameSchedulePage', { data: this.scheduleCycleList }, {
          cssClass: 'override-modal-add-schedule',
          enterAnimation: '',
          leaveAnimation: ''
        });

        modal.onDidDismiss(data => {
          this.showCheckNameDialog = true;
          this.callScheduleList();
        });

        modal.present();
      }, error => {
        console.log(error);
      });
  }

  onClick(schedule: any) {
    this.app.getRootNav().push('ViewSchedulePage', {
      data: {
        schedule_id: schedule.schedule_id,
        title: schedule.name
      }
    }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  checkFab() {
    if (this.actionScroll == 'down')
      return 'animated bounceOutDown'
    else
      return 'animated bounceInUp'
  }

  onLongPress(schedule: any) {
    if (this.actionSheet) {
      this.actionSheet.dismiss();
    }

    let buttons = [
      {
        icon: '_icon-map',
        text: 'ปฎิทิน',
        handler: () => {
          this.app.getRootNav().push('ViewSchedulePage', {
            data: {
              schedule_id: schedule.schedule_id,
              title: schedule.name
            }
          }, { animate: true, animation: 'transition', direction: 'forward' });
        }
      }, {
        icon: '_icon-visit',
        text: 'แก้ไข',
        handler: () => {
          this.app.getRootNav().push('EditSchedulePage', {
            data: {
              schedule_id: schedule.schedule_id,
              isEdit: true
            }
          });
        }
      }
    ]

    if (schedule.can_delete != "0") {
      buttons.push({
        icon: '_icon-trash',
        text: 'ลบ',
        handler: () => {
          this.service.deleteSchedule(schedule.schedule_id)
            .then((result) => {
              this.util.hideLoading();
              this.util.showAlertDialog(result.msg);
              this.callScheduleList();
            });
        }
      });
    }

    this.actionSheet = this.actionSheetCtrl.create({
      buttons
    });

    this.actionSheet.present();
  }
}
