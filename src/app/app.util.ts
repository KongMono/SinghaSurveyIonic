import { Injectable, Inject, Component } from '@angular/core';
import { AlertController, ModalController, Modal, ModalOptions, LoadingController } from "ionic-angular";
import { ConfigApp, IAppConfig } from "./app.config";
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Injectable()
export class AppUtilService {

    loading: any;
    constructor(
        private loadingCtrl: LoadingController,
        public storage: Storage,
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
            showBackdrop: true
        });
        this.loading.present();
    }

    public hideLoading() {
        this.loading.dismissAll();
    }

    public setFormatDateYearBE(date, formatDate) {
        moment.locale('th');
        let yearBE = moment(date, 'YYYY-MM-DD').year() + 543;
        let valueBE = moment(date, 'YYYY-MM-DD').year(yearBE).format(formatDate);
        return valueBE;
    }
}
