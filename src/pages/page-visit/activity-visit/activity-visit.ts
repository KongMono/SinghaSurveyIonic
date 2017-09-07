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
  data: any;
  optionEquipment: optionEquipmentModel;
  index: any;
  callback: any;
  optionsActivity: optionsActivityModel;
  optionsSale: optionsSaleModel;
  visitActivityDetailData: visitActivityDetailModel = {
    visit_activity_id: '',
    venue_type: '',
    venue_name: '',
    vendor_id: '',
    tradition_type_id: '',
    activity_name: '',
    start_date: '',
    end_date: '',
    activity_master_id: '',
    activity_id: '',
    pg: [],
    sales: [],
    equipment: [],
    images: [],
    sale_images: []
  };
  venue = {
    internalPlace: false,
    externalPlace: false,
  }
  indexVendor = 0;
  indexTraditionType = 0;
  indexActivityMaster = 0;
  indexActivity = 0;
  visitActivityDetail = {
    sales: [],
    equipment: []
  };

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
    this.data = navParams.get('data');
    this.optionEquipment = navParams.get('optionEquipment');
    this.index = navParams.get('index');
    console.log(this.data);
    console.log(this.optionEquipment);
    console.log(this.index);
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {

    this.callGetOptionActivity();
  }

  backPage() {
    this.navCtrl.pop({ animate: true, animation: 'transition', direction: 'back' });
  }

  callGetOptionActivity() {
    this.util.showLoading();
    this.service.optionActivity()
      .then((result: optionsActivityModel) => {
        this.optionsActivity = result;
        this.callGetOptionSale();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetOptionSale() {
    this.service.optionSale()
      .then((result: optionsSaleModel) => {
        this.optionsSale = result;
        if (this.index != null || this.index != undefined) {
          this.callGetVisitActivityDetail();
        } else {
          this.util.hideLoading();
        }
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  callGetVisitActivityDetail() {
    this.service.visitActivityDetail(this.data[this.index].id)
      .then((result: visitActivityDetailModel) => {
        this.visitActivityDetailData = result;
        if (this.visitActivityDetailData.venue_type == '1') {
          this.venue.internalPlace = true;
          this.venue.externalPlace = false;
        } else if (this.visitActivityDetailData.venue_type == '2') {
          this.venue.internalPlace = false;
          this.venue.externalPlace = true;
        }

        this.setIndexVendor();
        this.setIndexTraditionType();
        this.setVisitActivityDetailDataSales();
        this.setVisitActivityDetailDataEquipment();

        if (!this.visitActivityDetailData.images) {
          this.visitActivityDetailData.images = [];
        }

        if (!this.visitActivityDetailData.sale_images) {
          this.visitActivityDetailData.sale_images = [];
        }
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
        console.log(error);
      });
  }

  setIndexVendor() {
    for (var i = 0; i < this.optionsActivity.vendor.length; i++) {
      if (this.optionsActivity.vendor[i].vendor_id == this.visitActivityDetailData.vendor_id) {
        return this.indexVendor = i;
      }
    }
  }

  setIndexTraditionType() {
    for (var i = 0; i < this.optionsActivity.tradition_type.length; i++) {
      if (this.optionsActivity.tradition_type[i].tradition_type_id == this.visitActivityDetailData.tradition_type_id) {
        this.indexTraditionType = i;
        this.setIndexActivityMaster(this.indexTraditionType);
        return
      }
    }
  }

  setIndexActivityMaster(indexTraditionType) {
    for (var i = 0; i < this.optionsActivity.tradition_type[indexTraditionType].activity_master.length; i++) {
      if (this.optionsActivity.tradition_type[indexTraditionType].activity_master[i].activity_master_id == this.visitActivityDetailData.activity_master_id) {
        this.indexActivityMaster = i;
        this.setIndexActivity(indexTraditionType, this.indexActivityMaster);
        return
      }
    }
  }

  setIndexActivity(indexTraditionType, indexActivityMaster) {
    for (var i = 0; i < this.optionsActivity.tradition_type[indexTraditionType].activity_master[indexActivityMaster].activity.length; i++) {
      if (this.optionsActivity.tradition_type[indexTraditionType].activity_master[indexActivityMaster].activity[i].activity_id == this.visitActivityDetailData.activity_id) {
        return this.indexActivity = i;
      }
    }
  }

  setVisitActivityDetailDataSales() {
    if (this.visitActivityDetailData.sales.length > 0) {
      this.visitActivityDetail.sales = [];
      for (var i = 0; i < this.visitActivityDetailData.sales.length; i++) {
        for (var indexProductGroup = 0; indexProductGroup < this.optionsSale.product_group.length; indexProductGroup++) {
          if (this.optionsSale.product_group[indexProductGroup].product_group_id == this.visitActivityDetailData.sales[i].product_group_id) {
            for (var indexProduct = 0; indexProduct < this.optionsSale.product_group[indexProductGroup].product.length; indexProduct++) {
              if (this.optionsSale.product_group[indexProductGroup].product[indexProduct].product_id == this.visitActivityDetailData.sales[i].product_id) {
                let sales = {
                  product_group: {
                    product_group_id: this.optionsSale.product_group[indexProductGroup].product_group_id,
                    name: this.optionsSale.product_group[indexProductGroup].name
                  },
                  product: {
                    product_id: this.optionsSale.product_group[indexProductGroup].product[indexProduct].product_id,
                    name: this.optionsSale.product_group[indexProductGroup].product[indexProduct].name
                  },
                  unit_qty: this.visitActivityDetailData.sales[i].unit_qty,
                  subunit_qty: this.visitActivityDetailData.sales[i].subunit_qty,
                  unit_price: this.visitActivityDetailData.sales[i].unit_price,
                  subunit_price: this.visitActivityDetailData.sales[i].subunit_price,
                  promotion: {
                    promotion_id: '',
                    name: ''
                  }
                }
                this.visitActivityDetail.sales.push(sales);
                indexProduct = this.optionsSale.product_group[indexProductGroup].product.length;
              }
            }
            indexProductGroup = this.optionsSale.product_group.length;
          }
        }
        for (var indexPromotion = 0; indexPromotion < this.optionsSale.promotion.length; indexPromotion++) {
          if (this.optionsSale.promotion[indexPromotion].promotion_id == this.visitActivityDetailData.sales[i].promotion_id) {
            this.visitActivityDetail.sales[this.visitActivityDetail.sales.length - 1].promotion.promotion_id = this.optionsSale.promotion[indexPromotion].promotion_id;
            this.visitActivityDetail.sales[this.visitActivityDetail.sales.length - 1].promotion.name = this.optionsSale.promotion[indexPromotion].name;
          }
        }
      }
    }
  }

  setVisitActivityDetailDataEquipment() {
    if (this.visitActivityDetailData.equipment.length > 0) {
      this.visitActivityDetail.equipment = [];
      for (var i = 0; i < this.visitActivityDetailData.equipment.length; i++) {
        for (var indexProductVendor = 0; indexProductVendor < this.optionEquipment.data.length; indexProductVendor++) {
          if (this.optionEquipment.data[indexProductVendor].product_vendor_id == this.visitActivityDetailData.equipment[i].product_vendor_id) {
            for (var indexProductGroup = 0; indexProductGroup < this.optionEquipment.data[indexProductVendor].product_group.length; indexProductGroup++) {
              if (this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product_group_id == this.visitActivityDetailData.equipment[i].product_group_id) {
                for (var indexProduct = 0; indexProduct < this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product.length; indexProduct++) {
                  if (this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product[indexProduct].product_id == this.visitActivityDetailData.equipment[i].product_id) {
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
                      qty: this.visitActivityDetailData.equipment[i].qty
                    }
                    this.visitActivityDetail.equipment.push(equipment);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  changeVenue(action) {
    if (action == 'internalPlace') {
      if (this.venue.internalPlace) {
        this.venue.externalPlace = false;
        this.visitActivityDetailData.venue_type = '1';
        this.visitActivityDetailData.venue_name = '';
      } else if (!this.venue.internalPlace) {
        this.venue.externalPlace = true;
        this.visitActivityDetailData.venue_type = '2';
      }
    } else if (action == 'externalPlace') {
      if (this.venue.externalPlace) {
        this.venue.internalPlace = false;
        this.visitActivityDetailData.venue_type = '2';
      } else if (!this.venue.externalPlace) {
        this.venue.internalPlace = true;
        this.visitActivityDetailData.venue_type = '1';
        this.visitActivityDetailData.venue_name = '';
      }
    }
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'vendor') {
      title = 'เลือกบริษัท';
      listSelectOption = this.optionsActivity.vendor;
      keyOption = 'name';
      indexSelect = this.indexVendor;
    } else if (action == 'tradition_type') {
      title = 'เลือกประเภท';
      listSelectOption = this.optionsActivity.tradition_type;
      keyOption = 'tradition_name';
      indexSelect = this.indexTraditionType;
    } else if (action == 'activity_master') {
      title = 'เลือกกลุ่มกิจกรรม';
      listSelectOption = this.optionsActivity.tradition_type[this.indexTraditionType].activity_master;
      keyOption = 'activity_master_name';
      indexSelect = this.indexActivityMaster;
    } else if (action == 'activity') {
      title = 'เลือกกิจกรรม';
      listSelectOption = this.optionsActivity.tradition_type[this.indexTraditionType].activity_master[this.indexActivityMaster].activity;
      keyOption = 'activity_name';
      indexSelect = this.indexActivity;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'vendor') {
        this.indexVendor = _params.indexSelect;
        resolve();
      } else if (_params.action == 'tradition_type') {
        if (this.indexTraditionType != _params.indexSelect) {
          this.indexActivityMaster = 0;
          this.indexActivity = 0;
        }
        this.indexTraditionType = _params.indexSelect;
        resolve();
      } else if (_params.action == 'activity_master') {
        if (this.indexActivityMaster != _params.indexSelect) {
          this.indexActivity = 0;
        }
        this.indexActivityMaster = _params.indexSelect;
        resolve();
      } else if (_params.action == 'activity') {
        this.indexActivity = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  popupInput(action, index) {
    let option;
    if (action == 'sales') {
      option = this.optionsSale;
    } else if (action == 'equipment') {
      option = this.optionEquipment;
    }
    this.navCtrl.push('PopupInput',
      { action: action, data: this.visitActivityDetailData, option: option, index: index, callback: this.popupInputCallback },
      { animate: true, animation: 'transition', direction: 'forward' });
  }

  popupInputCallback = (_params) => {
    return new Promise(resolve => {
      console.log(_params);
      if (_params.data) {
        this.visitActivityDetailData = _params.data;
        if (_params.action == 'sales') {
          this.setVisitActivityDetailDataSales();
        }
        else if (_params.action == 'equipment') {
          this.setVisitActivityDetailDataEquipment();
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
    this.visitActivityDetailData[action].splice(index, 1);
    if (action == 'sales') {
      this.visitActivityDetail[action].splice(index, 1);
    } else if (action == 'equipment') {
      this.visitActivityDetail[action].splice(index, 1);
    }
  }

  addImage(action) {
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
            this.openCameraOrPhotoLibrary(action, options);
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
            this.openCameraOrPhotoLibrary(action, options);
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraOrPhotoLibrary(action, options) {
    this.camera.getPicture(options).then((imageData) => {
      this.setUploadImage(action, imageData);
    }, (err) => {
      console.error(err);
    });
  }

  setUploadImage(action, imageBase64) {
    this.util.showLoading();
    if (action == 'tool') {
      this.service.uploadImageVisitCustomerTool(imageBase64)
        .then(result => {
          this.util.hideLoading();
          console.log("uploadImageVisitCustomerTool", result);
          this.visitActivityDetailData.sale_images.push(result.path);
        }, error => {
          this.util.hideLoading();
          console.log(error);
        });
    } else if (action == 'activity') {
      this.service.uploadImageVisitCustomerActivity(imageBase64)
        .then(result => {
          this.util.hideLoading();
          console.log("uploadImageVisitCustomerActivity", result);
          this.visitActivityDetailData.images.push(result.path);
        }, error => {
          this.util.hideLoading();
          console.log(error);
        });
    }
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

  viewImage(action, index) {
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
              if (action == 'tool') {
                this.photoViewer.show(endpoint + this.visitActivityDetailData.sale_images[index]);
              } else if (action == 'activity') {
                this.photoViewer.show(endpoint + this.visitActivityDetailData.images[index]);
              }
            });
          }
        }, {
          icon: '_icon-trash',
          text: 'ลบ',
          handler: () => {
            this.app.navPop().then(() => {
              this.confirmRemoveImage(action, index);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  confirmRemoveImage(action, index) {
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
            if (action == 'tool') {
              this.visitActivityDetailData.sale_images.splice(index, 1);
            } else if (action == 'activity') {
              this.visitActivityDetailData.images.splice(index, 1);
            }
          }
        }
      ]
    });
    alert.present();
  }

  save() {
    if (this.visitActivityDetailData.venue_type == '') {
      this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }

    if (this.visitActivityDetailData.venue_type == "2") {
      if (this.visitActivityDetailData.venue_name == "") {
        this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
        return;
      }
    }

    if (this.optionsActivity.vendor[this.indexVendor].vendor_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกบริษัท");
      return;
    }

    if (this.optionsActivity.tradition_type[this.indexTraditionType].tradition_type_id == ("0")) {
      this.util.showAlertDialog("กรุณาเลือกประเภท");
      return;
    }

    if (this.visitActivityDetailData.activity_name == "") {
      this.util.showAlertDialog("กรุณากรอกข้อมูลให้ถูกต้อง");
    }

    this.callApiUpdate();
  }

  callApiUpdate() {
    this.util.showLoading();
    this.service.updateVisitActivity(
      this.config.userInfo.username,
      this.visitActivityDetailData.visit_activity_id,
      this.visitActivityDetailData.venue_type,
      this.visitActivityDetailData.venue_name,
      this.optionsActivity.vendor[this.indexVendor].vendor_id,
      this.optionsActivity.tradition_type[this.indexTraditionType].tradition_type_id,
      this.optionsActivity.tradition_type[this.indexTraditionType].activity_master[this.indexActivityMaster].activity_master_id,
      this.optionsActivity.tradition_type[this.indexTraditionType].activity_master[this.indexActivityMaster].activity[this.indexActivity].activity_id,
      this.visitActivityDetailData.activity_name,
      this.visitActivityDetailData.start_date,
      this.visitActivityDetailData.end_date,
      JSON.stringify(this.visitActivityDetailData.pg),
      JSON.stringify(this.visitActivityDetailData.sales),
      JSON.stringify(this.visitActivityDetailData.equipment),
      JSON.stringify(this.visitActivityDetailData.images),
      JSON.stringify(this.visitActivityDetailData.sale_images))
      .then(result => {
        this.util.hideLoading();
        this.util.showAlertDialog(result.msg);

        if (this.index != null || this.index != undefined) {
          this.data[this.index].name = result.data.name;
        } else {
          let activities = {
            id: result.data.id,
            name: result.data.name
          }
          this.data.push(activities);
        }

        this.callback(this.data).then(() => {
          this.backPage();
        }, error => {

        });
      }, error => {
        this.util.hideLoading();
        console.log(error.message);
      });
  }
}
