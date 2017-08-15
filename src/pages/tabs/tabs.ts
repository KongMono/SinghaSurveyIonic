import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class Tabs {
  tabs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabs = [
      {
        'icon': '_icon-dashboard',
        'root': 'TabShop'
      },
      {
        'icon': '_icon-visit',
        'root': 'TabVisitAndRecord'
      },
      {
        'icon': '_icon-overtime',
        'root': 'TabManageVisit'
      },
      {
        'icon': '_icon-settings',
        'root': 'TabSetting'
      }
    ]
  }
}
