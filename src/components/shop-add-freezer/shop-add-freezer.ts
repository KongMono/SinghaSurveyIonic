import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppUtilService } from './../../app/app.util';

@Component({
  selector: 'shop-add-freezer',
  templateUrl: 'shop-add-freezer.html',
  providers: [AppUtilService]
})

export class ShopAddFreezer {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  door: any;
  qty: any;

  constructor(public util: AppUtilService) {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    if (this.index || this.index == 0) {
      this.door = this.data.freezer[this.index].door;
      this.qty = this.data.freezer[this.index].qty;
    }
  }

  save() {
    if (!this.door) {
      this.door = 0;
    }
    if (!this.qty) {
      this.qty = 0;
    }
    if (this.index != null || this.index != undefined) {
      this.data.freezer[this.index].door = this.door;
      this.data.freezer[this.index].qty = this.qty;
    } else {
      let freezer = {
        door: this.door,
        qty: this.qty
      }
      this.data.freezer.push(freezer);
    }
    this.customerDetailDataOutput.emit(this.data);
  }
}
