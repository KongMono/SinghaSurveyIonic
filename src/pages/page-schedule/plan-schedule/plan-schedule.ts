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
  // balance: ,
  // customer_id: ,
  // customer_name: ,
  // province_id: ,
  // ampher_id: ,
  //   total_master: ,
  //   total_plan: 
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
    this.navCtrl.push('ListSelectOptionSchedulePage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
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
    //   if (str_province_id.equalsIgnoreCase("0") && str_ampher_id.equalsIgnoreCase("0")) {
    //     customerFiler.addAll(customerAll);

    // } else if (str_ampher_id.equalsIgnoreCase("0")) {
    //     customerFiler.addAll(customerAll);
    // } else {
    //     for (int i = 0; i < customerAll.size(); i++) {
    //         if (customerAll.get(i).getProvince_id().equalsIgnoreCase(str_province_id) && customerAll.get(i).getAmpher_id().equalsIgnoreCase(str_ampher_id)) {
    //             ls.add(customerAll.get(i));
    //         }
    //     }
    //     customerFiler.addAll(ls);
    // }

    if ((this.indexCustomer != null || this.indexCustomer != undefined) && this.date) {
      if (this.optionSchedule.customer[this.indexCustomer].balance > 0) {
        if (this.plan.length > 0) {
          console.log('#plan>0');
          let dateDuplicate: boolean = false;
          for (var i = 0; i < this.plan.length; i++) {
            if (this.date != this.plan[i].date) {
              console.log('#date!=');
              if (this.data.length > 0) {
                console.log('#=data>0');
                for (var j = 0; j < this.data.length; j++) {
                  if (this.date != this.data[j].date) {
                    console.log('#=date!=');
                    this.pushPlan();
                    return;
                  } else {
                    console.log('#=date=');
                    if (this.optionSchedule.customer[this.indexCustomer].customer_id != this.data[j].customer_id) {
                      console.log('#=customer!=');
                      this.pushPlan();
                      return;
                    } else {
                      console.log('#=customer=');
                      dateDuplicate = true;
                    }
                  }
                }
                // if (dateDuplicate) {
                //   this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
                // }
              } else {
                console.log('#=data<0');
                this.pushPlan();
                return;
              }
            } else {
              console.log('#date=');
              if (this.optionSchedule.customer[this.indexCustomer].customer_id != this.plan[i].customer_id) {
                console.log('#customer!=');
                if (this.data.length > 0) {
                  for (var j = 0; j < this.data.length; j++) {
                    if (this.date != this.data[j].date) {
                      this.pushPlan();
                      return;
                    } else {
                      if (this.optionSchedule.customer[this.indexCustomer].customer_id != this.data[j].customer_id) {
                        this.pushPlan();
                        return;
                      } else {
                        dateDuplicate = true;
                      }
                    }
                  }
                  // if (dateDuplicate) {
                  //   this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
                  // }
                } else {
                  this.pushPlan();
                  return;
                }
              } else {
                console.log('#customer=');
                dateDuplicate = true;
              }
            }
          }
          if (dateDuplicate) {
            this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
          }
        } else if (this.data.length > 0) {
          console.log('#data>0');
          let dateDuplicate: boolean = false;
          for (var i = 0; i < this.data.length; i++) {
            if (this.date != this.data[i].date) {
              console.log('#date!=');
              // if (this.plan.length > 0) {
              //   for (var j = 0; j < this.plan.length; j++) {
              //     if (this.date != this.plan[j].date) {
              //       this.pushPlan();
              //       return;
              //     } else {
              //       if (this.optionSchedule.customer[this.indexCustomer].customer_id != this.plan[j].customer_id) {
              //         this.pushPlan();
              //         return;
              //       } else {
              //         dateDuplicate = true;
              //       }
              //     }
              //   }
              //   // if (dateDuplicate) {
              //   //   this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
              //   // }
              // } else {
                this.pushPlan();
                return;
              // }
            } else {
              console.log('#date=');
              if (this.optionSchedule.customer[this.indexCustomer].customer_id != this.data[i].customer_id) {
                console.log('#customer!=');
                // if (this.plan.length > 0) {
                //   for (var j = 0; j < this.plan.length; j++) {
                //     if (this.date != this.plan[j].date) {
                //       this.pushPlan();
                //       return;
                //     } else {
                //       if (this.optionSchedule.customer[this.indexCustomer].customer_id != this.plan[j].customer_id) {
                //         this.pushPlan();
                //         return;
                //       } else {
                //         dateDuplicate = true;
                //       }
                //     }
                //   }
                //   // if (dateDuplicate) {
                //   //   this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
                //   // }
                // } else {
                  this.pushPlan();
                  return;
                // }
              } else {
                console.log('#customer=');
                dateDuplicate = true;
              }
            }
          }
          if (dateDuplicate) {
            this.util.showAlertDialog('วันที่ซ้ำ กรุณาเลือกใหม่');
          }
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
  }

  removePlanInList(index) {
    this.plan.splice(index, 1);
  }

  save() {
    if (this.plan.length > 0) {
      this.callback(this.data).then(() => {
        this.backPage();
      }, error => {

      });
    }
  }
}
