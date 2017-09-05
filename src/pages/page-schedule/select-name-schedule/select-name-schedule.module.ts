import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectNameSchedulePage } from './select-name-schedule';


@NgModule({
    declarations: [
        SelectNameSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(SelectNameSchedulePage)
    ],
    exports: [
        SelectNameSchedulePage
    ]
})
export class SelectNameSchedulePageModule { }
