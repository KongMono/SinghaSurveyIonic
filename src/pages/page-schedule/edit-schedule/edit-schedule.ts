import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AppUtilService } from "../../../app/app.util";
import { SinghaSurveyService } from "../../../providers/service";
import { CallApi } from "../../../providers/call-api";

@IonicPage()
@Component({
    selector: 'page-edit-schedule',
    templateUrl: 'edit-schedule.html',
    providers: [
        CallApi,
        SinghaSurveyService,
        AppUtilService]
})

export class EditSchedulePage {
    data: any;
    latlong: string;
    scheduleDetailList: ScheduleDetailListModel;
    optionSchedule: OptionScheduleModel;

    constructor(
        public app: App,
        private http: Http,
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: SinghaSurveyService,
        public util: AppUtilService,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController) {
        this.data = navParams.get('data');
        console.log(this.data.schedule_id);
    }

    ionViewDidLoad() {
        this.callGetOptionSchedule();
    }

    backPage() {
        this.app.getRootNav().pop({ animate: true, animation: 'transition', direction: 'back' });
    }

    callGetOptionSchedule() {
        this.util.showLoading();
        this.service.getOptionSchedule(this.data.schedule_id)
            .then((result: OptionScheduleModel) => {
                this.optionSchedule = result;
                this.callGetScheduleDetailList();
            }, error => {
                this.util.hideLoading();
                console.log(error.message);
            });
    }
    callGetScheduleDetailList() {
        this.service.getScheduleDetailList(this.data.schedule_id)
            .then((result: ScheduleDetailListModel) => {
                this.scheduleDetailList = result;
                if (this.scheduleDetailList) {
                    this.scheduleDetailList.start_date = this.util.setFormatDateYearBE(this.scheduleDetailList.start_date, 'D MMM YYYY');
                    this.scheduleDetailList.end_date = this.util.setFormatDateYearBE(this.scheduleDetailList.end_date, 'D MMM YYYY');
                    if (this.scheduleDetailList.plan) {
                        for (var i = 0; i < this.scheduleDetailList.plan.length; i++) {
                            this.scheduleDetailList.plan[i].date = this.util.setFormatDateYearBE(this.scheduleDetailList.plan[i].date, 'D MMM YYYY');
                        }
                    }
                }
                this.util.hideLoading();
            }, error => {
                this.util.hideLoading();
                console.log(error.message);
            });
    }

    plan() {
        this.navCtrl.push('PlanSchedulePage', { data: this.scheduleDetailList.plan, optionSchedule: this.optionSchedule, callback: this.planCallback },
            { animate: true, animation: 'transition', direction: 'forward' });
    }

    planCallback = (_params) => {
        return new Promise(resolve => {
            console.log(_params);
            if (_params) {
                this.scheduleDetailList.plan = _params;
              this.callUpdatedSchedule();
              resolve();
            } else {
              resolve();
            }
            // if (this.scheduleDetailList.plan.length != _params.plan.length) {
            //     resolve();
            //     this.callUpdatedSchedule();
            // } else {
            //     resolve();
            // }
        });
    }

    actionSheetInPlan(index) {
        if (this.scheduleDetailList.plan[index].can_delete == '1') {
            let actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        icon: '_icon-delete_file',
                        text: 'ลบ',
                        handler: () => {
                            this.removeDataInPlan(index);
                        }
                    }
                ]
            });
            actionSheet.present();
        } else {
            this.util.showAlertDialog("คุณไม่มีสิทธิ์ลบรายการนี้");
        }
    }

    removeDataInPlan(index) {
        this.scheduleDetailList.plan.splice(index, 1);
        this.callUpdatedSchedule();
    }

    callUpdatedSchedule() {
        this.util.showLoading();
        this.service.updatedSchedule(
            this.data.schedule_id,
            this.scheduleDetailList.cycle_id,
            JSON.stringify(this.scheduleDetailList.plan))
            .then((result) => {
                this.util.showAlertDialog(result.msg);
                this.util.hideLoading();
                this.callGetOptionSchedule();
            }, error => {
                this.util.hideLoading();
                console.log(error.message);
            });
    }
}
