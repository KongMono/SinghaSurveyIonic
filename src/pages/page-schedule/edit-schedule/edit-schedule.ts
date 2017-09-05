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
    schedule_id: any;
    latlong: string;

    constructor(
        public app: App,
        private http: Http,
        public navCtrl: NavController,
        private geolocation: Geolocation,
        public navParams: NavParams,
        public service: SinghaSurveyService,
        public util: AppUtilService,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController) {
        this.schedule_id = navParams.get('data');
        console.log(this.schedule_id);
    }


    ionViewDidLoad() {
    }


    backPage() {
        this.app.getRootNav().pop({ animate: true, animation: 'transition', direction: 'back' });
    }
}
