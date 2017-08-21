import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, NavParams, App } from 'ionic-angular';
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from './../../app/app.util';

@IonicPage()
@Component({
  selector: 'page-view-map',
  templateUrl: 'view-map.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService]
})

export class ViewMapPage {
  map: any = { lat: 13.7, lng: 100.5, zoom: 15 };
  latLong: any;
  title: string = "";
  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SinghaSurveyService,
    public util: AppUtilService) {
    this.latLong = navParams.get('data');
  }

  ionViewDidLoad() {
    this.title = this.latLong.title;
    this.setLatLong();
  }

  setLatLong() {
    let lat, long;
    if (this.latLong.latitude) {
      lat = this.latLong.latitude;
    } else {
      lat = 0.0;
    }

    if (this.latLong.longitude) {
      long = this.latLong.longitude;
    } else {
      long = 0.0;
    }

    this.map = { lat: parseFloat(lat), lng: parseFloat(long), zoom: 15 };
  }

  backPage() {
    this.app.getRootNav().pop({ animate: true, animation: 'transition', direction: 'back' });
  }

}
