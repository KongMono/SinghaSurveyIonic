import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverviewShopPage } from './overview-shop';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
    declarations: [
        OverviewShopPage
    ],
    imports: [
        IonicPageModule.forChild(OverviewShopPage),
        RoundProgressModule
    ],
    exports: [
        OverviewShopPage
    ]
})
export class OverviewShopPageModule { }
