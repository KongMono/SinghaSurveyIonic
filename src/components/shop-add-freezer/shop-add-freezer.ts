import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shop-add-freezer',
  templateUrl: 'shop-add-freezer.html'
})

export class ShopAddFreezer {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  door: any;
  qty: any;

  constructor() {

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
    if (this.door && this.qty) {
      if (this.index != null || this.index != undefined) {
        this.data.freezer[this.index].door = this.door;
        this.data.freezer[this.index].qty = this.qty;
      }else {
        let freezer = {
          door: this.door,
          qty: this.qty
        }
        this.data.freezer.push(freezer);
      }
      this.customerDetailDataOutput.emit(this.data);
    }
  }
}
