import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupInput } from './popup-input';
import { ShopAddCallCard } from './../../components/shop-add-call-card/shop-add-call-card';
import { ShopAddChannel } from './../../components/shop-add-channel/shop-add-channel';
import { ShopAddContact } from './../../components/shop-add-contact/shop-add-contact';
import { ShopAddFreezer } from './../../components/shop-add-freezer/shop-add-freezer';
import { ShopAddPG } from './../../components/shop-add-pg/shop-add-pg';

@NgModule({
  declarations: [
    PopupInput,
    ShopAddCallCard,
    ShopAddChannel,
    ShopAddContact,
    ShopAddFreezer,
    ShopAddPG
  ],
  imports: [
    IonicPageModule.forChild(PopupInput),
  ],
  exports: [
    PopupInput
  ]
})
export class PopupInputModule {}
