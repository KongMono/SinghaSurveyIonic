import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgmCoreModule } from "angular2-google-maps/core";
import { EditVisitPage } from "./edit-visit";

@NgModule({
    declarations: [
        EditVisitPage
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDlljiKw4YdTDGYHfAaV-y55Iz__ibuq40',
            libraries: ['places']
        }),
        IonicPageModule.forChild(EditVisitPage)
    ],
    exports: [
        EditVisitPage
    ]
})
export class EditVisitPageModule { }
