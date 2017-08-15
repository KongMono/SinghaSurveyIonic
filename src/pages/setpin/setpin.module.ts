import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetpinPage } from "./setpin";


@NgModule({
    declarations: [
        SetpinPage
    ],
    imports: [
        IonicPageModule.forChild(SetpinPage)
    ],
    exports: [
        SetpinPage
    ]
})
export class SetpinPageModule { }
