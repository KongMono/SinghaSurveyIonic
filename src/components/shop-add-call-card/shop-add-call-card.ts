import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shop-add-call-card',
  templateUrl: 'shop-add-call-card.html'
})

export class ShopAddCallCard {
  @Input('customerDetailDataInput') data;
  @Input('index') index;
  @Output() customerDetailDataOutput = new EventEmitter();
  inputShopAddCallCardData = {
    start_date: '',
    end_date: '',
    value: '',
    spst_no: '',
    prq_no: '',
    images: ''
  }
  endPoint = 'http://128.199.72.29/';

  constructor() {

  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.index);

    if (this.index || this.index == 0) {
      this.inputShopAddCallCardData.start_date = this.data.callcard[this.index].start_date;
      this.inputShopAddCallCardData.end_date = this.data.callcard[this.index].end_date;
      this.inputShopAddCallCardData.value = this.data.callcard[this.index].value;
      this.inputShopAddCallCardData.spst_no = this.data.callcard[this.index].spst_no;
      this.inputShopAddCallCardData.prq_no = this.data.callcard[this.index].prq_no;
      this.inputShopAddCallCardData.images = this.data.callcard[this.index].images;
    }
  }

  addImage() {

  }

  save() {
    // if (this.inputShopAddCallCardData.start_date && this.inputShopAddCallCardData.end_date && this.inputShopAddCallCardData.value && this.inputShopAddCallCardData.spst_no && this.inputShopAddCallCardData.prq_no && this.inputShopAddCallCardData.images) {
    if (this.inputShopAddCallCardData.start_date || this.inputShopAddCallCardData.end_date && this.inputShopAddCallCardData.value && this.inputShopAddCallCardData.spst_no && this.inputShopAddCallCardData.prq_no || this.inputShopAddCallCardData.images) {
      if (this.index != null || this.index != undefined) {
        this.data.callcard[this.index].start_date = this.inputShopAddCallCardData.start_date;
        this.data.callcard[this.index].end_date = this.inputShopAddCallCardData.end_date;
        this.data.callcard[this.index].value = this.inputShopAddCallCardData.value;
        this.data.callcard[this.index].spst_no = this.inputShopAddCallCardData.spst_no;
        this.data.callcard[this.index].prq_no = this.inputShopAddCallCardData.prq_no;
        this.data.callcard[this.index].images = this.inputShopAddCallCardData.images;
      } else {
        let callcard = {
          start_date: this.inputShopAddCallCardData.start_date,
          end_date: this.inputShopAddCallCardData.end_date,
          value: this.inputShopAddCallCardData.value,
          spst_no: this.inputShopAddCallCardData.spst_no,
          prq_no: this.inputShopAddCallCardData.prq_no,
          images: this.inputShopAddCallCardData.images
        }
        this.data.callcard.push(callcard);
      }
    }
    this.customerDetailDataOutput.emit(this.data);
  }
}
