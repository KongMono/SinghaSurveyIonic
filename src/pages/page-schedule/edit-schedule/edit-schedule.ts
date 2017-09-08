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
                this.callGetScheduleDetailList();
            }, error => {
                this.util.hideLoading();
                console.log(error.message);
            });
    }
    callGetScheduleDetailList() {
        this.service.getScheduleDetailList(this.data.schedule_id)
            .then((result: ScheduleDetailListModel) => {
                this.util.hideLoading();
            }, error => {
                this.util.hideLoading();
                console.log(error.message);
            });
    }
}
