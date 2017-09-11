import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, ActionSheetController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-plan-schedule',
  templateUrl: 'plan-schedule.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class PlanSchedulePage {
  data: any;
  optionSchedule: OptionScheduleModel;
  callback: any;
  indexProvince = 0;
  indexAmpher = 0;
  indexCustomer = 0;
  date: any;
  plan = [];
  // customer
  // :
  // Array(3)
  // 0
  // :
  // ampher_id
  // :
  // "6"
  // balance
  // :
  // 4
  // customer_id
  // :
  // "14530"
  // customer_name
  // :
  // "เจ แอนด์ เจ"
  // province_id
  // :
  // "11"
  // total_master
  // :
  // 4
  // total_plan
  // :
  // 0

  // province
  // :
  // Array(3)
  // 0
  // :
  // ampher
  // :
  // Array(1)
  // 0
  // :
  // ampher_id
  // :
  // "0"
  // ampher_th
  // :
  // "ทั้งหมด"

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public actionSheetCtrl: ActionSheetController,
    @Inject(ConfigApp) private config: IAppConfig) {
    this.data = navParams.get('data');
    this.optionSchedule = navParams.get('optionSchedule');
    console.log(this.data);
    console.log(this.optionSchedule);
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {

  }

  backPage() {
    this.navCtrl.pop({ animate: true, animation: 'transition', direction: 'back' });
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'province') {
      title = 'เลือกจังหวัด';
      listSelectOption = this.optionSchedule.province;
      keyOption = 'province_th';
      indexSelect = this.indexProvince;
    } else if (action == 'ampher') {
      title = 'เลือกอำเภอ';
      listSelectOption = this.optionSchedule.province[this.indexProvince].ampher;
      keyOption = 'ampher_th';
      indexSelect = this.indexAmpher;
    } else if (action == 'customer') {
      title = 'เลือกร้านค้า';
      listSelectOption = this.optionSchedule.customer;
      keyOption = 'customer_name';
      indexSelect = this.indexCustomer;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'province') {
        if (this.indexProvince != _params.indexSelect) {
          this.indexAmpher = 0;
        }
        this.indexProvince = _params.indexSelect;
        resolve();
      } else if (_params.action == 'ampher') {
        this.indexAmpher = _params.indexSelect;
        resolve();
      } else if (_params.action == 'customer') {
        this.indexCustomer = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  // actionSheetInList(index) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     buttons: [
  //       {
  //         icon: '_icon-delete_file',
  //         text: 'ลบ',
  //         handler: () => {
  //           this.removePlanInList(index);
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  addPlan() {
    let plan = {
      date: this.date,
      customer_name: this.optionSchedule.customer[this.indexCustomer].customer_name
    }
    this.plan.push(plan);
  }

  removePlanInList(index) {
    this.plan.splice(index, 1);
  }

  save() {
    this.callApiUpdate();
  }

  callApiUpdate() {
    // this.util.showLoading();
    // this.service.updateVisitActivity(

    //   .then(result => {
    //     this.util.hideLoading();
    //     this.util.showAlertDialog(result.msg);
    //     this.callback(null).then(() => {
    //       this.backPage();
    //     }, error => {

    //     });
    //   }, error => {
    //     this.util.hideLoading();
    //     console.log(error.message);
    //   });
  }
}
