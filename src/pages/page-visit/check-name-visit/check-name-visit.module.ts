import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckNameVisitPage } from './check-name-visit';


@NgModule({
    declarations: [
        CheckNameVisitPage
    ],
    imports: [
        IonicPageModule.forChild(CheckNameVisitPage)
    ],
    exports: [
        CheckNameVisitPage
    ]
})
export class CheckNameVisitPageModule { }
