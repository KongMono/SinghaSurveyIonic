import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMapPage } from "./view-map";
import { AgmCoreModule } from "angular2-google-maps/core";


@NgModule({
    declarations: [
        ViewMapPage
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDlljiKw4YdTDGYHfAaV-y55Iz__ibuq40',
            libraries: ['places']
        }),
        IonicPageModule.forChild(ViewMapPage)
    ],
    exports: [
        ViewMapPage
    ]
})
export class ViewMapPageModule { }
