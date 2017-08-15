import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchShopsPage } from "./search-shops";


@NgModule({
    declarations: [
        SearchShopsPage
    ],
    imports: [
        IonicPageModule.forChild(SearchShopsPage)
    ],
    exports: [
        SearchShopsPage
    ]
})
export class SearchShopsPageModule { }
