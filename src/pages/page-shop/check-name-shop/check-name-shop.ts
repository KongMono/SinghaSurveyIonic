import { TabShop } from './../../tab-shop/tab-shop';
import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ViewController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-check-name-shop',
  templateUrl: 'check-name-shop.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    TabShop,
    CallNumber]
})

export class CheckNameShopPage {
  searchText: string = '';
  list = [];
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public viewCtrl: ViewController,
    public tabShop: TabShop) {
    this.searchControl = new FormControl();
  }

  search() {
    this.viewCtrl.dismiss();

    this.app.getRootNav().push('AddShopsPage', {
      data: this.searchText, callback: this.pushCallback
    });
  }

  pushCallback = () => {
    return new Promise(resolve => {
      this.tabShop.pushAddCallback();
      resolve();
    });
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700)
      .subscribe(search => {
        this.searching = false;
        this.list = this.navParams.get('data');
        this.setFilteredItems();
      });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    if (this.util.isEmpty(this.searchText) || this.searchText.length < 2) {
      this.list = [];
    } else {
      this.list = this.list.filter(ls => {
        return ls.name.includes(this.searchText);
      });
    }
  }

  selectCustomerList(customers_id) {
    this.callCustomersChecked(customers_id);
  }

  callCustomersChecked(customers_id) {
    this.util.showLoading();
    this.service.customersChecked(customers_id)
      .then(
      (result) => {
        console.log(result);
        this.util.hideLoading();
        this.viewCtrl.dismiss();
        if (result.status == '2') {
          this.util.showAlertDialog(result.msg);
          return;
        }
        this.app.getRootNav().push('EditShopsPage', {
          data: customers_id
        });
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
