import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams, App, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";
import { ConfigApp, IAppConfig } from "../../../app/app.config";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-edit-shops',
  templateUrl: 'edit-shops.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    Camera,
    PhotoViewer]
})

export class EditShopsPage {
  map: any = { lat: 13.7, lng: 100.5, zoom: 15 };
  customer_id: any;
  optionChannelCustomer: optionChannelCustomerModel;
  optionCustomer: optionCustomerModel;
  customerDetailData: CustomerDetailModel;
  latlong: string;
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
    this.customer_id = navParams.get('data');
    console.log(this.customer_id);
  }

  ionViewDidLoad() {
    this.getOptionCustomer();
  }

  changeZipCodeLength(e) {
    if (this.customerDetailData) {
      this.customerDetailData.postcode = this.customerDetailData.postcode.length.toString();
    }
  }

  changeTaxIDLength(e) {
    if (this.customerDetailData) {
      this.customerDetailData.tax_number = this.customerDetailData.tax_number.length.toString();
    }
  }

  setLatLong() {
    let lat, long;
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

  refreshLatLong(lat, long) {
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

  public setCustomerDetailDataChannels() {
    if (this.customerDetailData.channels.length > 0) {
      this.customerDetail.channels = [];
      for (var i = 0; i < this.customerDetailData.channels.length; i++) {
        for (var indexCustomerGroup = 0; indexCustomerGroup < this.optionChannelCustomer.customer_group.length; indexCustomerGroup++) {
          if (this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_group_id == this.customerDetailData.channels[i].customer_group_id) {
            for (var indexCustomerChannel = 0; indexCustomerChannel < this.optionChannelCustomer.customer_group.length; indexCustomerChannel++) {
              if (this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[indexCustomerChannel].id == this.customerDetailData.channels[i].channel_id) {
                let channels = {
                  customer_group: {
                    customer_group_id: this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_group_id,
                    name: this.optionChannelCustomer.customer_group[indexCustomerGroup].name
                  },
                  customer_channel: {
                    id: this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[indexCustomerChannel].id,
                    name: this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[indexCustomerChannel].name
                  },
                  product_category: {
                    product_category_id: '',
                    name: ''
                  }
                }
                this.customerDetail.channels.push(channels);
              }
            }
          }
        }
        for (var indexProductCategory = 0; indexProductCategory < this.optionChannelCustomer.product_category.length; indexProductCategory++) {
          if (this.optionChannelCustomer.product_category[indexProductCategory].product_category_id == this.customerDetailData.channels[i].product_category_id) {
            this.customerDetail.channels[this.customerDetail.channels.length - 1].product_category.product_category_id = this.optionChannelCustomer.product_category[indexProductCategory].product_category_id;
            this.customerDetail.channels[this.customerDetail.channels.length - 1].product_category.name = this.optionChannelCustomer.product_category[indexProductCategory].name;
          }
        }
      }
    }
  }

  popupInput(action, index) {
    this.navCtrl.push('PopupInput', { action: action, data: this.customerDetailData, option: this.optionChannelCustomer, index: index, callback: this.popupInputCallback }, { animate: true, animation: 'transition', direction: 'forward' });

    // let modal = this.modalCtrl.create('PopupInput', { action: action, data: this.customerDetailData, option: [this.optionChannelCustomer], index: index }, {
    //   cssClass: 'override-modal-popup-input'
    // });
    // modal.present();

    // modal.onDidDismiss(data => {
    //   console.log(data);
    //   if (data) {
    //     this.customerDetailData = data;
    //     if (action == 'channels') {
    //       this.setCustomerDetailDataChannels();
    //     }
    //   }
    // });
  }

  popupInputCallback = (_params) => {
    return new Promise(resolve => {
      console.log(_params);
      if (_params.data) {
        this.customerDetailData = _params.data;
        if (_params.action == 'channels') {
          this.setCustomerDetailDataChannels();
        }
        resolve();
      } else {
        resolve();
      }
    });
  }

  actionSheetInList(action, index) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: '_icon-edit',
          text: 'แก้ไข',
          handler: () => {
            this.popupInput(action, index);
          }
        }, {
          icon: '_icon-delete_file',
          text: 'ลบ',
          handler: () => {
            this.removeDataInList(action, index);
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeDataInList(action, index) {
    this.customerDetailData[action].splice(index, 1);
    if (action == 'channels') {
      this.customerDetail[action].splice(index, 1);
    }
  }

  addImage() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'ios-camera',
          text: 'เปิดกล้อง',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.PNG,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType: 1
            }
            this.openCameraOrPhotoLibrary(options);
          }
        }, {
          icon: 'ios-images',
          text: 'เลือกอัลบั้ม',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.PNG,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType: 0
            }
            this.openCameraOrPhotoLibrary(options);
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraOrPhotoLibrary(options) {
    this.camera.getPicture(options).then((imageData) => {
      this.setUploadImageCustomer(imageData);
    }, (err) => {
      console.error(err);
    });
    // let imageData = "/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACqADAAQAAAABAAAACwAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgACwAKAwERAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/dAAQAAv/aAAwDAQACEQMRAD8A8/r/ADXP+ogKAP/Q8/r/ADXP+ogKAP/Z";
    // this.setUploadImageCustomer(imageData);
  }

  updateAddImage(res) {
    this.customerDetailData.images.push(res.path);
  }

  viewImage(index) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'ios-image',
          text: 'ดูรูป',
          handler: () => {
            this.app.navPop().then(() => {
              let endpoint
              if (this.config.isProduction) {
                endpoint = this.config.endpoint_production;
              } else {
                endpoint = this.config.endpointUpload;
              }
              this.photoViewer.show(endpoint + this.customerDetailData.images[index]);
            });
          }
        }, {
          icon: '_icon-trash',
          text: 'ลบ',
          handler: () => {
            this.app.navPop().then(() => {
              this.confirmRemoveImage(index);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  confirmRemoveImage(index) {
    let alert = this.alertCtrl.create({
      title: 'ต้องการลบรูปภาพ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.customerDetailData.images.splice(index, 1);
          }
        }
      ]
    });
    alert.present();
  }

  reloadLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.refreshLatLong(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.refreshLatLong(data.coords.latitude, data.coords.longitude);
    });
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  save() {

  }

  setIndexProvince() {
    for (var i = 0; i < this.optionCustomer.province.length; i++) {
      if (this.optionCustomer.province[i].province_id == this.customerDetailData.province_id) {
        this.indexProvince = i;
        this.setIndexAmpher(this.indexProvince);
        return
      }
    }
  }

  setIndexAmpher(indexProvince) {
    for (var i = 0; i < this.optionCustomer.province[indexProvince].ampher.length; i++) {
      if (this.optionCustomer.province[indexProvince].ampher[i].ampher_id == this.customerDetailData.ampher_id) {
        this.indexAmpher = i;
        this.setIndexTumbol(indexProvince, this.indexAmpher);
        return
      }
    }
  }

  setIndexTumbol(indexProvince, indexAmpher) {
    for (var i = 0; i < this.optionCustomer.province[indexProvince].ampher[indexAmpher].tumbol.length; i++) {
      if (this.optionCustomer.province[indexProvince].ampher[indexAmpher].tumbol[i].tumbol_id == this.customerDetailData.tumbol_id) {
        return this.indexTumbol = i;
      }
    }
  }

  setIndexCustomerGroup() {
    for (var i = 0; i < this.optionCustomer.customer_group.length; i++) {
      if (this.optionCustomer.customer_group[i].customer_group_id == this.customerDetailData.customer_group_id) {
        this.indexCustomerGroup = i;
        this.setIndexCustomerType(this.indexCustomerGroup);
        this.setIndexProjectType(this.indexCustomerGroup);
        return
      }
    }
  }

  setIndexCustomerType(indexCustomerGroup) {
    for (var i = 0; i < this.optionCustomer.customer_group[indexCustomerGroup].customer_type.length; i++) {
      if (this.optionCustomer.customer_group[indexCustomerGroup].customer_type[i].customer_type_id == this.customerDetailData.customer_type_id) {
        return this.indexCustomerType = i;
      }
    }
  }

  setIndexProjectType(indexCustomerGroup) {
    for (var i = 0; i < this.optionCustomer.customer_group[indexCustomerGroup].project_type.length; i++) {
      if (this.optionCustomer.customer_group[indexCustomerGroup].project_type[i].project_type_id == this.customerDetailData.project_type_id) {
        return this.indexProjectType = i;
      }
    }
  }

  setIndexStatus() {
    for (var i = 0; i < this.optionCustomer.status.length; i++) {
      if (this.optionCustomer.status[i].status_id == this.customerDetailData.status) {
        return this.indexStatus = i;
      }
    }
  }

  getCustomerDetail(customer_id) {
    this.service.customerDetail(customer_id)
      .then(
      (result: CustomerDetailModel) => {
        this.util.hideLoading();
        this.customerDetailData = result;
        console.log("customerDetailData", this.customerDetailData);
        this.setIndexProvince();
        this.setIndexCustomerGroup();
        this.setLatLong();
        this.setCustomerDetailDataChannels();
      }, error => {
        console.log(error);
      });
  }

  getImagePath(images): string {
    let endpoint
    if (this.config.isProduction) {
      endpoint = this.config.endpoint_production;
    } else {
      endpoint = this.config.endpointUpload;
    }
    return endpoint + images;
  }

  getOptionCustomer() {
    this.util.showLoading();
    this.service.optionCustomer()
      .then(
      (result: optionCustomerModel) => {
        this.optionCustomer = result;
        console.log("optionCustomer", this.optionCustomer);
        this.getOptionChannelCustomer(this.customer_id);
      }, error => {
        console.log(error);
      });
  }

  getOptionChannelCustomer(customer_id) {
    this.service.optionChannelCustomer(customer_id)
      .then(
      (result: optionChannelCustomerModel) => {
        this.optionChannelCustomer = result;
        console.log("optionChannelCustomer", this.optionChannelCustomer);
        this.getCustomerDetail(customer_id);
      }, error => {
        console.log(error);
      });
  }

  setUploadImageCustomer(imageBase64) {
    this.util.showLoading();
    this.service.uploadImageCustomer(imageBase64)
      .then(result => {
        this.util.hideLoading();
        console.log("uploadImageCustomer", result);
        this.updateAddImage(result);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }
}
