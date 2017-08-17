import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-add-shops',
  templateUrl: 'add-shops.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class AddShopsPage {
  map: any = { lat: 13.7, lng: 100.5, zoom: 15 };
  customer = [];
  latlong: string;
  customerName: string;
  inputEditShopData = {};
  customerDetailData: CustomerDetailModel;
  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    @Inject(ConfigApp) private config: IAppConfig) {

    this.customerName = this.navParams.get('data');
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.setLatLong(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  setLatLong(lat, long) {
    if (this.customerDetailData.latitude) {
      lat = this.customerDetailData.latitude;
    } else {
      lat = 0.0;
    }

    if (this.customerDetailData.longitude) {
      long = this.customerDetailData.longitude;
    } else {
      long = 0.0;
    }
    this.latlong = lat + "," + long;
    this.map = { lat: parseFloat(lat), lng: parseFloat(long), zoom: 15 };
  }

  reloadLocation() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.setLatLong(data.coords.latitude, data.coords.longitude)
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  callServiceCreateCustomer() {
    this.util.showLoading();
    this.service.createCustomer(
      this.config.userInfo.username,
      this.customerDetailData.name,
      this.customerDetailData.latitude,
      this.customerDetailData.longitude,
      this.customerDetailData.address,
      this.customerDetailData.province_id,
      this.customerDetailData.ampher_id,
      this.customerDetailData.tumbol_id,
      this.customerDetailData.postcode,
      this.customerDetailData.tax_number,
      this.customerDetailData.customer_group_id,
      this.customerDetailData.customer_type_id,
      this.customerDetailData.seats,
      this.customerDetailData.project_type_id,
      this.customerDetailData.founder_date,
      this.customerDetailData.status,
      this.customerDetailData.remark,
      JSON.stringify(this.customerDetailData.contacts),
      JSON.stringify(this.customerDetailData.channels),
      JSON.stringify(this.customerDetailData.freezer),
      JSON.stringify(this.customerDetailData.pg),
      JSON.stringify(this.customerDetailData.images),
      JSON.stringify(this.customerDetailData.callcard)
    )
      .then(result => {
        this.util.hideLoading();
        this.backPage();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }
}
