import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ShopAddContact } from './shop-add-contact';

@NgModule({
  declarations: [
    ShopAddContact,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ShopAddContact
  ]
})
export class ShopAddContactModule {}
