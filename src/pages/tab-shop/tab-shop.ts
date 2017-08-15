import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Refresher, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { SinghaSurveyService } from "../../providers/service";
import { CallApi } from "../../providers/call-api";
import { ConfigApp, IAppConfig } from "../../app/app.config";
import { AppUtilService } from './../../app/app.util';

@IonicPage()
@Component({
  selector: 'page-tab-shop',
  templateUrl: 'tab-shop.html',
  providers: [CallApi, SinghaSurveyService]
})

export class TabShop {
  customersListData = [];
  customersList = [];
  offset: number = 0;
  limit: number = 20;
  refresher: Refresher;
  infiniteScroll: any;
  actionSheet: any;
  showCheckNameDialog: boolean = true;
  customersCycleData: CustomersCycleModel;
  filterData = {
    sortArea: true,
    sortPlan: false,
    order: 1
  }

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  ionViewWillEnter() {

  }

  pullRefresh(refresher) {
    this.offset = 0;
    this.refresher = refresher;
    this.callRefreshCustomerList();
  }

  ionViewDidLoad() {
    this.callCustomerList();
  }

  overviewShop() {
    this.util.showLoading();
    this.service.customersCycle()
      .then(
      (result: CustomersCycleModel) => {
        this.util.hideLoading();
        this.customersCycleData = result;
        let modal = this.modalCtrl.create('OverviewShopPage', { data: this.customersCycleData }, {
          cssClass: 'override-modal-overview-shop'
        });
        modal.present();
      });
  }

  filter() {
    let alert = this.alertCtrl.create({
      cssClass: 'override-alret-filter'
    });
    alert.addInput({
      type: 'radio',
      label: 'ตามพื้นที่',
      value: '1',
      checked: this.filterData.sortArea,
      handler: data => {
        if (this.filterData.order != data.value) {
          this.filterData.sortArea = true;
          this.filterData.sortPlan = false;
          this.filterData.order = data.value;
          this.callCustomerList();
        }
        alert.dismiss();
      }
    });
    alert.addInput({
      type: 'radio',
      label: 'ตามแผน',
      value: '2',
      checked: this.filterData.sortPlan,
      handler: data => {
        if (this.filterData.order != data.value) {
          this.filterData.sortArea = false;
          this.filterData.sortPlan = true;
          this.filterData.order = data.value;
          this.callCustomerList();
        }
        alert.dismiss();
      }
    });
    alert.present();
  }

  searchShop() {
    this.app.getRootNav().push('SearchShopsPage');
  }

  callRefreshCustomerList() {
    this.customersListData = [];
    this.service.customersList(this.limit, this.offset, this.filterData.order)
      .then(
      (result: CustomersListModel) => {
        this.customersListData = result.data;

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

        if (this.refresher) {
          this.refresher.complete();
        }
      }, error => {
        this.refresher.complete();
        console.log(error);
      });
  }

  callCustomerList() {
    this.offset = 0;
    this.customersListData = [];
    this.util.showLoading();
    this.service.customersList(this.limit, this.offset, this.filterData.order)
      .then(
      (result: CustomersListModel) => {
        this.util.hideLoading();
        this.customersListData = result.data;

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.offset += this.limit;
    this.service.customersList(this.limit, this.offset, this.filterData.order)
      .then(
      (result: CustomersListModel) => {
        this.customersListData = this.customersListData.concat(result.data);

        if (result.data.length === 0) {
          this.infiniteScroll.enable(false);
        } else {
          this.infiniteScroll.enable(true);
        }

        this.infiniteScroll.complete();
      }, error => {
        this.infiniteScroll.complete();
        console.log(error);
      });
  }

  addShop() {
    this.util.showLoading();
    this.service.customersCheck()
      .then(
      (result: customersCheckModel) => {
        this.util.hideLoading();
        this.showCheckNameDialog = false;
        this.customersList = result.customers;
        let modal = this.modalCtrl.create('CheckNameShopPage', { data: this.customersList }, {
          cssClass: 'override-modal-add-shop',
          enterAnimation: '',
          leaveAnimation: ''
        });

        modal.onDidDismiss(data => {
          this.showCheckNameDialog = true;
        });

        modal.present();


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
}
