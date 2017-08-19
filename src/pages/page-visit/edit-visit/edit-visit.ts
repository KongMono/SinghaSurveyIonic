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
  selector: 'page-edit-visit',
  templateUrl: 'edit-visit.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    Camera,
    PhotoViewer]
})

export class EditVisitPage {
  map: any = { lat: 13.7, lng: 100.5, zoom: 15 };
  visit_id: any;
  visitCustomerDetail: VisitCustomerDetailModel;
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
    this.visit_id = navParams.get('data');
    console.log(this.visit_id);
  }

  ionViewDidLoad() {
    this.callGetVisitCustomerDetail(this.visit_id);
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  callGetVisitCustomerDetail(visit_id) {
    this.util.showLoading();
    this.service.visitCustomerDetail(visit_id)
      .then((result: VisitCustomerDetailModel) => {
        this.visitCustomerDetail = result;
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }


}
