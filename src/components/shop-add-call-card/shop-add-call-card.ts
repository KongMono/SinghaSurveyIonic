import { AppUtilService } from './../../app/app.util';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IAppConfig, ConfigApp } from './../../app/app.config';
import { ActionSheetController, AlertController, App } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'shop-add-call-card',
  templateUrl: 'shop-add-call-card.html',
  providers: [
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
    spst_no: '',
    prq_no: '',
    images: []
  }
  endPoint = 'http://128.199.72.29/';

  constructor(
    public app: App,
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
      this.inputShopAddCallCardData.start_date = this.data.callcard[this.index].start_date;
      this.inputShopAddCallCardData.end_date = this.data.callcard[this.index].end_date;
      this.inputShopAddCallCardData.value = this.data.callcard[this.index].value;
      this.inputShopAddCallCardData.spst_no = this.data.callcard[this.index].spst_no;
      this.inputShopAddCallCardData.prq_no = this.data.callcard[this.index].prq_no;
      this.inputShopAddCallCardData.images = this.data.callcard[this.index].images;
    }
  }

  addImage() {

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
    if (this.inputShopAddCallCardData.start_date && this.inputShopAddCallCardData.end_date && this.inputShopAddCallCardData.value && this.inputShopAddCallCardData.spst_no && this.inputShopAddCallCardData.prq_no || this.inputShopAddCallCardData.images) {
      if (this.index != null || this.index != undefined) {
        this.data.callcard[this.index].start_date = this.inputShopAddCallCardData.start_date;
        this.data.callcard[this.index].end_date = this.inputShopAddCallCardData.end_date;
        this.data.callcard[this.index].value = this.inputShopAddCallCardData.value;
        this.data.callcard[this.index].spst_no = this.inputShopAddCallCardData.spst_no;
        this.data.callcard[this.index].prq_no = this.inputShopAddCallCardData.prq_no;
        this.data.callcard[this.index].images = this.inputShopAddCallCardData.images;
      } else {
        let callcard = {
          start_date: this.inputShopAddCallCardData.start_date,
          end_date: this.inputShopAddCallCardData.end_date,
          value: this.inputShopAddCallCardData.value,
          spst_no: this.inputShopAddCallCardData.spst_no,
          prq_no: this.inputShopAddCallCardData.prq_no,
          images: this.inputShopAddCallCardData.images
        }
        this.data.callcard.push(callcard);
      }
    }
    this.customerDetailDataOutput.emit(this.data);
  }
}
