import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IAppConfig, ConfigApp } from './../../app/app.config';
import { CallApi } from './../../providers/call-api';
import { SinghaSurveyService } from './../../providers/service';
import { AppUtilService } from './../../app/app.util';
import { NavController, ActionSheetController, AlertController, App } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'shop-add-call-card',
  templateUrl: 'shop-add-call-card.html',
  providers: [
    CallApi,
    SinghaSurveyService,
    AppUtilService,
    Camera,
    PhotoViewer]
})

export class ShopAddCallCard {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  inputShopAddCallCardData = {
    start_date: '',
    end_date: '',
    value: '',
    balance: '',
    spst_no: '',
    prq_no: '',
    images: ''
  }
  optionStatus = {
    status: [
      {
        status_id: '1',
        name: 'เปิดสัญญา'
      },{
        status_id: '2',
        name: 'ปิดสัญญา'
      }]
  };
  indexStatus = 0;
  endPoint = 'http://128.199.72.29/';

  constructor(
    public app: App,
    public navCtrl: NavController,
    public service: SinghaSurveyService,
    public util: AppUtilService,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private photoViewer: PhotoViewer,
    @Inject(ConfigApp) public config: IAppConfig) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    if (this.index || this.index == 0) {
      this.inputShopAddCallCardData.start_date = this.data.callcard[this.index].start_date;
      this.inputShopAddCallCardData.end_date = this.data.callcard[this.index].end_date;
      this.inputShopAddCallCardData.value = this.data.callcard[this.index].value;
      this.inputShopAddCallCardData.balance = this.data.callcard[this.index].balance;
      this.inputShopAddCallCardData.spst_no = this.data.callcard[this.index].spst_no;
      this.inputShopAddCallCardData.prq_no = this.data.callcard[this.index].prq_no;
      this.inputShopAddCallCardData.images = this.data.callcard[this.index].images;
      this.setIndexStatus();
    }
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'status') {
      title = 'เลือกสถานะ';
      listSelectOption = this.optionStatus.status;
      keyOption = 'name';
      indexSelect = this.indexStatus;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'status') {
        this.indexStatus = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  setIndexStatus() {
    for (var i = 0; i < this.optionStatus.status.length; i++) {
      if (this.optionStatus.status[i].status_id == this.data.callcard[this.index].status) {
        this.indexStatus = i;
        return
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
              correctOrientation: true,
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
              correctOrientation: true,
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
    this.service.uploadImageCustomerCallcard(imageBase64)
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
    // this.inputShopAddCallCardData.images.push(res.path);
    this.inputShopAddCallCardData.images = res.path;
  }

  getImagePath(images): string {
    let endpoint
    if (this.config.isProduction) {
      endpoint = this.config.endpoint_view_image_production;
    } else {
      endpoint = this.config.endpoint_view_image;
    }
    return endpoint + images;
  }

  viewImage() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'ios-image',
          text: 'ดูรูป',
          handler: () => {
            this.app.navPop().then(() => {
              let endpoint
              if (this.config.isProduction) {
                endpoint = this.config.endpoint_view_image_production;
              } else {
                endpoint = this.config.endpoint_view_image;
              }
              this.photoViewer.show(endpoint + this.inputShopAddCallCardData.images);
            });
          }
        }, {
          icon: '_icon-trash',
          text: 'ลบ',
          handler: () => {
            this.app.navPop().then(() => {
              this.confirmRemoveImage();
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  confirmRemoveImage() {
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
            // this.inputShopAddCallCardData.images.splice(index, 1);
            this.inputShopAddCallCardData.images = '';
          }
        }
      ]
    });
    alert.present();
  }

  save() {
    if (this.inputShopAddCallCardData.start_date && !this.inputShopAddCallCardData.end_date) {
      this.util.showAlertDialog('กรุณาเลือกสัญญาสิ้นสุด');
      return;
    } else if (!this.inputShopAddCallCardData.start_date && this.inputShopAddCallCardData.end_date) {
      this.util.showAlertDialog('กรุณาเลือกสัญญาเริ่ม');
      return;
    }
    if (this.inputShopAddCallCardData.start_date && this.inputShopAddCallCardData.end_date && this.inputShopAddCallCardData.spst_no && this.inputShopAddCallCardData.prq_no) {
      if (this.util.validateStartEndDate(this.inputShopAddCallCardData.start_date, this.inputShopAddCallCardData.end_date) <= 0) {
        this.util.showAlertDialog('สัญญาสิ้นสุดไม่สามารถเลือกน้อยกว่า หรือ เท่ากับสัญญาเริ่มได้');
        return;
      }
      if (!this.inputShopAddCallCardData.value) {
        this.inputShopAddCallCardData.value = '0';
      }
      if (!this.inputShopAddCallCardData.balance) {
        this.inputShopAddCallCardData.balance = '0';
      }
      if (this.index != null || this.index != undefined) {
        this.data.callcard[this.index].start_date = this.inputShopAddCallCardData.start_date;
        this.data.callcard[this.index].end_date = this.inputShopAddCallCardData.end_date;
        this.data.callcard[this.index].value = this.inputShopAddCallCardData.value;
        this.data.callcard[this.index].balance = this.inputShopAddCallCardData.balance;
        this.data.callcard[this.index].spst_no = this.inputShopAddCallCardData.spst_no;
        this.data.callcard[this.index].prq_no = this.inputShopAddCallCardData.prq_no;
        this.data.callcard[this.index].images = this.inputShopAddCallCardData.images;
        this.data.callcard[this.index].status = this.optionStatus.status[this.indexStatus].status_id;
      } else {
        let callcard = {
          start_date: this.inputShopAddCallCardData.start_date,
          end_date: this.inputShopAddCallCardData.end_date,
          value: this.inputShopAddCallCardData.value,
          balance: this.inputShopAddCallCardData.balance,
          spst_no: this.inputShopAddCallCardData.spst_no,
          prq_no: this.inputShopAddCallCardData.prq_no,
          images: this.inputShopAddCallCardData.images,
          status: this.optionStatus.status[this.indexStatus].status_id
        }
        this.data.callcard.push(callcard);
      }
      this.customerDetailDataOutput.emit(this.data);
    } else {
      this.util.showAlertDialog('กรุณากรอกข้อมูลให้ถูกต้อง');
      return;
    }
  }
}
