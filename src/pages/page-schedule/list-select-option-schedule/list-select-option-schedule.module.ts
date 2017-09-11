import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSelectOptionSchedulePage } from './list-select-option-schedule';

@NgModule({
    declarations: [
        ListSelectOptionSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(ListSelectOptionSchedulePage)
    ],
    exports: [
        ListSelectOptionSchedulePage
    ]
})
export class ListSelectOptionSchedulePageModule { }
