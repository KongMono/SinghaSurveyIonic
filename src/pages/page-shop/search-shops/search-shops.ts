import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ActionSheetController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";


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
        this.app.getRootNav().pop();
    }

    ionViewDidLoad() {
        this.callgetOptionSearch();
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
            this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].tumbol[this.indexTumbol].tumbol_id)
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
