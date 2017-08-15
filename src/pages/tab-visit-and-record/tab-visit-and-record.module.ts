import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabVisitAndRecord } from './tab-visit-and-record';

@NgModule({
  declarations: [
    TabVisitAndRecord,
  ],
  imports: [
    IonicPageModule.forChild(TabVisitAndRecord),
  ],
  exports: [
    TabVisitAndRecord
  ]
})
export class TabVisitAndRecordModule {}
