import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckNameShopPage } from './check-name-shop';


@NgModule({
    declarations: [
        CheckNameShopPage
    ],
    imports: [
        IonicPageModule.forChild(CheckNameShopPage)
    ],
    exports: [
        CheckNameShopPage
    ]
})
export class CheckNameShopPageModule { }
