import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewSchedulePage } from "./view-schedule";
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
    declarations: [
        ViewSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(ViewSchedulePage),
        NgCalendarModule
    ],
    exports: [
        ViewSchedulePage
    ]
})
export class ViewSchedulePageModule { }
