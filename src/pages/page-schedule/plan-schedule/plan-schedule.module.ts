import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanSchedulePage } from './plan-schedule';

@NgModule({
    declarations: [
        PlanSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(PlanSchedulePage)
    ],
    exports: [
        PlanSchedulePage
    ]
})
export class PlanSchedulePageModule { }
