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
  cycle_id;
  indexSelect: any = 0;

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
    this.cycle_id = this.list[0].cycle_id;
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

  submit() {
    this.callCreatedSchedule();
  }

  selectScheduleList(indexSelect, cycle_id) {
    this.indexSelect = indexSelect;
    this.cycle_id = cycle_id;
  }

  callCreatedSchedule() {
    this.util.showLoading();
    this.service.createdSchedule(this.cycle_id)
      .then((result) => {
        this.util.hideLoading();
        this.viewCtrl.dismiss();
        this.app.getRootNav().push('EditSchedulePage', {
          data: {
            schedule_id: result.data.schedule_id,
            isEdit: false
          }
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
