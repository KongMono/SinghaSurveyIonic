import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSelectOptionPage } from './list-select-option';


@NgModule({
    declarations: [
        ListSelectOptionPage
    ],
    imports: [
        IonicPageModule.forChild(ListSelectOptionPage)
    ],
    exports: [
        ListSelectOptionPage
    ]
})
export class SearchShopsPageModule { }
