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
    order: "1"
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

  filter(result: CustomerFilterModel) {
    let alert = this.alertCtrl.create({
      cssClass: 'override-alret-filter'
    });

    for (let entry of result.select) {
      alert.addInput({
        type: 'radio',
        label: entry.name,
        value: entry.id,
        checked: entry.id == this.filterData.order,
        handler: data => {
          if (this.filterData.order != data.value) {
            this.filterData.order = data.value;
            this.callCustomerList();
          }
          alert.dismiss();
        }
      });
    }
    alert.present();
  }

  searchShop() {
    this.app.getRootNav().push('SearchShopsPage', {}, { animate: true, animation: 'transition', direction: 'forward' });
  }

  calloptionCustomerFilter() {
    this.util.showLoading();
    this.service.optionCustomerFilter()
      .then(
      (result: CustomerFilterModel) => {
        this.util.hideLoading();
        this.filter(result);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
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
            setTimeout(() => {
              this.app.getRootNav().push('EditShopsPage', {
                data: customer.customer_id
              });
            }, 0);
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
    if (this.actionSheet) {
      this.actionSheet.dismiss();
    }
    this.actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: '_icon-map',
          text: 'แผนที่',
          handler: () => {
            this.app.getRootNav().push('ViewMapPage', {
              data: {
                title: customer.name,
                latitude: customer.latitude,
                longitude: customer.longitude
              }
            }, { animate: true, animation: 'transition', direction: 'forward' });
          }
        }, {
          icon: '_icon-visit',
          text: 'แก้ไข',
          handler: () => {
            this.app.getRootNav().push('EditShopsPage', {
              data: customer.customer_id
            });
          }
        }, {
          icon: '_icon-trash',
          text: 'ลบ',
          handler: () => {
            this.service.deleteCustomer(customer.customer_id)
              .then((result) => {
                this.util.hideLoading();
                this.util.showAlertDialog(result.msg);
                this.callCustomerList();
              });
          }
        }
      ]
    });
    this.actionSheet.present();
  }
}
