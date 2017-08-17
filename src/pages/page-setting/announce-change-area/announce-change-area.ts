import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";

@IonicPage()
@Component({
  selector: 'page-announce-change-area',
  templateUrl: 'announce-change-area.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class AnnounceChangeAreaPage {

  optionUserData: OptionUserModel;
  indexProvince = 0;
  indexAmpher = 0;
  indexLevel = 0;
  profileData: any;
  selectArea = [];

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService) {
    this.profileData = navParams.get('data');
    console.log(this.profileData);
  }

  ionViewDidLoad() {
    this.getOptionUser();
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  getOptionUser() {
    this.util.showLoading();
    this.service.optionUser()
      .then(
      (result: OptionUserModel) => {
        this.util.hideLoading();
        this.optionUserData = result;
        console.log("optionUserData", this.optionUserData);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }
  
    selectOption(action) {
      let title, listSelectOption, keyOption, indexSelect;
      if (action == 'level') {
        title = 'เลือกเลเวล';
        listSelectOption = this.optionUserData.level;
        keyOption = 'level_name';
        indexSelect = this.indexLevel;
      } else if (action == 'province') {
        title = 'เลือกจังหวัด';
        listSelectOption = this.optionUserData.province;
        keyOption = 'province_th';
        indexSelect = this.indexProvince;
      } else if (action == 'ampher') {
        title = 'เลือกอำเภอ';
        listSelectOption = this.optionUserData.province[this.indexProvince].ampher;
        keyOption = 'ampher_th';
        indexSelect = this.indexAmpher;
      }
      this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
    }
  
    selectOptionCallback = (_params) => {
      return new Promise(resolve => {
        if (_params.action == 'level') {
          this.indexLevel = _params.indexSelect;
          resolve();
        } else if (_params.action == 'province') {
          if (this.indexProvince != _params.indexSelect) {
            this.indexAmpher = 0;
          }
          this.indexProvince = _params.indexSelect;
          resolve();
        } else if (_params.action == 'ampher') {
          this.indexAmpher = _params.indexSelect;
          resolve();
        } else {
          resolve();
        }
      });
    }

  addArea() {
    console.log(this.optionUserData.province[this.indexProvince].province_th);
    console.log(this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_th);
    if (this.selectArea.length > 0) {
      let selectArea = this.selectArea.filter(
        objSelectArea => objSelectArea.province.province_id == this.optionUserData.province[this.indexProvince].province_id);
      console.log(selectArea);
      if (selectArea[0]) {
        console.log('duplicate province');
        let province = selectArea[0].province.ampher.filter(
          objProvince => objProvince.ampher_id == this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_id);
        console.log(province);
        let duplicateAmpher = false;
        if (province[0]) {
          console.log('duplicate ampher');
          duplicateAmpher = true;
        }
        if (!duplicateAmpher) {
          let ampher = {
            'ampher_id': this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_id,
            'ampher_th': this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_th
          }
          selectArea[0].province.ampher.push(ampher);
        }
      } else {
        let area = {
          'province': {
            'province_id': this.optionUserData.province[this.indexProvince].province_id,
            'province_th': this.optionUserData.province[this.indexProvince].province_th,
            'ampher': [{
              'ampher_id': this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_id,
              'ampher_th': this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_th
            }]
          }
        };
        this.selectArea.push(area);
      }
    } else {
      let area = {
        'province': {
          'province_id': this.optionUserData.province[this.indexProvince].province_id,
          'province_th': this.optionUserData.province[this.indexProvince].province_th,
          'ampher': [{
            'ampher_id': this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_id,
            'ampher_th': this.optionUserData.province[this.indexProvince].ampher[this.indexAmpher].ampher_th
          }]
        }
      };
      this.selectArea.push(area);
    }
    console.log(this.selectArea);
  }

  save() {

  }

  updateUser() {
    this.util.showLoading();
    this.service.updateUser("", "", "", "")
      .then(
      (result: OptionUserModel) => {
        this.util.hideLoading(); 
        this.backPage();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

}
