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
  selector: 'page-add-shops',
  templateUrl: 'add-shops.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    Camera,
    PhotoViewer]
})

export class AddShopsPage {
  customerName: string;
  map: any = { lat: 13.7, lng: 100.5, zoom: 15 };
  latlong: string;
  optionChannelCustomer: optionChannelCustomerModel;
  optionCustomer: optionCustomerModel;
  customerDetailData: CustomerDetailModel = {
    customer_id: "",
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    province_id: "",
    ampher_id: "",
    tumbol_id: "",
    postcode: "",
    tax_number: "",
    customer_group_id: "",
    customer_type_id: "",
    seats: "",
    project_type_id: "",
    founder_date: "",
    status: "",
    remark: "",
    user_last_updated: "",
    updated_at: "",
    created_at: "",
    contacts: [],
    channels: [],
    pg: [],
    freezer: [],
    callcard: [],
    images: []
  };
  indexProvince = 0;
  indexAmpher = 0;
  indexTumbol = 0;
  indexCustomerGroup = 0;
  indexCustomerType = 0;
  indexProjectType = 0;
  customerDetail = {
    channels: []
  }
  indexStatus = 0;
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
    this.customerName = this.navParams.get('data');
  }

  ionViewDidLoad() {

    this.customerDetailData.name = this.customerName;
    console.log(this.customerDetailData);

    this.geolocation.getCurrentPosition().then((resp) => {
      this.setLatLong(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.setLatLong(data.coords.latitude, data.coords.longitude);
    });

    this.getOptionCustomer();
  }


  setLatLong(lat, long) {
    this.customerDetailData.latitude = lat;
    this.customerDetailData.longitude = long;

    this.latlong = lat + "," + long;
    console.log("latlong", this.latlong);
    this.map = { lat: parseFloat(lat), lng: parseFloat(long), zoom: 15 };
  }

  getOptionCustomer() {
    this.util.showLoading();
    this.service.optionCustomer()
      .then(
      (result: optionCustomerModel) => {
        this.optionCustomer = result;
        this.getOptionChannelCustomer();

      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  getOptionChannelCustomer() {
    this.service.optionChannelCustomer("0")
      .then(
      (result: optionChannelCustomerModel) => {
        this.util.hideLoading();
        this.optionChannelCustomer = result;
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  reloadLocation() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.setLatLong(data.coords.latitude, data.coords.longitude)
    });
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  save() {
    if (this.optionCustomer.province[this.indexProvince].province_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกจังหวัด");
      return;
    }

    if (this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].ampher_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกอำเภอ");
      return;
    }

    if (this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].tumbol[this.indexTumbol].tumbol_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกตำบล");
      return;
    }

    if (this.optionCustomer.customer_group[this.indexCustomerGroup].customer_group_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกกลุ่มร้านค้า");
      return;
    }

    if (this.optionCustomer.customer_group[this.indexCustomerGroup].customer_type[this.indexCustomerType].customer_type_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกประเภทร้านค้า");
      return;
    }

    if (this.optionCustomer.customer_group[this.indexCustomerGroup].project_type[this.indexProjectType].project_type_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกโครงการ");
      return;
    }

    if (this.util.isEmpty(this.customerDetailData.name)) {
      this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }

    if (this.util.isEmpty(this.customerDetailData.address)) {
      this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }

    if (this.util.isEmpty(this.customerDetailData.postcode) || this.customerDetailData.postcode.length != 5) {
      this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }

    if (this.util.isEmpty(this.customerDetailData.tax_number) || this.customerDetailData.tax_number.length != 13) {
      this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }

    if (!this.customerDetailData.images) {
      this.customerDetailData.images = [];
    }

    // this.callServiceCreateCustomer();
  }


  callServiceCreateCustomer() {
    this.util.showLoading();
    this.service.createCustomer(
      this.config.userInfo.username,
      this.customerDetailData.name,
      this.customerDetailData.latitude,
      this.customerDetailData.longitude,
      this.customerDetailData.address,
      this.optionCustomer.province[this.indexProvince].province_id,
      this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].ampher_id,
      this.optionCustomer.province[this.indexProvince].ampher[this.indexAmpher].tumbol[this.indexTumbol].tumbol_id,
      this.customerDetailData.postcode,
      this.customerDetailData.tax_number,
      this.optionCustomer.customer_group[this.indexCustomerGroup].customer_group_id,
      this.optionCustomer.customer_group[this.indexCustomerGroup].customer_type[this.indexCustomerType].customer_type_id,
      this.customerDetailData.seats,
      this.optionCustomer.customer_group[this.indexCustomerGroup].project_type[this.indexProjectType].project_type_id,
      this.customerDetailData.founder_date,
      this.optionCustomer.status[this.indexStatus].status_id,
      this.customerDetailData.remark,
      JSON.stringify(this.customerDetailData.contacts),
      JSON.stringify(this.customerDetailData.channels),
      JSON.stringify(this.customerDetailData.freezer),
      JSON.stringify(this.customerDetailData.pg),
      JSON.stringify(this.customerDetailData.images),
      JSON.stringify(this.customerDetailData.callcard))
      .then(result => {
        this.util.hideLoading();
        this.util.showAlertDialog(result.msg);
        this.backPage();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }
}
