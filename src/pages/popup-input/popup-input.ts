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
    this.navCtrl.pop({animate:true,animation:'transition',direction:'back'});
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
