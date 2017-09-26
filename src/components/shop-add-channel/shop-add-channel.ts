import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUtilService } from './../../app/app.util';

@Component({
  selector: 'shop-add-channel',
  templateUrl: 'shop-add-channel.html',
  providers: [AppUtilService]
})

export class ShopAddChannel {
  @Input('customerDetailDataInput') data;
  @Input('option') option;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  optionChannelCustomer = {
    customer_group: [{
      customer_group_id: '',
      name: '',
      customer_channel: [{
        id: '',
        name: ''
      }]
    }],
    product_category: [
      {
        product_category_id: '',
        name: ''
      }]
  };
  indexCustomerGroup = 0;
  indexCustomerChannel = 0;
  indexProductCategory = 0;

  constructor(public navCtrl: NavController, public util: AppUtilService) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.option);
    console.log(this.index);

    this.optionChannelCustomer = this.option;
    if (this.index || this.index == 0) {
      this.setIndexCustomerGroup();
      this.setIndexProductCategory();
    }
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'customer_group') {
      title = 'เลือกกลุ่มร้านค้า';
      listSelectOption = this.optionChannelCustomer.customer_group;
      keyOption = 'name';
      indexSelect = this.indexCustomerGroup;
    } else if (action == 'customer_channel') {
      title = 'เลือกตัวแทน/ค้าส่ง';
      listSelectOption = this.optionChannelCustomer.customer_group[this.indexCustomerGroup].customer_channel;
      keyOption = 'name';
      indexSelect = this.indexCustomerChannel;
    } else if (action == 'product_category') {
      title = 'เลือกประเภทสินค้า';
      listSelectOption = this.optionChannelCustomer.product_category;
      keyOption = 'name';
      indexSelect = this.indexProductCategory;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'customer_group') {
        if (this.indexCustomerGroup != _params.indexSelect) {
          this.indexCustomerChannel = 0;
        }
        this.indexCustomerGroup = _params.indexSelect;
        resolve();
      } else if (_params.action == 'customer_channel') {
        this.indexCustomerChannel = _params.indexSelect;
        resolve();
      } else if (_params.action == 'product_category') {
        this.indexProductCategory = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  setIndexCustomerGroup() {
    for (var i = 0; i < this.optionChannelCustomer.customer_group.length; i++) {
      if (this.optionChannelCustomer.customer_group[i].customer_group_id == this.data.channels[this.index].customer_group_id) {
        this.indexCustomerGroup = i;
        this.setIndexCustomerChannel(this.indexCustomerGroup);
        return
      }
    }
  }

  setIndexCustomerChannel(indexCustomerGroup) {
    for (var i = 0; i < this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel.length; i++) {
      if (this.optionChannelCustomer.customer_group[indexCustomerGroup].customer_channel[i].id == this.data.channels[this.index].channel_id) {
        return this.indexCustomerChannel = i;
      }
    }
  }

  setIndexProductCategory() {
    for (var i = 0; i < this.optionChannelCustomer.product_category.length; i++) {
      if (this.optionChannelCustomer.product_category[i].product_category_id == this.data.channels[this.index].product_category_id) {
        return this.indexProductCategory = i;
      }
    }
  }

  save() {
    if (this.indexCustomerGroup && this.indexCustomerChannel && this.indexProductCategory) {
      if (this.index != null || this.index != undefined) {
        this.data.channels[this.index].customer_group_id = this.optionChannelCustomer.customer_group[this.indexCustomerGroup].customer_group_id;
        this.data.channels[this.index].channel_id = this.optionChannelCustomer.customer_group[this.indexCustomerGroup].customer_channel[this.indexCustomerChannel].id;
        this.data.channels[this.index].product_category_id = this.optionChannelCustomer.product_category[this.indexProductCategory].product_category_id;
      } else {
        let channels = {
          customer_group_id: this.optionChannelCustomer.customer_group[this.indexCustomerGroup].customer_group_id,
          channel_id: this.optionChannelCustomer.customer_group[this.indexCustomerGroup].customer_channel[this.indexCustomerChannel].id,
          product_category_id: this.optionChannelCustomer.product_category[this.indexProductCategory].product_category_id,
          customer_channel_id: 0
        }
        this.data.channels.push(channels);
      }
      this.customerDetailDataOutput.emit(this.data);
    } else {
      this.util.showAlertDialog('กรุณาเลือกข้อมูล');
      return;
    }
  }
}
