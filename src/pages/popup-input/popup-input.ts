import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popup-input',
  templateUrl: 'popup-input.html',
})

export class PopupInput {
  action: any;
  data: any;
  option: any;
  index: any;
  callback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.action = navParams.get('action');
    this.data = navParams.get('data');
    this.option = navParams.get('option');
    this.index = navParams.get('index');
    // console.log(this.action);
    // console.log(this.data);
    // console.log(this.option);
    // console.log(this.index);
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {

  }

  backPage() {
    this.navCtrl.pop({animate: true, animation: 'transition', direction: 'back'});
  }

  title() {
    let title;
    switch (this.action) {
      case 'freezer':
        title = 'ข้อมูลตู้แช่';
        break;
      case 'pg':
        title = 'ข้อมูล PG';
        break;
      case 'contacts':
        title = 'ข้อมูลผู้ติดต่อ';
        break;
      case 'channels':
        title = 'ช่องทางการซื้อสินค้า';
        break;
      case 'callcard':
        title = 'ข้อมูล Proposal';
        break;
      case 'equipment':
        title = 'อุปกรณ์ส่งเสริมการขาย';
        break;
      case 'equipment_activity':
        title = 'สื่อและพรีเมี่ยมกิจกรรม';
        break;
      case 'note':
        title = 'หัวข้อติดตาม';
        break;
      case 'boonrawd':
        title = 'ยอดขายสินค้าบุญรอดย้อนหลัง 3 เดือนจากปัจจุบัน';
        break;
      case 'rival':
        title = 'ยอดขายสินค้าคู่แข่งย้อนหลัง 3 เดือนจากปัจจุบัน';
        break;
      case 'sales':
        title = 'ข้อมูลสินค้า';
        break;
      default:
      title = '';
        break;
    }
    return title;
  }

  reciveDataFromInput(data) {
    let dataCallback = {
      action: this.action,
      data: data
    }
    this.callback(dataCallback).then(() => {
      this.backPage();
    },error => {
      
    });
    // this.view.dismiss(data);
    // console.log(data);
  }
}
