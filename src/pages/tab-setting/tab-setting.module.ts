import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabSetting } from './tab-setting';

@NgModule({
  declarations: [
    TabSetting,
  ],
  imports: [
    IonicPageModule.forChild(TabSetting),
  ],
  exports: [
    TabSetting
  ]
})
export class TabSettingModule {}
