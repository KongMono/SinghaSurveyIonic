import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityVisitPage } from "./activity-visit";


@NgModule({
    declarations: [
        ActivityVisitPage
    ],
    imports: [
        IonicPageModule.forChild(ActivityVisitPage)
    ],
    exports: [
        ActivityVisitPage
    ]
})
export class ActivityVisitPageModule { }
