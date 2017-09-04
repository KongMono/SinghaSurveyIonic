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
  @Input('data') data;
  @Input('index') index;
  @Output() callbackData = new EventEmitter();
  inputVisitAddNoteData = {
    title: '',
    detail: '',
    start_date: '',
    howto: '',
    end_date: '',
    status: '1',
    images: []
  }
  status = {
    progress: true,
    complete: false,
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

    if (this.index || this.index == 0) {
      this.inputVisitAddNoteData.title = this.data.note[this.index].title;
      this.inputVisitAddNoteData.detail = this.data.note[this.index].detail;
      this.inputVisitAddNoteData.start_date = this.data.note[this.index].start_date;
      this.inputVisitAddNoteData.howto = this.data.note[this.index].howto;
      this.inputVisitAddNoteData.end_date = this.data.note[this.index].end_date;
      this.inputVisitAddNoteData.status = this.data.note[this.index].status;
      if (this.inputVisitAddNoteData.status == '1') {
        this.status.progress = true;
        this.status.complete = false;
      } else if (this.inputVisitAddNoteData.status == '2') {
        this.status.progress = false;
        this.status.complete = true;
      }
      this.inputVisitAddNoteData.images = this.data.note[this.index].images;
    }
  }

  changeStatus(action) {
    if (action == 'progress') {
      if (this.status.progress) {
        this.status.complete = false;
        this.inputVisitAddNoteData.status = '1';
      } else if (!this.status.progress) {
        this.status.complete = true;
        this.inputVisitAddNoteData.status = '2';
      }
    } else if (action == 'complete') {
      if (this.status.complete) {
        this.status.progress = false;
        this.inputVisitAddNoteData.status = '2';
      } else if (!this.status.complete) {
        this.status.progress = true;
        this.inputVisitAddNoteData.status = '1';
      }
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
              quality: 50,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
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
              quality: 50,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
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
    this.service.uploadImageVisitCustomerNote(imageBase64)
      .then(result => {
        this.util.hideLoading();
        console.log("uploadImageVisitCustomerNote", result);
        this.updateAddImage(result);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  updateAddImage(res) {
    this.inputVisitAddNoteData.images.push(res.path);
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
              this.photoViewer.show(endpoint + this.inputVisitAddNoteData.images[index]);
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
            this.inputVisitAddNoteData.images.splice(index, 1);
          }
        }
      ]
    });
    alert.present();
  }

  save() {
    if (this.inputVisitAddNoteData.title && this.inputVisitAddNoteData.detail && this.inputVisitAddNoteData.start_date && this.inputVisitAddNoteData.howto && this.inputVisitAddNoteData.end_date && this.inputVisitAddNoteData.status) {
    // if (this.inputVisitAddNoteData.title && this.inputVisitAddNoteData.detail && this.inputVisitAddNoteData.start_date && this.inputVisitAddNoteData.howto && this.inputVisitAddNoteData.end_date && this.inputVisitAddNoteData.status && this.inputVisitAddNoteData.images.length > 0) {
      if (this.index != null || this.index != undefined) {
        this.data.note[this.index].title = this.inputVisitAddNoteData.title;
        this.data.note[this.index].detail = this.inputVisitAddNoteData.detail;
        this.data.note[this.index].start_date = this.inputVisitAddNoteData.start_date;
        this.data.note[this.index].howto = this.inputVisitAddNoteData.howto;
        this.data.note[this.index].end_date = this.inputVisitAddNoteData.end_date;
        this.data.note[this.index].status = this.inputVisitAddNoteData.status;
        this.data.note[this.index].images = this.inputVisitAddNoteData.images;
      } else {
        let note = {
          title: this.inputVisitAddNoteData.title,
          detail: this.inputVisitAddNoteData.detail,
          start_date: this.inputVisitAddNoteData.start_date,
          howto: this.inputVisitAddNoteData.howto,
          end_date: this.inputVisitAddNoteData.end_date,
          status: this.inputVisitAddNoteData.status,
          images: this.inputVisitAddNoteData.images
        }
        this.data.note.push(note);
      }
    }
    this.callbackData.emit(this.data);
  }
}
