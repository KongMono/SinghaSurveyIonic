import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUtilService } from './../../app/app.util';

@Component({
  selector: 'visit-edit-retroact',
  templateUrl: 'visit-edit-retroact.html',
  providers: [AppUtilService]
})

export class VisitEditRetroact {
  @Input('action') action;
  @Input('data') data;
  @Input('index') index;
  @Output() callbackData = new EventEmitter();

  productName: any;
  qty: any;
  buy: any;
  stock: any;

  constructor(public navCtrl: NavController, public util: AppUtilService) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    if (this.index.indexValue || this.index.indexValue == 0) {
      this.productName = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].product_name;
      this.qty = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].qty;
      this.buy = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].buy;
      this.stock = this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].stock;
      console.log('productName: ' + this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].product_name);
      console.log('qty: ' + this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].qty);
      console.log('buy: ' + this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].buy);
      console.log('stock: ' + this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].stock);
    }
  }

  save() {
    if (!this.qty) {
      this.qty = 0;
    }
    if (!this.buy) {
      this.buy = 0;
    }
    if (!this.stock) {
      this.stock = 0;
    }
    if (this.index.indexValue != null || this.index.indexValue != undefined) {
      this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].qty = this.qty;
      this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].buy = this.buy;
      this.data.sale[this.action][this.index.indexPath].value[this.index.indexValue].stock = this.stock;
    }
    this.callbackData.emit(this.data);
  }
}
