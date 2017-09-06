import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupInput } from './popup-input';
import { ShopAddCallCard } from './../../components/shop-add-call-card/shop-add-call-card';
import { ShopAddChannel } from './../../components/shop-add-channel/shop-add-channel';
import { ShopAddContact } from './../../components/shop-add-contact/shop-add-contact';
import { ShopAddFreezer } from './../../components/shop-add-freezer/shop-add-freezer';
import { ShopAddPG } from './../../components/shop-add-pg/shop-add-pg';
import { VisitAddEquipment } from './../../components/visit-add-equipment/visit-add-equipment';
import { VisitAddNote } from './../../components/visit-add-note/visit-add-note';
import { VisitAddRetroact } from './../../components/visit-add-retroact/visit-add-retroact';
import { ActivityVisitAddSales } from './../../components/activity-visit-add-sales/activity-visit-add-sales';

@NgModule({
  declarations: [
    PopupInput,
    ShopAddCallCard,
    ShopAddChannel,
    ShopAddContact,
    ShopAddFreezer,
    ShopAddPG,
    VisitAddEquipment,
    VisitAddNote,
    VisitAddRetroact,
    ActivityVisitAddSales
  ],
  imports: [
    IonicPageModule.forChild(PopupInput),
  ],
  exports: [
    PopupInput
  ]
})
export class PopupInputModule {}
