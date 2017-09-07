import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shop-add-pg',
  templateUrl: 'shop-add-pg.html'
})

export class ShopAddPG {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  inputShopAddPGData = {
    name: '',
    tel: '',
    telLength: ''
  }

  constructor() {
    this.inputShopAddPGData.telLength = this.inputShopAddPGData.tel.length.toString();
  }

  changeTelLength(e) {
    this.inputShopAddPGData.telLength = this.inputShopAddPGData.tel.length.toString();
  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    if (this.index || this.index == 0) {
      this.inputShopAddPGData.name = this.data.pg[this.index].name;
      this.inputShopAddPGData.tel = this.data.pg[this.index].tel;
    }
  }

  save() {
    if (this.inputShopAddPGData.name && this.inputShopAddPGData.tel) {
      if (this.index != null || this.index != undefined) {
        this.data.pg[this.index].name = this.inputShopAddPGData.name;
        this.data.pg[this.index].tel = this.inputShopAddPGData.tel;
      }else {
        let pg = {
          name: this.inputShopAddPGData.name,
          tel: this.inputShopAddPGData.tel
          // pg_id: ''
        }
        this.data.pg.push(pg);
      }
    }
    this.customerDetailDataOutput.emit(this.data);
  }
}
