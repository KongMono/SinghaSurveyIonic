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
    product_id: '',
    product_name: '',
  }];
  indexProduct = 0;
  qty: any;
  buy: any;
  stock: any;

  constructor(public navCtrl: NavController, public util: AppUtilService) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.option);
    console.log(this.index);

    this.optionsVisitSale = this.option;
    // if (this.index.indexValue || this.index.indexValue == 0) {
    //   this.setIndexProduct();
    //   this.qty = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].qty;
    //   this.buy = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].buy;
    //   this.stock = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].stock;
    // }
  }

  // setIndexProduct() {
  //   for (var i = 0; i < this.optionsVisitSale.length; i++) {
  //     if (this.optionsVisitSale[i].product_id == this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].product_id) {
  //       return this.indexProduct = i;
  //     }
  //   }
  // }

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
  
  save() {
    if (this.indexProduct) {
      // let retroact = {
      //   product_id: this.optionsVisitSale[this.indexProduct].product_id,
      //   qty: this.qty,
      //   buy: this.buy,
      //   stock: this.stock
      // }
      // this.data.sale[this.action][this.index.indexPath].value.push(retroact);

      this.callbackData.emit(this.data);
    } else {
      this.util.showAlertDialog('กรุณาเลือกสินค้า');
      return;
    }
  }

  // save() {
  //   // if (this.indexProduct && this.qty && this.buy && this.stock) {
  //   if (this.indexProduct) {
  //     if (!this.qty) {
  //       this.qty = 0;
  //     }
  //     if (!this.buy) {
  //       this.buy = 0;
  //     }
  //     if (!this.stock) {
  //       this.stock = 0;
  //     }
  //     if (this.index.indexValue != null || this.index.indexValue != undefined) {
  //       this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].product_id = this.optionsVisitSale[this.indexProduct].product_id;
  //       this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].qty = this.qty;
  //       this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].buy = this.buy;
  //       this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].stock = this.stock;
  //     } else {
  //       let retroact = {
  //         product_id: this.optionsVisitSale[this.indexProduct].product_id,
  //         qty: this.qty,
  //         buy: this.buy,
  //         stock: this.stock
  //       }
  //       this.data.sale[this.action][this.index.indexPath].value.push(retroact);
  //     }
  //     this.callbackData.emit(this.data);
  //   } else {
  //     this.util.showAlertDialog('กรุณาเลือกข้อมูล');
  //     return;
  //   }
  // }
}
