import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'visit-add-equipment',
  templateUrl: 'visit-add-equipment.html'
})

export class VisitAddEquipment {
  @Input('data') data;
  @Input('option') option;
  @Input('index') index;
  @Output() callbackData = new EventEmitter();
  optionEquipment = {
    data: [{
      product_vendor_id: '',
      name: '',
      product_group: [{
        product_group_id: '',
        name: '',
        product: [{
          product_id: '',
          name: ''
        }]
      }]
    }]
  };
  indexProductVendor = 0;
  indexProductGroup = 0;
  indexProduct = 0;
  inputVisitAddEquipmentData = {
    qty: ''
  }

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.option);
    console.log(this.index);

    this.optionEquipment = this.option;
    if (this.index || this.index == 0) {
      this.setIndexProductVendor();
      this.inputVisitAddEquipmentData.qty = this.data.equipment[this.index].qty;
    }
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'product_vendor') {
      title = 'เลือกบริษัท';
      listSelectOption = this.optionEquipment.data;
      keyOption = 'name';
      indexSelect = this.indexProductVendor;
    } else if (action == 'product_group') {
      title = 'เลือกยี่ห้อ';
      listSelectOption = this.optionEquipment.data[this.indexProductVendor].product_group;
      keyOption = 'name';
      indexSelect = this.indexProductGroup;
    } else if (action == 'product') {
      title = 'เลือกประเภท';
      listSelectOption = this.optionEquipment.data[this.indexProductVendor].product_group[this.indexProductGroup].product;
      keyOption = 'name';
      indexSelect = this.indexProduct;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'product_vendor') {
        if (this.indexProductVendor != _params.indexSelect) {
          this.indexProductGroup = 0;
          this.indexProduct = 0;
        }
        this.indexProductVendor = _params.indexSelect;
        resolve();
      } else if (_params.action == 'product_group') {
        if (this.indexProductGroup != _params.indexSelect) {
          this.indexProduct = 0;
        }
        this.indexProductGroup = _params.indexSelect;
        resolve();
      } else if (_params.action == 'product') {
        this.indexProduct = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  setIndexProductVendor() {
    for (var i = 0; i < this.optionEquipment.data.length; i++) {
      if (this.optionEquipment.data[i].product_vendor_id == this.data.equipment[this.index].product_vendor_id) {
        this.indexProductVendor = i;
        this.setIndexProductGroup(this.indexProductVendor);
        return
      }
    }
  }

  setIndexProductGroup(indexProductVendor) {
    for (var i = 0; i < this.optionEquipment.data[indexProductVendor].product_group.length; i++) {
      if (this.optionEquipment.data[indexProductVendor].product_group[i].product_group_id == this.data.equipment[this.index].product_group_id) {
        this.indexProductGroup = i;
        this.setIndexProduct(indexProductVendor, this.indexProductGroup);
        return
      }
    }
  }

  setIndexProduct(indexProductVendor, indexProductGroup) {
    for (var i = 0; i < this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product.length; i++) {
      if (this.optionEquipment.data[indexProductVendor].product_group[indexProductGroup].product[i].product_id == this.data.equipment[this.index].product_id) {
        return this.indexProduct = i;
      }
    }
  }

  save() {
    // if (this.indexProductVendor && this.indexProductGroup && this.indexProduct && this.inputVisitAddEquipmentData.qty) {
    if (this.indexProductVendor && this.indexProductGroup && this.indexProduct) {
      if (this.index != null || this.index != undefined) {
        this.data.equipment[this.index].product_vendor_id = this.optionEquipment.data[this.indexProductVendor].product_vendor_id;
        this.data.equipment[this.index].product_group_id = this.optionEquipment.data[this.indexProductVendor].product_group[this.indexProductGroup].product_group_id;
        this.data.equipment[this.index].product_id = this.optionEquipment.data[this.indexProductVendor].product_group[this.indexProductGroup].product[this.indexProduct].product_id,
        this.data.equipment[this.index].qty = this.inputVisitAddEquipmentData.qty;
      } else {
        let equipment = {
          product_vendor_id: this.optionEquipment.data[this.indexProductVendor].product_vendor_id,
          product_group_id: this.optionEquipment.data[this.indexProductVendor].product_group[this.indexProductGroup].product_group_id,
          product_id: this.optionEquipment.data[this.indexProductVendor].product_group[this.indexProductGroup].product[this.indexProduct].product_id,
          qty: this.inputVisitAddEquipmentData.qty,
          equipment_id: 0
        }
        this.data.equipment.push(equipment);
      }
      this.callbackData.emit(this.data);
    }
  }
}
