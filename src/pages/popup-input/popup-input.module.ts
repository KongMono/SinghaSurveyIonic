import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupInput } from './popup-input';
import { ShopAddCallCardModule } from './../../components/shop-add-call-card/shop-add-call-card.module';
import { ShopAddChannelModule } from './../../components/shop-add-channel/shop-add-channel.module';
import { ShopAddContactModule } from './../../components/shop-add-contact/shop-add-contact.module';
import { ShopAddFreezerModule } from './../../components/shop-add-freezer/shop-add-freezer.module';
import { ShopAddPGModule } from './../../components/shop-add-pg/shop-add-pg.module';
import { VisitAddEquipmentModule } from './../../components/visit-add-equipment/visit-add-equipment.module';
import { VisitAddNoteModule } from './../../components/visit-add-note/visit-add-note.module';
import { VisitAddRetroactModule } from './../../components/visit-add-retroact/visit-add-retroact.module';
import { VisitEditRetroactModule } from './../../components/visit-edit-retroact/visit-edit-retroact.module';
import { ActivityVisitAddSalesModule } from './../../components/activity-visit-add-sales/activity-visit-add-sales.module';

@NgModule({
  declarations: [
    PopupInput
  ],
  imports: [
    ShopAddCallCardModule,
    ShopAddChannelModule,
    ShopAddContactModule,
    ShopAddFreezerModule,
    ShopAddPGModule,
    VisitAddEquipmentModule,
    VisitAddNoteModule,
    VisitAddRetroactModule,
    VisitEditRetroactModule,
    ActivityVisitAddSalesModule,
    IonicPageModule.forChild(PopupInput)
  ],
  exports: [
    PopupInput
  ]
})
export class PopupInputModule {}
