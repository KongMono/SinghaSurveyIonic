import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IAppConfig, ConfigApp } from './../../app/app.config';
import { CallApi } from './../../providers/call-api';
import { SinghaSurveyService } from './../../providers/service';
import { AppUtilService } from './../../app/app.util';
import { ActionSheetController, AlertController, App } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'visit-add-note',
  templateUrl: 'visit-add-note.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    Camera,
    PhotoViewer]
})

export class VisitAddNote {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  inputShopAddCallCardData = {
    title: '',
    detail: '',
    start_date: '',
    howto: '',
    end_date: '',
    status: '',
    images: []
  }
  endPoint = 'http://128.199.72.29/';

  constructor(
    public app: App,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private photoViewer: PhotoViewer,
    @Inject(ConfigApp) private config: IAppConfig) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    // if (this.index || this.index == 0) {
    //   this.inputShopAddCallCardData.start_date = this.data.callcard[this.index].start_date;
    //   this.inputShopAddCallCardData.end_date = this.data.callcard[this.index].end_date;
    //   this.inputShopAddCallCardData.value = this.data.callcard[this.index].value;
    //   this.inputShopAddCallCardData.spst_no = this.data.callcard[this.index].spst_no;
    //   this.inputShopAddCallCardData.prq_no = this.data.callcard[this.index].prq_no;
    //   this.inputShopAddCallCardData.images = this.data.callcard[this.index].images;
    // }
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

  updateAddImage(res) {
    this.inputShopAddCallCardData.images.push(res.path);
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
              this.photoViewer.show(endpoint + this.inputShopAddCallCardData.images[index]);
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
            this.inputShopAddCallCardData.images.splice(index, 1);
          }
        }
      ]
    });
    alert.present();
  }

  save() {
    // if (this.inputShopAddCallCardData.start_date && this.inputShopAddCallCardData.end_date && this.inputShopAddCallCardData.value && this.inputShopAddCallCardData.spst_no && this.inputShopAddCallCardData.prq_no && this.inputShopAddCallCardData.images) {
    //   if (this.index != null || this.index != undefined) {
    //     this.data.callcard[this.index].start_date = this.inputShopAddCallCardData.start_date;
    //     this.data.callcard[this.index].end_date = this.inputShopAddCallCardData.end_date;
    //     this.data.callcard[this.index].value = this.inputShopAddCallCardData.value;
    //     this.data.callcard[this.index].spst_no = this.inputShopAddCallCardData.spst_no;
    //     this.data.callcard[this.index].prq_no = this.inputShopAddCallCardData.prq_no;
    //     this.data.callcard[this.index].images = this.inputShopAddCallCardData.images;
    //   } else {
    //     let callcard = {
    //       start_date: this.inputShopAddCallCardData.start_date,
    //       end_date: this.inputShopAddCallCardData.end_date,
    //       value: this.inputShopAddCallCardData.value,
    //       spst_no: this.inputShopAddCallCardData.spst_no,
    //       prq_no: this.inputShopAddCallCardData.prq_no,
    //       images: this.inputShopAddCallCardData.images
    //     }
    //     this.data.callcard.push(callcard);
    //   }
    // }
    this.customerDetailDataOutput.emit(this.data);
  }
}
