import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewSchedulePage } from "./view-schedule";

@NgModule({
    declarations: [
        ViewSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(ViewSchedulePage)
    ],
    exports: [
        ViewSchedulePage
    ]
})
export class ViewSchedulePageModule { }
