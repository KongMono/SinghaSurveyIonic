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
  activity_id: any;
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
    this.activity_id = navParams.get('data');
  }

  ionViewDidLoad() {
    this.callGetOptionActivity();
  }

  backPage() {
    this.app.getRootNav().pop();
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
    this.util.showLoading();
    this.service.optionSale()
      .then((result: optionsSaleModel) => {

        if (this.activity_id != "") {
          this.callGetVisitActivityDetail();
        }

      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetVisitActivityDetail() {
    this.util.showLoading();
    this.service.visitActivityDetail(this.activity_id)
      .then((result: visitActivityDetail) => {

      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

}
