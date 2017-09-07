import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ViewController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-select-name-schedule',
  templateUrl: 'select-name-schedule.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class SelectNameSchedulePage {
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
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.list = this.navParams.get('data');
  }

  setFilteredItems() {
    if (this.util.isEmpty(this.searchText) || this.searchText.length < 3) {
      this.list = [];
    } else {
      this.list = this.list.filter(ls => {
        return ls.name.includes(this.searchText);
      });
    }
  }

  selectScheduleList(customers_id) {
    // this.callCustomersChecked(customers_id);
  }

  callCustomersChecked(customers_id) {
    // this.util.showLoading();
    // this.service.customersChecked(customers_id)
    //   .then(
    //   (result) => {
    //     console.log(result);
    //     this.util.hideLoading();
    //     this.viewCtrl.dismiss();
    //     this.app.getRootNav().push('EditShopsPage', {
    //       data: customers_id
    //     });
    //   }, error => {
    //     this.util.hideLoading();
    //     console.log(error);
    //   });
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
