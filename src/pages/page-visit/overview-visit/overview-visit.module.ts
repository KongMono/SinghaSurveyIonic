import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverviewVisitPage } from './overview-visit';

@NgModule({
    declarations: [
        OverviewVisitPage
    ],
    imports: [
        IonicPageModule.forChild(OverviewVisitPage)
    ],
    exports: [
        OverviewVisitPage
    ]
})
export class OverviewVisitPageModule { }
