import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShopsPage } from "./edit-shops";
import { AgmCoreModule } from "angular2-google-maps/core";

@NgModule({
    declarations: [
        EditShopsPage
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDlljiKw4YdTDGYHfAaV-y55Iz__ibuq40',
            libraries: ['places']
        }),
        IonicPageModule.forChild(EditShopsPage)
    ],
    exports: [
        EditShopsPage
    ]
})
export class EditShopsPageModule { }
