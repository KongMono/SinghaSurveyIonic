import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabManageVisit } from './tab-manage-visit';

@NgModule({
  declarations: [
    TabManageVisit,
  ],
  imports: [
    IonicPageModule.forChild(TabManageVisit),
  ],
  exports: [
    TabManageVisit
  ]
})
export class TabManageVisitModule {}
