import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSchedulePage } from "./edit-schedule";

@NgModule({
    declarations: [
        EditSchedulePage
    ],
    imports: [
        IonicPageModule.forChild(EditSchedulePage)
    ],
    exports: [
        EditSchedulePage
    ]
})
export class EditSchedulePageModule { }
