import { Component, Inject, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Refresher, AlertController, ActionSheetController, ModalController, Content } from 'ionic-angular';
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
  limit: number = 10;
  refresher: Refresher;
  infiniteScroll: any;
  actionSheet: any;
  showCheckNameDialog: boolean = true;
  customersCycleData: CustomersCycleModel;
  filterData = {
    order: "1"
  }
  waitData: boolean = false;
  actionScroll: any = 'up';

  public scrollAmount = 0;
  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public zone: NgZone,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  scrollHandler(event) {
    if (this.actionScroll != event.directionY) {
      this.actionScroll = event.directionY;
      // console.log(this.actionScroll);
    }
  }

  pullRefresh(refresher) {
    this.offset = 0;
    this.waitData = true;
    this.refresher = refresher;
    this.callRefreshCustomerList();
  }

  ionViewWillEnter() {
    this.actionScroll = 'up';
  }

  ionViewDidLoad() {
    this.callCustomerList();

    setInterval(() => {
      // call interval fix binding actionScroll hide fab
    });
  }

  checkFab() {
    if (this.actionScroll == 'down')
      return 'animated bounceOutDown'
    else
      return 'animated bounceInUp'
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
          setTimeout(() => {
            this.waitData = false;
          }, 300);
        }
      }, error => {
        this.refresher.complete();
        setTimeout(() => {
          this.waitData = false;
        }, 300);
        console.log(error);
      });
  }

  callCustomerList() {
    this.offset = 0;
    this.customersListData = [];
    this.waitData = true;
    this.util.showLoading();
    this.service.customersList(this.limit, this.offset, this.filterData.order)
      .then(
      (result: CustomersListModel) => {
        this.util.hideLoading();
        this.customersListData = result.data;
        setTimeout(() => {
          this.waitData = false;
        }, 800);

        if (this.infiniteScroll) {
          if (result.data.length === 0) {
            this.infiniteScroll.enable(false);
          } else {
            this.infiniteScroll.enable(true);
          }
        }

      }, error => {
        this.util.hideLoading();
        setTimeout(() => {
          this.waitData = false;
        }, 800);
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
                data: customer.customer_id, callback: this.pushCallback
              });
            }, 0);
          }
        }, {
          icon: '_icon-visit',
          text: 'เข้าเยี่ยม',
          handler: () => {
            this.callCustomersChecked(customer.customer_id);
          }
        }
      ]
    });
    this.actionSheet.present();
  }

  callCustomersChecked(customers_id) {
    this.util.showLoading();
    this.service.visitCustomersChecked(customers_id)
      .then(
      (result) => {
        console.log(result);
        this.util.hideLoading();
        this.app.getRootNav().push('EditVisitPage', {
          data: result.visit_id
        });
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
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
              data: customer.customer_id, callback: this.pushCallback
            });
          }
        }, {
          icon: '_icon-trash',
          text: 'ลบ',
          handler: () => {
            this.service.deleteCustomer(customer.customer_id)
              .then((result) => {
                if (this.config.isBuildDevice) {
                  this.service.setTracking(customer.customer_id, customer.code, 1, this.config.latitude, this.config.longitude)
                    .then((resultTracking: any) => {
                      console.log(resultTracking.status_code);
                      this.util.hideLoading();
                      this.util.showAlertDialog(result.msg);
                      this.callCustomerList();
                    }, error => {
                      this.util.hideLoading();
                      console.log(error);
                    });
                }
              }, error => {
                this.util.hideLoading();
                console.log(error);
              });
          }
        }
      ]
    });
    this.actionSheet.present();
  }

  pushCallback = () => {
    return new Promise(resolve => {
      this.callCustomerList();
      resolve();
    });
  }

  public pushAddCallback() {
    this.callCustomerList();
  }
}
