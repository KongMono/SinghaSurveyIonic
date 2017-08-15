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
    public util: AppUtilService,
    @Inject(ConfigApp) private config: IAppConfig) {
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
}
