import { AppConfig } from './../../../app/app.config';
import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ModalController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AppUtilService } from "../../../app/app.util";
import { SinghaSurveyService } from "../../../providers/service";
import { CallApi } from "../../../providers/call-api";
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-view-schedule',
    templateUrl: 'view-schedule.html',
    providers: [
        CallApi,
        SinghaSurveyService,
        AppUtilService]
})

export class ViewSchedulePage {
    data: any;
    latlong: string;
    scheduleView: scheduleViewModel;
    scheduleCalendar: any;

    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.

    constructor(
        public app: App,
        private http: Http,
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: SinghaSurveyService,
        public util: AppUtilService,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController) {
        this.data = navParams.get('data');
        console.log(this.data.schedule_id);
    }

    ionViewDidLoad() {
        this.callGetScheduleView();
    }

    backPage() {
        this.app.getRootNav().pop({ animate: true, animation: 'transition', direction: 'back' });
    }

    overviewSchedule() {
        this.scheduleCalendar = '';
    }

    callGetScheduleView() {
        this.util.showLoading();
        this.service.getScheduleView(this.data.schedule_id)
            .then((result: scheduleViewModel) => {
                this.scheduleView = result;
                this.loadEvents(this.scheduleView);
                setTimeout(() => {
                    this.overviewSchedule();
                }, 100);
                this.util.hideLoading();
            }, error => {
                this.util.hideLoading();
                console.log(error.message);
            });
    }

    loadEvents(scheduleView) {
        // this.eventSource = this.createRandomEvents();
        this.eventSource = [];
        for (var i = 0; i < scheduleView.calendar.length; i++) {
            this.createEvents(scheduleView.calendar[i].date);
        }
    }
    createEvents(dateValue) {
        var setDate = new Date(dateValue);
        console.log(date);
        var date = new Date(setDate.getUTCFullYear(), setDate.getUTCMonth(), setDate.getUTCDate() + 1);
        this.eventSource.push({
            title: '',
            startTime: date,
            endTime: date,
            allDay: true
        });
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);

        let noSchedule: boolean = true;
        let toast;
        console.log(toast);
        if (toast) {
            console.log('toast');
            toast.dismiss();
        }
        this.scheduleCalendar = '';
        let dateSelect = moment(ev.selectedTime).format('YYYY-MM-DD');
        for (var i = 0; i < this.scheduleView.calendar.length; i++) {
            if (this.scheduleView.calendar[i].date == dateSelect) {
                noSchedule = false;
                this.scheduleCalendar = this.scheduleView.calendar[i];
                // bug cannot replace scheduleCalendar.date
                this.scheduleCalendar.newFormatDate = this.util.setFormatDateYearBE(this.scheduleView.calendar[i].date, 'D MMM YYYY');
                return
            }
        }
        if (noSchedule) {
            // this.util.showAlertDialog('ไม่มีข้อมูล');

            toast = this.toastCtrl.create({
                message: 'ไม่มีข้อมูล',
                duration: 3000,
                position: 'bottom'
            });
            // toast.onDidDismiss(() => {
            //     console.log('Dismissed toast');
            // });
            toast.present();
        }
    }
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    }
}
