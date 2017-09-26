import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AppUtilService } from './../../app/app.util';
import { IAppConfig, ConfigApp } from './../../app/app.config';

@Component({
  selector: 'shop-add-contact',
  templateUrl: 'shop-add-contact.html',
  providers: [AppUtilService]
})

export class ShopAddContact {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  inputShopAddContactData = {
    name: '',
    tel: '',
    telLength: '',
    position: '',
    birthdate: ''
  }

  constructor(public util: AppUtilService, @Inject(ConfigApp) public config: IAppConfig) {
    this.inputShopAddContactData.telLength = this.inputShopAddContactData.tel.length.toString();
  }

  changeTelLength(e) {
    this.inputShopAddContactData.telLength = this.inputShopAddContactData.tel.length.toString();
  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    if (this.index || this.index == 0) {
      this.inputShopAddContactData.name = this.data.contacts[this.index].name;
      this.inputShopAddContactData.tel = this.data.contacts[this.index].tel;
      this.inputShopAddContactData.position = this.data.contacts[this.index].position;
      this.inputShopAddContactData.birthdate = this.data.contacts[this.index].birthdate;
    }
  }

  save() {
    if (this.inputShopAddContactData.name && this.inputShopAddContactData.tel && this.inputShopAddContactData.position && this.inputShopAddContactData.birthdate) {
      if (this.inputShopAddContactData.birthdate != new Date().toISOString().slice(0,10)) {
        if (this.index != null || this.index != undefined) {
          this.data.contacts[this.index].name = this.inputShopAddContactData.name;
          this.data.contacts[this.index].tel = this.inputShopAddContactData.tel;
          this.data.contacts[this.index].position = this.inputShopAddContactData.position;
          this.data.contacts[this.index].birthdate = this.inputShopAddContactData.birthdate;
        }else {
          let contacts = {
            name: this.inputShopAddContactData.name,
            tel: this.inputShopAddContactData.tel,
            position: this.inputShopAddContactData.position,
            birthdate: this.inputShopAddContactData.birthdate
          }
          this.data.contacts.push(contacts);
        }
        this.customerDetailDataOutput.emit(this.data);
      } else {
        this.util.showAlertDialog('ไม่สามารถเลือกวันเกิดเป็นวันปัจจุบันได้');
        return;
      }
    } else {
      this.util.showAlertDialog('กรุณากรอกข้อมูลให้ถูกต้อง');
      return;
    }
  }
}
