import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forget-password-input',
  templateUrl: 'forget-password-input.html',
})

export class ForgetPasswordInput {
  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {

  }

  ionViewDidLoad() {

  }

  reciveDataFromInput(username) {
    console.log(username);
    this.view.dismiss(username);
  }
}
