import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'activity-visit-add-sales',
  templateUrl: 'activity-visit-add-sales.html'
})

export class ActivityVisitAddSales {
  @Input('data') data;
  @Input('option') option;
  @Input('index') index;
  @Output() callbackData = new EventEmitter();
  optionsSale = {
    product_group: [{
      product_group_id: '',
      name: '',
      product: [{
        product_id: '',
        name: ''
      }]
    }],
    promotion: [{
      promotion_id: '',
      name: ''
    }]
  };
  indexProductGroup = 0;
  indexProduct = 0;
  indexPromotion = 0;
  inputActivityVisitAddSalesData = {
    unit_qty: '',
    subunit_qty: '',
    unit_price: '',
    subunit_price: ''
  }

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.option);
    console.log(this.index);

    this.optionsSale = this.option;
    if (this.index || this.index == 0) {
      this.setIndexProductGroup();
      this.setIndexPromotion();
      this.inputActivityVisitAddSalesData.unit_qty = this.data.sales[this.index].unit_qty;
      this.inputActivityVisitAddSalesData.subunit_qty = this.data.sales[this.index].subunit_qty;
      this.inputActivityVisitAddSalesData.unit_price = this.data.sales[this.index].unit_price;
      this.inputActivityVisitAddSalesData.subunit_price = this.data.sales[this.index].subunit_price;
    }
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'product_group') {
      title = 'เลือกยี่ห้อ';
      listSelectOption = this.optionsSale.product_group;
      keyOption = 'name';
      indexSelect = this.indexProductGroup;
    } else if (action == 'product') {
      title = 'เลือกสินค้า';
      listSelectOption = this.optionsSale.product_group[this.indexProductGroup].product;
      keyOption = 'name';
      indexSelect = this.indexProduct;
    } else if (action == 'promotion') {
      title = 'เลือกโปรโมชั่น';
      listSelectOption = this.optionsSale.promotion;
      keyOption = 'name';
      indexSelect = this.indexPromotion;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'product_group') {
        if (this.indexProductGroup != _params.indexSelect) {
          this.indexProduct = 0;
        }
        this.indexProductGroup = _params.indexSelect;
        resolve();
      } else if (_params.action == 'product') {
        this.indexProduct = _params.indexSelect;
        resolve();
      } else if (_params.action == 'promotion') {
        this.indexPromotion = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  setIndexProductGroup() {
    for (var i = 0; i < this.optionsSale.product_group.length; i++) {
      if (this.optionsSale.product_group[i].product_group_id == this.data.sales[this.index].product_group_id) {
        this.indexProductGroup = i;
        this.setIndexProduct(this.indexProductGroup);
        return
      }
    }
  }

  setIndexProduct(indexProductGroup) {
    for (var i = 0; i < this.optionsSale.product_group[indexProductGroup].product.length; i++) {
      if (this.optionsSale.product_group[indexProductGroup].product[i].product_id == this.data.sales[this.index].product_id) {
        return this.indexProduct = i;
      }
    }
  }

  setIndexPromotion() {
    for (var i = 0; i < this.optionsSale.promotion.length; i++) {
      if (this.optionsSale.promotion[i].promotion_id == this.data.sales[this.index].promotion_id) {
        return this.indexPromotion = i;
      }
    }
  }

  save() {
    if (this.indexProductGroup && this.indexProduct && this.inputActivityVisitAddSalesData.unit_qty && this.inputActivityVisitAddSalesData.subunit_qty && this.inputActivityVisitAddSalesData.unit_price && this.inputActivityVisitAddSalesData.subunit_price && this.indexPromotion) {
      if (this.index != null || this.index != undefined) {
        this.data.sales[this.index].product_group_id = this.optionsSale.product_group[this.indexProductGroup].product_group_id;
        this.data.sales[this.index].product_id = this.optionsSale.product_group[this.indexProductGroup].product[this.indexProduct].product_id,
        this.data.sales[this.index].unit_qty = this.inputActivityVisitAddSalesData.unit_qty;
        this.data.sales[this.index].subunit_qty = this.inputActivityVisitAddSalesData.subunit_qty;
        this.data.sales[this.index].unit_price = this.inputActivityVisitAddSalesData.unit_price;
        this.data.sales[this.index].subunit_price = this.inputActivityVisitAddSalesData.subunit_price;
        this.data.sales[this.index].promotion_id = this.optionsSale.promotion[this.indexPromotion].promotion_id;
      } else {
        let sales = {
          product_group_id: this.optionsSale.product_group[this.indexProductGroup].product_group_id,
          product_id: this.optionsSale.product_group[this.indexProductGroup].product[this.indexProduct].product_id,
          unit_qty: this.inputActivityVisitAddSalesData.unit_qty,
          subunit_qty: this.inputActivityVisitAddSalesData.subunit_qty,
          unit_price: this.inputActivityVisitAddSalesData.unit_price,
          subunit_price: this.inputActivityVisitAddSalesData.subunit_price,
          promotion_id: this.optionsSale.promotion[this.indexPromotion].promotion_id,
          sale_id: 0
        }
        this.data.sales.push(sales);
      }
    }
    this.callbackData.emit(this.data);
  }
}
