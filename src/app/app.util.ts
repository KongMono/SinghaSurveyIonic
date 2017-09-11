import { Injectable, Inject } from '@angular/core';
import { LoadingController } from "ionic-angular";
import { ConfigApp, IAppConfig } from "./app.config";
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ToastController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class AppUtilService {
    loading: any;
    constructor(
        private loadingCtrl: LoadingController,
        public storage: Storage,
        private toastCtrl: ToastController,
        private appVersion: AppVersion,
        @Inject(ConfigApp) private config: IAppConfig) {

    }

    public loadData(): any {
        let ls = [];
        ls.push(this.storage.get('userinfo'));
        ls.push(this.storage.get('logged'));
        ls.push(this.storage.get('pin_logged'));
        return ls;
    }

    public setDataInfo(userinfo) {
        this.storage.set('userinfo', userinfo);
        this.config.userInfo = userinfo;
    }

    public setLogin() {
        this.storage.set('logged', true);
        this.config.isLogged = true;
    }

    public setPin(pin) {
        this.storage.set('pin_logged', pin);
        this.config.pin_logged = pin;
    }

    public logout() {
        this.storage.set('logged', false);
        this.storage.set('pin_logged', null);
        this.storage.set('userinfo', null);
    }

    public isEmpty(data: string): boolean {
        if (data == null || data == '') return true;
        else return false;

    }

    public showLoading() {
        this.loading = this.loadingCtrl.create({
            spinner: 'crescent',
            showBackdrop: false
        });
        this.loading.present();
    }

    public hideLoading() {
        this.loading.dismissAll();
    }

    public setVersion() {
        this.appVersion.getVersionNumber().then(resVerNum => {
            this.config.versionApp = resVerNum;
            this.appVersion.getVersionCode().then(resVerCode => {
                this.config.versionBuild = resVerCode;
                console.log(this.config.versionApp);
                console.log(this.config.versionBuild);
            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });
    }

    public setFormatDateYearBE(date, formatDate) {
        moment.locale('th');
        let yearBE = moment(date, 'YYYY-MM-DD').year() + 543;
        let valueBE = moment(date, 'YYYY-MM-DD').year(yearBE).format(formatDate);
        return valueBE;
    }

    public showAlertDialog(text) {

        let toast = this.toastCtrl.create({
            message: text,
            duration: 1500,
            position: 'bottom'
        });

        toast.present();
    }
}
