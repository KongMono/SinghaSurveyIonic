import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-activity-visit',
  templateUrl: 'activity-visit.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    Camera,
    PhotoViewer]
})

export class ActivityVisitPage {
  data: any;
  optionEquipment: optionEquipmentModel;
  index: any;
  callback: any;
  optionsActivity: optionsActivityModel;
  optionsSale: optionsSaleModel;
  visitActivityDetailData: visitActivityDetailModel = {
    visit_activity_id: '',
    venue_type: '',
    venue_name: '',
    vendor_id: '',
    tradition_type_id: '',
    activity_name: '',
    start_date: '',
    end_date: '',
    activity_master_id: '',
    activity_id: '',
    pg: [],
    sales: [],
    equipment: [],
    images: [],
    sale_images: []
  };
  venue = {
    internalPlace: false,
    externalPlace: false,
  }
  indexVendor = 0;
  indexTraditionType = 0;
  indexActivityMaster = 0;
  indexActivity = 0;
  visitActivityDetail = {
    pg: [],
    sales: [],
    equipment: []
  };

  constructor(
    public app: App,
    private http: Http,
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private photoViewer: PhotoViewer,
    @Inject(ConfigApp) private config: IAppConfig) {
    this.data = navParams.get('data');
    this.optionEquipment = navParams.get('optionEquipment');
    this.index = navParams.get('index');
    console.log(this.data);
    console.log(this.optionEquipment);
    console.log(this.index);
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {
    this.callGetOptionActivity();
  }

  backPage() {
    this.navCtrl.pop({ animate: true, animation: 'transition', direction: 'back' });
  }

  callGetOptionActivity() {
    this.util.showLoading();
    this.service.optionActivity()
      .then((result: optionsActivityModel) => {
        this.optionsActivity = result;
        this.callGetOptionSale();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetOptionSale() {
    this.service.optionSale()
      .then((result: optionsSaleModel) => {
        this.optionsSale = result;
        if (this.index != null || this.index != undefined) {
          this.callGetVisitActivityDetail();
        } else {
          this.util.hideLoading();
        }
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetVisitActivityDetail() {
    this.service.visitActivityDetail(this.data[this.index].id)
      .then((result: visitActivityDetailModel) => {
        this.visitActivityDetailData = result;
        if (this.visitActivityDetailData.venue_type == '1') {
          this.venue.internalPlace = true;
          this.venue.externalPlace = false;
        } else if (this.visitActivityDetailData.venue_type == '2') {
          this.venue.internalPlace = false;
          this.venue.externalPlace = true;
        }

        this.setIndexVendor();
        this.setIndexTraditionType();

        if (!this.visitActivityDetailData.images) {
          this.visitActivityDetailData.images = [];
        }

        if (!this.visitActivityDetailData.sale_images) {
          this.visitActivityDetailData.sale_images = [];
        }
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  setIndexVendor() {
    for (var i = 0; i < this.optionsActivity.vendor.length; i++) {
      if (this.optionsActivity.vendor[i].vendor_id == this.visitActivityDetailData.vendor_id) {
        return this.indexVendor = i;
      }
    }
  }

  setIndexTraditionType() {
    for (var i = 0; i < this.optionsActivity.tradition_type.length; i++) {
      if (this.optionsActivity.tradition_type[i].tradition_type_id == this.visitActivityDetailData.tradition_type_id) {
        this.indexTraditionType = i;
        this.setIndexActivityMaster(this.indexTraditionType);
        return
      }
    }
  }

  setIndexActivityMaster(indexTraditionType) {
    for (var i = 0; i < this.optionsActivity.tradition_type[indexTraditionType].activity_master.length; i++) {
      if (this.optionsActivity.tradition_type[indexTraditionType].activity_master[i].activity_master_id == this.visitActivityDetailData.activity_master_id) {
        this.indexActivityMaster = i;
        this.setIndexActivity(indexTraditionType, this.indexActivityMaster);
        return
      }
    }
  }

  setIndexActivity(indexTraditionType, indexActivityMaster) {
    for (var i = 0; i < this.optionsActivity.tradition_type[indexTraditionType].activity_master[indexActivityMaster].activity.length; i++) {
      if (this.optionsActivity.tradition_type[indexTraditionType].activity_master[indexActivityMaster].activity[i].activity_id == this.visitActivityDetailData.activity_id) {
        return this.indexActivity = i;
      }
    }
  }

  changeVenue(action) {
    if (action == 'internalPlace') {
      if (this.venue.internalPlace) {
        this.venue.externalPlace = false;
        this.visitActivityDetailData.venue_type = '1';
      } else if (!this.venue.internalPlace) {
        this.venue.externalPlace = true;
        this.visitActivityDetailData.venue_type = '2';
      }
    } else if (action == 'externalPlace') {
      if (this.venue.externalPlace) {
        this.venue.internalPlace = false;
        this.visitActivityDetailData.venue_type = '2';
      } else if (!this.venue.externalPlace) {
        this.venue.internalPlace = true;
        this.visitActivityDetailData.venue_type = '1';
      }
    }
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'vendor') {
      title = 'เลือกบริษัท';
      listSelectOption = this.optionsActivity.vendor;
      keyOption = 'name';
      indexSelect = this.indexVendor;
    } else if (action == 'tradition_type') {
      title = 'เลือกประเภท';
      listSelectOption = this.optionsActivity.tradition_type;
      keyOption = 'tradition_name';
      indexSelect = this.indexTraditionType;
    } else if (action == 'activity_master') {
      title = 'ตัวเลือก';
      listSelectOption = this.optionsActivity.tradition_type[this.indexTraditionType].activity_master;
      keyOption = 'activity_master_name';
      indexSelect = this.indexActivityMaster;
    } else if (action == 'activity') {
      title = 'ตัวเลือก';
      listSelectOption = this.optionsActivity.tradition_type[this.indexTraditionType].activity_master[this.indexActivityMaster].activity;
      keyOption = 'activity_name';
      indexSelect = this.indexActivity;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'vendor') {
        this.indexVendor = _params.indexSelect;
        resolve();
      } else if (_params.action == 'tradition_type') {
        if (this.indexTraditionType != _params.indexSelect) {
          this.indexActivityMaster = 0;
          this.indexActivity = 0;
        }
        this.indexTraditionType = _params.indexSelect;
        resolve();
      } else if (_params.action == 'activity_master') {
        if (this.indexActivityMaster != _params.indexSelect) {
          this.indexActivity = 0;
        }
        this.indexActivityMaster = _params.indexSelect;
        resolve();
      } else if (_params.action == 'activity') {
        this.indexActivity = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  save() {
    // let dataCallback = {
    //   action: this.action,
    //   data: data
    // }
    this.callback(this.data).then(() => {
      this.backPage();
    }, error => {

    });
  }
}
