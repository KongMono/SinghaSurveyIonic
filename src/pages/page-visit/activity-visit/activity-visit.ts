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
        this.callGetOptionSale();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetOptionSale() {
    this.service.optionSale()
      .then((result: optionsSaleModel) => {
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
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
        console.log(error);
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
