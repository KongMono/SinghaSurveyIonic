import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchVisitPage } from "./search-visit";


@NgModule({
    declarations: [
        SearchVisitPage
    ],
    imports: [
        IonicPageModule.forChild(SearchVisitPage)
    ],
    exports: [
        SearchVisitPage
    ]
})
export class SearchVisitPageModule { }
