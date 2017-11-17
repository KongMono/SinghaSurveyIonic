import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tabs } from './tabs';
import { PopupInputModule } from './../popup-input/popup-input.module';

@NgModule({
  declarations: [
    Tabs,
  ],
  imports: [
    PopupInputModule,
    IonicPageModule.forChild(Tabs),
  ],
  exports: [
    Tabs
  ]
})
export class TabsModule {}
