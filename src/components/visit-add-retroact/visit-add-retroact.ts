import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUtilService } from './../../app/app.util';

@Component({
  selector: 'visit-add-retroact',
  templateUrl: 'visit-add-retroact.html',
  providers: [AppUtilService]
})

export class VisitAddRetroact {
  @Input('action') action;
  @Input('data') data;
  @Input('option') option;
  @Input('index') index;
  @Output() callbackData = new EventEmitter();
  optionsVisitSale = [{
    product_group_id: '',
    product_group_name: '',
    products: []
  }];
  indexProduct = 0;

  retroact = [];

  constructor(public navCtrl: NavController, public util: AppUtilService) {

  }

  ngAfterViewInit() {
    console.log(this.action);
    console.log(this.data);
    console.log(this.option);
    console.log(this.index);

    this.optionsVisitSale = this.option;
  }

  selectOption(action) {
    let title, listSelectOption, keyOption, indexSelect;
    if (action == 'product') {
      title = 'เลือกสินค้า';
      listSelectOption = this.optionsVisitSale;
      keyOption = 'product_group_name';
      indexSelect = this.indexProduct;
    }
    this.navCtrl.push('ListSelectOptionPage', { action: action, title: title, option: listSelectOption, key: keyOption, indexSelect: indexSelect, callback: this.selectOptionCallback }, { animate: true, animation: 'transition', direction: 'forward' });
  }

  selectOptionCallback = (_params) => {
    return new Promise(resolve => {
      if (_params.action == 'product') {
        this.indexProduct = _params.indexSelect;
        resolve();
      } else {
        resolve();
      }
    });
  }

  add() {
    for (let i = 0; i < this.optionsVisitSale[this.indexProduct].products.length; i++) {
      let retroact = {
        product_id: this.optionsVisitSale[this.indexProduct].products[i].product_id,
        product_name: this.optionsVisitSale[this.indexProduct].products[i].product_name,
        qty: '',
        buy: '',
        stock: ''
      }
      this.retroact.push(retroact);
    }
  }

  removeListProduct(index) {
    this.retroact.splice(index, 1);
  }

  save() {
    let path;
    if (this.action == 'boonrawd_new') {
      path = 'boonrawd'
    } else if (this.action == 'rival_new') {
      path = 'rival'
    }
    if (this.retroact.length > 0) {
      for (let i = 0; i < this.retroact.length; i++) {
        for (let j = 0; j < this.data.sale[path][this.index.indexPath].value.length; j++) {
          if (this.retroact[i].product_id == this.data.sale[path][this.index.indexPath].value[j].product_id) {
            this.util.showAlertDialog('ไม่สามารถเพิ่ม ' + this.retroact[i].product_name + ' ซ้ำได้');
            return;
          }
        }
        if (!this.retroact[i].qty) {
          this.retroact[i].qty = '0';
        }
        if (!this.retroact[i].buy) {
          this.retroact[i].buy = '0';
        }
        if (!this.retroact[i].stock) {
          this.retroact[i].stock = '0';
        }
      }
      let value = this.data.sale[path][this.index.indexPath].value.concat(this.retroact);
      this.data.sale[path][this.index.indexPath].value = value;
      this.callbackData.emit(this.data);
    } else {
      this.util.showAlertDialog('กรุณาเลือกสินค้าและเพิ่ม');
      return;
    }
  }
}
