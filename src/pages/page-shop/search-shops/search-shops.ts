import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ActionSheetController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";

@IonicPage()
@Component({
    selector: 'page-search-shops',
    templateUrl: 'search-shops.html',
    providers: [
        CallApi,
        SinghaSurveyService,
        AppUtilService]
})

export class SearchShopsPage {
    keyName: string;
    indexProvince = 0;
    indexAmpher = 0;
    indexTumbol = 0;
    customersListData = [];
    actionSheet: any;
    optionCustomer: OptionSearchCustomerModel;
    actionScroll: any = 'up';

    constructor(
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public service: SinghaSurveyService,
        public util: AppUtilService,
        @Inject(ConfigApp) private config: IAppConfig) {
    }

    backPage() {
        this.app.getRootNav().pop({ animate: true, animation: 'transition', direction: 'back' });
    }

    ionViewDidLoad() {
        this.callgetOptionSearch();

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

    callgetOptionSearch() {
        this.util.showLoading();
        this.service.optionsSearch()
            .then(
            (result: OptionSearchCustomerModel) => {
                this.util.hideLoading();
                this.optionCustomer = result;
            }, error => {
                console.log(error);
            });
    }

    selectOption(action) {
        let title, listSelectOption, keyOption, indexSelect;
        if (action == 'province') {
            title = 'เลือกจังหวัด';
            listSelectOption = this.optionCustomer.province;
            keyOption = 'province_th';
            indexSelect = this.indexProvince;
        } else if (action == 'ampher') {
            title = 'เลือกอำเภอ';
            listSelectOption = this.optionCustomer.province[this.indexProvince].ampher;
            keyOption = 'ampher_th';
            indexSelect = this.indexAmpher;
        } else if (action == 'tumbol') {
            title = 'เลือกตำบล';
            listSelectOption = this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].tumbol;
            keyOption = 'tumbol_th';
            indexSelect = this.indexTumbol;
        }
        this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
    }

    selectOptionCallback = (_params) => {
        return new Promise(resolve => {
            if (_params.action == 'province') {
                if (this.indexProvince != _params.indexSelect) {
                    this.indexAmpher = 0;
                    this.indexTumbol = 0;
                }
                this.indexProvince = _params.indexSelect;
                resolve();
            } else if (_params.action == 'ampher') {
                if (this.indexAmpher != _params.indexSelect) {
                    this.indexTumbol = 0;
                }
                this.indexAmpher = _params.indexSelect;
                resolve();
            } else if (_params.action == 'tumbol') {
                this.indexTumbol = _params.indexSelect;
                resolve();
            } else {
                resolve();
            }
        });
    }

    onClick(customer: any) {
        console.log("onClick");
        console.log("customer_id", customer.customer_id);
        if (this.actionSheet) {
            this.actionSheet.dismiss();
        }
        this.actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    icon: '_icon-dashboard',
                    text: 'รายละเอียด',
                    handler: () => {
                        console.log('Infomation clicked');
                        this.app.getRootNav().push('EditShopsPage', {
                            data: customer.customer_id
                        });
                    }
                }, {
                    icon: '_icon-visit',
                    text: 'เข้าเยี่ยม',
                    handler: () => {
                        console.log('Visit clicked');
                    }
                }
            ]
        });
        this.actionSheet.present();
    }

    onLongPress(customer: any) {
        console.log("onLongPress");
        console.log(customer);
        if (this.actionSheet) {
            this.actionSheet.dismiss();
        }
        this.actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    icon: '_icon-map',
                    text: 'แผนที่',
                    handler: () => {
                        console.log('Map clicked');
                        this.app.getRootNav().push('ViewMapPage', {
                            data: customer
                        });
                    }
                }, {
                    icon: '_icon-visit',
                    text: 'แก้ไข',
                    handler: () => {
                        console.log('Edit clicked');
                        this.app.getRootNav().push('EditShopsPage', {
                            data: customer
                        });
                    }
                }, {
                    icon: '_icon-trash',
                    text: 'ลบ',
                    handler: () => {
                        console.log('Trash clicked');
                    }
                }
            ]
        });
        this.actionSheet.present();
    }

    callSearchCustomer() {

        let name: string = "";

        if (this.keyName) {
            name = this.keyName
        }
        this.util.showLoading();
        this.service.searchCustomer(name,
            this.optionCustomer.province[this.indexProvince].province_id,
            this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].ampher_id,
            this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].tumbol[this.indexTumbol].tumbol_id,
            this.config.latitude, this.config.longitude)
            .then(
            (result) => {
                this.util.hideLoading();
                this.customersListData = result.data;
                console.log(result);
            }, error => {
                this.util.hideLoading();
                console.log(error);
            });
    }

    SearchShop() {
        this.callSearchCustomer();
    }

}
