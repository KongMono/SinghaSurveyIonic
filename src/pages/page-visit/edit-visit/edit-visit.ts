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
  optionsVisitSale: optionsVisitSaleModel;
  optionEquipment: optionEquipmentModel;
  visitCustomerDetailData: VisitCustomerDetailModel;
  visitCustomerDetail = {
    order: [{
      value: []
    }],
    boonrawd: [{
      value: []
    }],
    rival: [{
      value: []
    }],
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
    this.visit_id = navParams.get('data');
    console.log(this.visit_id);
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
        this.setVisitCustomerDetailData();
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
    // this.setVisitCustomerDetailDataOrder();
    this.setVisitCustomerDetailDataBoonrawd();
    this.setVisitCustomerDetailDataRival();
    this.setVisitCustomerDetailDataEquipment();
  }
  
  // setVisitCustomerDetailDataOrder() {
  //   for (var i = 0; i < this.visitCustomerDetailData.order.length; i++) {
  //     if (this.visitCustomerDetailData.order[i].value.length > 0) {
  //       for (var j = 0; j < this.visitCustomerDetailData.order[i].value.length; j++) {
  //         // this.visitCustomerDetail.order[j].value = [];
  //         for (var indexProduct = 0; indexProduct < this.optionsVisitSale.boonrawd.length; indexProduct++) {
  //           if (this.optionsVisitSale.boonrawd[indexProduct].product_id == this.visitCustomerDetailData.order[i].value[j].product_id) {
  //             let order = {
  //               product: this.optionsVisitSale.boonrawd[indexProduct],
  //               qty: this.visitCustomerDetailData.order[i].value[j].qty,
  //               buy: this.visitCustomerDetailData.order[i].value[j].buy,
  //               stock: this.visitCustomerDetailData.order[i].value[j].stock
  //             }
  //             this.visitCustomerDetail.order[i].value.push(order);
  //             indexProduct = this.optionsVisitSale.boonrawd.length;
  //           }
  //         }
  //       }
  //     } else {
  //       let order = {
  //         value: []
  //       }
  //       this.visitCustomerDetail.order.push(order);
  //     }
  //   }
  // }
  
  setVisitCustomerDetailDataBoonrawd() {
    for (var i = 0; i < this.visitCustomerDetailData.sale.boonrawd.length; i++) {
      if (this.visitCustomerDetailData.sale.boonrawd[i].value.length > 0) {
        for (var j = 0; j < this.visitCustomerDetailData.sale.boonrawd[i].value.length; j++) {
          // this.visitCustomerDetail.sale.boonrawd[j].value = [];
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
        for (var j = 0; j < this.visitCustomerDetailData.sale.rival[i].value.length; j++) {
          // this.visitCustomerDetail.sale.rival[j].value = [];
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

  // public setCustomerDetailDataChannels() {
  //   if (this.customerDetailData.channels.length > 0) {
  //     this.customerDetail.channels = [];
  //     for (var i = 0; i < this.customerDetailData.channels.length; i++) {
  //       for (var indexCustomerGroup = 0; indexCustomerGroup < this.optionChannelCustomer.customer_group.length; indexCustomerGroup++) {
  //         if (this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_group_id == this.customerDetailData.channels[i].customer_group_id) {
  //           for (var indexCustomerChannel = 0; indexCustomerChannel < this.optionChannelCustomer.customer_group.length; indexCustomerChannel++) {
  //             if (this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[indexCustomerChannel].id == this.customerDetailData.channels[i].channel_id) {
  //               let channels = {
  //                 customer_group: {
  //                   customer_group_id: this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_group_id,
  //                   name: this.optionChannelCustomer.customer_group[indexCustomerGroup].name
  //                 },
  //                 customer_channel: {
  //                   id: this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[indexCustomerChannel].id,
  //                   name: this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[indexCustomerChannel].name
  //                 },
  //                 product_category: {
  //                   product_category_id: '',
  //                   name: ''
  //                 }
  //               }
  //               this.customerDetail.channels.push(channels);
  //             }
  //           }
  //         }
  //       }
  //       for (var indexProductCategory = 0; indexProductCategory < this.optionChannelCustomer.product_category.length; indexProductCategory++) {
  //         if (this.optionChannelCustomer.product_category[indexProductCategory].product_category_id == this.customerDetailData.channels[i].product_category_id) {
  //           this.customerDetail.channels[this.customerDetail.channels.length - 1].product_category.product_category_id = this.optionChannelCustomer.product_category[indexProductCategory].product_category_id;
  //           this.customerDetail.channels[this.customerDetail.channels.length - 1].product_category.name = this.optionChannelCustomer.product_category[indexProductCategory].name;
  //         }
  //       }
  //     }
  //   }
  // }

  popupInput(action, index) {
    let option;
    if (action == 'equipment') {
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
        // if (_params.action == 'channels') {
        //   this.setCustomerDetailDataChannels();
        // }
        resolve();
      } else {
        resolve();
      }
    });
  }
}
