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
import { LocationAccuracy } from '@ionic-native/location-accuracy';

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
  callback: any;
  map: any = { lat: 13.7, lng: 100.5, zoom: 15 };
  visit_id: any;
  optionsVisitSale: optionsVisitSaleModel;
  optionEquipment: optionEquipmentModel;
  visitCustomerDetailData: VisitCustomerDetailModel;
  visitCustomerDetail = {
    order: [{
      value: []
    }],
    boonrawd: [{
      value: []
    },
    {
      value: []
    },
    {
      value: []
    }],
    rival: [{
      value: []
    },
    {
      value: []
    },
    {
      value: []
    }],
    equipment: []
  };
  expand = {
    order: {
     collapse: false,
     icon: 'ios-arrow-down-outline'
    },
    boonrawd: {
      collapse: false,
      icon: 'ios-arrow-down-outline'
    },
    rival: {
      collapse: false,
      icon: 'ios-arrow-down-outline'
    },
    receipt: {
      collapse: false,
      icon: 'ios-arrow-down-outline'
    }
  };

  constructor(
    private locationAccuracy: LocationAccuracy,
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
    @Inject(ConfigApp) public config: IAppConfig) {
    this.callback = this.navParams.get("callback")
    this.visit_id = navParams.get('data');
    console.log(this.visit_id);
    console.log(navParams.get('status'));
  }

  ionViewDidLoad() {
    this.callGetOptionVisitSale();
  }

  backPage() {
    this.app.getRootNav().pop();
  }

  callGetVisitCustomerDetail(visit_id) {
    this.service.visitCustomerDetail(visit_id)
      .then((result: VisitCustomerDetailModel) => {
        this.visitCustomerDetailData = result;
        if (!this.visitCustomerDetailData.images) {
          this.visitCustomerDetailData.images = [];
        }
        if (!this.visitCustomerDetailData.remark || this.visitCustomerDetailData.remark == 'null') {
          this.visitCustomerDetailData.remark = '';
        }
        this.setVisitCustomerDetailData();
        this.enableLocation();
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetOptionVisitSale() {
    this.util.showLoading();
    this.service.optionVisitSale()
      .then((result: optionsVisitSaleModel) => {
        this.optionsVisitSale = result;
        this.callGetOptionEquipment();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetOptionEquipment() {
    this.service.optionEquipment()
      .then((result: optionEquipmentModel) => {
        this.optionEquipment = result;
        this.callGetVisitCustomerDetail(this.visit_id);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  setVisitCustomerDetailData() {
    this.setVisitCustomerDetailDataBoonrawd();
    this.setVisitCustomerDetailDataRival();
    this.setVisitCustomerDetailDataEquipment();
  }


  setVisitCustomerDetailDataBoonrawd() {
    for (var i = 0; i < this.visitCustomerDetailData.sale.boonrawd.length; i++) {
      if (this.visitCustomerDetailData.sale.boonrawd[i].value.length > 0) {
        this.visitCustomerDetail.boonrawd[i].value = [];
        for (var j = 0; j < this.visitCustomerDetailData.sale.boonrawd[i].value.length; j++) {
          for (var indexProduct = 0; indexProduct < this.optionsVisitSale.boonrawd.length; indexProduct++) {
            if (this.optionsVisitSale.boonrawd[indexProduct].product_id == this.visitCustomerDetailData.sale.boonrawd[i].value[j].product_id) {
              let boonrawd = {
                product: this.optionsVisitSale.boonrawd[indexProduct],
                qty: this.visitCustomerDetailData.sale.boonrawd[i].value[j].qty,
                buy: this.visitCustomerDetailData.sale.boonrawd[i].value[j].buy,
                stock: this.visitCustomerDetailData.sale.boonrawd[i].value[j].stock
              }
              this.visitCustomerDetail.boonrawd[i].value.push(boonrawd);
              indexProduct = this.optionsVisitSale.boonrawd.length;
            }
          }
        }
      } else {
        let boonrawd = {
          value: []
        }
        this.visitCustomerDetail.boonrawd.push(boonrawd);
      }
    }
  }

  setVisitCustomerDetailDataRival() {
    for (var i = 0; i < this.visitCustomerDetailData.sale.rival.length; i++) {
      if (this.visitCustomerDetailData.sale.rival[i].value.length > 0) {
        this.visitCustomerDetail.rival[i].value = [];
        for (var j = 0; j < this.visitCustomerDetailData.sale.rival[i].value.length; j++) {
          for (var indexProduct = 0; indexProduct < this.optionsVisitSale.rival.length; indexProduct++) {
            if (this.optionsVisitSale.rival[indexProduct].product_id == this.visitCustomerDetailData.sale.rival[i].value[j].product_id) {
              let rival = {
                product: this.optionsVisitSale.rival[indexProduct],
                qty: this.visitCustomerDetailData.sale.rival[i].value[j].qty,
                buy: this.visitCustomerDetailData.sale.rival[i].value[j].buy,
                stock: this.visitCustomerDetailData.sale.rival[i].value[j].stock
              }
              this.visitCustomerDetail.rival[i].value.push(rival);
              indexProduct = this.optionsVisitSale.rival.length;
            }
          }
        }
      } else {
        let rival = {
          value: []
        }
        this.visitCustomerDetail.rival.push(rival);
      }
    }
  }

  setVisitCustomerDetailDataEquipment() {
    if (this.visitCustomerDetailData.equipment.length > 0) {
      this.visitCustomerDetail.equipment = [];
      for (var i = 0; i < this.visitCustomerDetailData.equipment.length; i++) {
        for (var indexProductVendor = 0; indexProductVendor < this.optionEquipment.data.length; indexProductVendor++) {
          if (this.optionEquipment.data[indexProductVendor].product_vendor_id == this.visitCustomerDetailData.equipment[i].product_vendor_id) {
            for (var indexProductGroup = 0; indexProductGroup < this.optionEquipment.data[indexProductVendor].product_group.length; indexProductGroup++) {
              if (this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product_group_id == this.visitCustomerDetailData.equipment[i].product_group_id) {
                for (var indexProduct = 0; indexProduct < this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product.length; indexProduct++) {
                  if (this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product[indexProduct].product_id == this.visitCustomerDetailData.equipment[i].product_id) {
                    let equipment = {
                      product_vendor: {
                        product_vendor_id: this.optionEquipment.data[indexProductVendor].product_vendor_id,
                        name: this.optionEquipment.data[indexProductVendor].name
                      },
                      product_group: {
                        product_group_id: this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product_group_id,
                        name: this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].name
                      },
                      product: {
                        product_id: this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product[indexProduct].product_id,
                        name: this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product[indexProduct].name
                      },
                      qty: this.visitCustomerDetailData.equipment[i].qty
                    }
                    this.visitCustomerDetail.equipment.push(equipment);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  checkNoteEndDate(endDate) {
    if (!endDate) {
      return 'ไม่ระบุ';
    }
  }

  activities(index) {
    this.navCtrl.push('ActivityVisitPage', { data: this.visitCustomerDetailData.activities, optionEquipment: this.optionEquipment, index: index, callback: this.activitiesCallback },
      { animate: true, animation: 'transition', direction: 'forward' });
  }

  activitiesCallback = (_params) => {
    return new Promise(resolve => {
      console.log(_params);
      if (_params) {
        this.visitCustomerDetailData.activities = _params;
        resolve();
      } else {
        resolve();
      }
    });
  }

  actionSheetInActivityList(index) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: '_icon-edit',
          text: 'แก้ไข',
          handler: () => {
            this.activities(index);
          }
        }, {
          icon: '_icon-delete_file',
          text: 'ลบ',
          handler: () => {
            this.removeDataInActivityList(index);
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeDataInActivityList(index) {
    this.visitCustomerDetailData.activities.splice(index, 1);
  }

  expandCollapse(action) {
    switch (action) {
      case 'order':
        this.expand.order.collapse = !this.expand.order.collapse;
        if (this.expand.order.collapse) {
          this.expand.order.icon = 'ios-arrow-up-outline';
        } else {
          this.expand.order.icon = 'ios-arrow-down-outline';
        }
        break;
      case 'boonrawd':
        this.expand.boonrawd.collapse = !this.expand.boonrawd.collapse;
        if (this.expand.boonrawd.collapse) {
          this.expand.boonrawd.icon = 'ios-arrow-up-outline';
        } else {
          this.expand.boonrawd.icon = 'ios-arrow-down-outline';
        }
        break;
      case 'rival':
        this.expand.rival.collapse = !this.expand.rival.collapse;
        if (this.expand.rival.collapse) {
          this.expand.rival.icon = 'ios-arrow-up-outline';
        } else {
          this.expand.rival.icon = 'ios-arrow-down-outline';
        }
        break;
      case 'receipt':
        this.expand.receipt.collapse = !this.expand.receipt.collapse;
        if (this.expand.receipt.collapse) {
          this.expand.receipt.icon = 'ios-arrow-up-outline';
        } else {
          this.expand.receipt.icon = 'ios-arrow-down-outline';
        }
        break;
      default:
        break;
    }
  }

  popupInput(action, indexValue, indexPath) {
    let option;
    let index = indexValue;
    if (action == 'boonrawd' || action == 'rival') {
      if (action == 'boonrawd') {
        option = this.optionsVisitSale.boonrawd;
      } else if (action == 'rival') {
        option = this.optionsVisitSale.rival;
      }
      index = {
        indexPath: indexPath,
        indexValue: indexValue
      }
    } else if (action == 'equipment') {
      option = this.optionEquipment;
    }
    this.navCtrl.push('PopupInput',
      { action: action, data: this.visitCustomerDetailData, option: option, index: index, callback: this.popupInputCallback },
      { animate: true, animation: 'transition', direction: 'forward' });
  }

  popupInputCallback = (_params) => {
    return new Promise(resolve => {
      console.log(_params);
      if (_params.data) {
        this.visitCustomerDetailData = _params.data;
        if (_params.action == 'boonrawd') {
          this.setVisitCustomerDetailDataBoonrawd();
        } else if (_params.action == 'rival') {
          this.setVisitCustomerDetailDataRival();
        } else if (_params.action == 'equipment') {
          this.setVisitCustomerDetailDataEquipment();
        }
        resolve();
      } else {
        resolve();
      }
    });
  }

  actionSheetInList(action, index, indexPath) {
    let actionSheet;
    if (action == 'note' && this.visitCustomerDetailData.note[index].images.length > 0) {
      actionSheet = this.actionSheetCtrl.create({
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
                this.photoViewer.show(endpoint + this.visitCustomerDetailData.note[index].images[0]);
              });
            }
          }, {
            icon: '_icon-trash',
            text: 'ลบรูป',
            handler: () => {
              this.app.navPop().then(() => {
                this.confirmRemoveImage(action, index, 0);
              });
            }
          }, {
            icon: '_icon-edit',
            text: 'แก้ไข',
            handler: () => {
              this.popupInput(action, index, indexPath);
            }
          }, {
            icon: '_icon-delete_file',
            text: 'ลบ',
            handler: () => {
              this.removeDataInList(action, index, indexPath);
            }
          }
        ]
      });
    } else {
      actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            icon: '_icon-edit',
            text: 'แก้ไข',
            handler: () => {
              this.popupInput(action, index, indexPath);
            }
          }, {
            icon: '_icon-delete_file',
            text: 'ลบ',
            handler: () => {
              this.removeDataInList(action, index, indexPath);
            }
          }
        ]
      });
    }
    actionSheet.present();
  }

  removeDataInList(action, index, indexPath) {
    if (action == 'boonrawd' || action == 'rival') {
      this.visitCustomerDetailData.sale[action][indexPath].value.splice(index, 1);
      this.visitCustomerDetail[action][indexPath].value.splice(index, 1);
    } else {
      this.visitCustomerDetailData[action].splice(index, 1);
      if (action == 'equipment') {
        this.visitCustomerDetail[action].splice(index, 1);
      }
    }
  }

  addImage(action, indexMonth) {
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
            this.openCameraOrPhotoLibrary(action, indexMonth, options);
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
            this.openCameraOrPhotoLibrary(action, indexMonth, options);
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraOrPhotoLibrary(action, indexMonth, options) {
    this.camera.getPicture(options).then((imageData) => {
      if (action == 'receipt') {
        this.setUploadImageReceipt(indexMonth, imageData);
      } else if (action == 'tool') {
        this.setUploadImage(imageData);
      }
    }, (err) => {
      console.error(err);
    });
  }

  setUploadImageReceipt(indexMonth, imageBase64) {
    this.util.showLoading();
    this.service.uploadImageVisitCustomerVisit(imageBase64)
      .then(result => {
        this.util.hideLoading();
        console.log("uploadImageVisitCustomerVisit", result);
        this.updateAddImageReceipt(indexMonth, result);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  updateAddImageReceipt(indexMonth, res) {
    let imageReceipt = {
      id: '',
      value: res.path
    }
    this.visitCustomerDetailData.receipt[indexMonth].value.push(imageReceipt);
  }

  setUploadImage(imageBase64) {
    this.util.showLoading();
    this.service.uploadImageVisitCustomerSale(imageBase64)
      .then(result => {
        this.util.hideLoading();
        console.log("uploadImageVisitCustomerSale", result);
        this.updateAddImage(result);
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  updateAddImage(res) {
    this.visitCustomerDetailData.images.push(res.path);
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

  viewImage(action, index, subIndex) {
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
              if (action == 'receipt') {
                this.photoViewer.show(endpoint + this.visitCustomerDetailData.receipt[index].value[subIndex].value);
              } else if (action == 'tool') {
                this.photoViewer.show(endpoint + this.visitCustomerDetailData.images[subIndex]);
              }
            });
          }
        }, {
          icon: '_icon-trash',
          text: 'ลบ',
          handler: () => {
            this.app.navPop().then(() => {
              this.confirmRemoveImage(action, index, subIndex);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  confirmRemoveImage(action, index, subIndex) {
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
            if (action == 'receipt') {
              this.visitCustomerDetailData.receipt[index].value.splice(subIndex, 1);
            } else if (action == 'tool') {
              this.visitCustomerDetailData.images.splice(subIndex, 1);
            }
          }
        }
      ]
    });
    alert.present();
  }

  save() {
    this.callServiceUpdateVisitCustomer();
  }

  callServiceUpdateVisitCustomer() {
    this.util.showLoading();
    let customer_id = '';
    if (!this.navParams.get('status')) {
      customer_id = this.visitCustomerDetailData.customer_id;
    }
    this.service.updateVisitCustomer(
      this.config.userInfo.username,
      this.visitCustomerDetailData.id,
      this.visitCustomerDetailData.latitude,
      this.visitCustomerDetailData.longitude,
      this.visitCustomerDetailData.customer_id,
      this.visitCustomerDetailData.remark,
      JSON.stringify(this.visitCustomerDetailData.activities),
      JSON.stringify(this.visitCustomerDetailData.sale),
      JSON.stringify(this.visitCustomerDetailData.receipt),
      JSON.stringify(this.visitCustomerDetailData.equipment),
      JSON.stringify(this.visitCustomerDetailData.images),
      JSON.stringify(this.visitCustomerDetailData.note))
      .then(result => {
        this.util.hideLoading();
        this.callback().then(() => {
          this.backPage();
        });
        if (this.config.isBuildDevice) {
          this.service.setTracking(customer_id, '', 2, this.config.latitude, this.config.longitude)
            .then((resultTracking: any) => {
              console.log(resultTracking.status_code);
              this.util.showAlertDialog(result.msg);
            }, error => {
              console.log(error);
            });
        }
      }, error => {
        this.util.hideLoading();
        console.log(error.message);
      });
  }

  enableLocation() {

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.visitCustomerDetailData.latitude = resp.coords.latitude;
        this.visitCustomerDetailData.longitude = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });


    if (this.config.isBuildDevice) {
      this.locationAccuracy.canRequest().then(
        (canRequest: boolean) => {
          if (canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => alert('Request successful'),
              error => alert('Error requesting location permissions' + JSON.stringify(error))
            );
          }
        });
    }
  }
}
