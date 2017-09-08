import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewSchedulePage } from "./view-schedule";
import { NgCalendarModule  } from 'ionic2-calendar';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
    declarations: [
        ViewSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(ViewSchedulePage),
        NgCalendarModule,
        RoundProgressModule
    ],
    exports: [
        ViewSchedulePage
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'th-TH' }
    ]
})
export class ViewSchedulePageModule { }
