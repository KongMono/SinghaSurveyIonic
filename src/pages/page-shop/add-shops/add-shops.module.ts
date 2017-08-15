import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShopsPage } from "./add-shops";
import { AgmCoreModule } from "angular2-google-maps/core";


@NgModule({
    declarations: [
        AddShopsPage
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDlljiKw4YdTDGYHfAaV-y55Iz__ibuq40',
            libraries: ['places']
        }),
        IonicPageModule.forChild(AddShopsPage)
    ],
    exports: [
        AddShopsPage
    ]
})
export class AddShopsPageModule { }
