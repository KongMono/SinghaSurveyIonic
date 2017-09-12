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
  optionScheduleCustomer = [];
  indexProvince = 0;
  indexAmpher = 0;
  indexCustomer = 0;
  indexSelectCustomer = 0;
  date: any;
  plan = [];

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
    this.optionScheduleCustomer = this.optionSchedule.customer;
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
      listSelectOption = this.optionScheduleCustomer;
      keyOption = 'customer_name';
      indexSelect = this.indexSelectCustomer;
    }
    this.navCtrl.push('ListSelectOptionSchedulePage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'province') {
        if (this.indexProvince != _params.indexSelect) {
          this.indexAmpher = 0;
        }
        this.indexProvince = _params.indexSelect;
        this.filterOptionCustomer();
        resolve();
      } else if (_params.action == 'ampher') {
        this.indexAmpher = _params.indexSelect;
        this.filterOptionCustomer();
        resolve();
      } else if (_params.action == 'customer') {
        this.indexSelectCustomer = _params.indexSelect;
        for (var i = 0; i < this.optionSchedule.customer.length; i++) {
          if (this.optionScheduleCustomer[this.indexSelectCustomer].customer_id == this.optionSchedule.customer[i].customer_id) {
            this.indexCustomer = i;
            i = this.optionSchedule.customer.length;
          }
        }
        resolve();
      } else {
        resolve();
      }
    });
  }

  filterOptionCustomer() {
    this.optionScheduleCustomer = [];
    if (this.indexProvince == 0 && this.indexAmpher == 0) {
      this.optionScheduleCustomer = this.optionSchedule.customer;
    } else if (this.indexAmpher == 0) {
      this.optionScheduleCustomer = this.optionSchedule.customer;
    } else {
      for (var i = 0; i < this.optionSchedule.customer.length; i++) {
        if ((this.optionSchedule.province[this.indexProvince].province_id == this.optionSchedule.customer[i].province_id) && (this.optionSchedule.province[this.indexProvince].ampher[this.indexAmpher].ampher_id == this.optionSchedule.customer[i].ampher_id)) {
          this.optionScheduleCustomer.push(this.optionSchedule.customer[i]);
        }
      }
    }
    this.indexSelectCustomer = 0;
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
    if ((this.indexCustomer != null || this.indexCustomer != undefined) && this.date) {
      if (this.optionSchedule.customer[this.indexCustomer].balance > 0) {
        let pushPlan: boolean = true;
        if (this.plan.length > 0) {
          for (var i = 0; i < this.plan.length; i++) {
            if ((this.optionSchedule.customer[this.indexCustomer].customer_id == this.plan[i].customer_id) && (this.date == this.plan[i].date)) {
              pushPlan = false;
              this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
              i = this.plan.length;
            }
          }
        }

        if (this.data.length > 0 && pushPlan) {
          for (var i = 0; i < this.data.length; i++) {
            if ((this.optionSchedule.customer[this.indexCustomer].customer_id == this.data[i].customer_id) && (this.date == this.data[i].date)) {
              pushPlan = false;
              this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
              i = this.data.length;
            }
          }
        }

        if (pushPlan) {
          this.pushPlan();
        }
      } else {
        this.util.showAlertDialog('ครบจำนวนรอบ กรุณาเลือกใหม่');
      }
    } else if ((this.indexCustomer == null || this.indexCustomer == undefined) && this.date) {
      this.util.showAlertDialog('ไม่มีร้านค้า กรุณาเลือกใหม่');
    } else if ((this.indexCustomer != null || this.indexCustomer != undefined) && !this.date) {
      this.util.showAlertDialog('กรุณาเลือกวันที่');
    }
  }

  pushPlan() {
    let plan = {
      plan_id: '',
      can_delete: '1',
      customer_id: this.optionSchedule.customer[this.indexCustomer].customer_id,
      customer_name: this.optionSchedule.customer[this.indexCustomer].customer_name,
      date: this.date
    }
    this.plan.push(plan);
    this.optionSchedule.customer[this.indexCustomer].total_plan += 1;
    this.optionSchedule.customer[this.indexCustomer].balance -= 1;
  }

  removePlanInList(index) {
    for (var i = 0; i < this.optionSchedule.customer.length; i++) {
      if (this.plan[index].customer_id == this.optionSchedule.customer[i].customer_id) {
        this.plan.splice(index, 1);
        this.optionSchedule.customer[i].total_plan -= 1;
        this.optionSchedule.customer[i].balance += 1;
        i = this.optionSchedule.customer.length;
      }
    }
  }

  save() {
    if (this.plan.length > 0) {
      for (var i = 0; i < this.plan.length; i++) {
        this.data.push(this.plan[i]);
      }
      this.callback(this.data).then(() => {
        this.backPage();
      }, error => {

      });
    }
  }
}
