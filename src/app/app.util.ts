import { Injectable, Inject } from '@angular/core';
import { LoadingController, AlertController } from "ionic-angular";
import { ConfigApp, IAppConfig } from "./app.config";
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Dialogs } from '@ionic-native/dialogs';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AppUtilService {
    public dialogs: Dialogs;
    loading: any;
    constructor(
        private loadingCtrl: LoadingController,
        public storage: Storage,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
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

    public setFormatDateYearBE(date, formatDate) {
        moment.locale('th');
        let yearBE = moment(date, 'YYYY-MM-DD').year() + 543;
        let valueBE = moment(date, 'YYYY-MM-DD').year(yearBE).format(formatDate);
        return valueBE;
    }

    public showAlertDialog(text) {
        if (this.config.isBuildDevice) {
            this.dialogs.alert(text)
                .then(() => console.log('Dialog dismissed'))
                .catch(e => console.log('Error displaying dialog', e));
        } else {
            let toast = this.toastCtrl.create({
                message: text,
                duration: 3000,
                position: 'bottom'
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });

            toast.present();
        }
    }
}
