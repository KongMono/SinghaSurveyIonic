import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabShop } from './tab-shop';

@NgModule({
  declarations: [
    TabShop,
  ],
  imports: [
    IonicPageModule.forChild(TabShop),
  ],
  exports: [
    TabShop
  ]
})
export class TabShopModule {}
