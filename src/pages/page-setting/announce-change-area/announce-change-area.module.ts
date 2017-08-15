import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnounceChangeAreaPage } from './announce-change-area';

@NgModule({
    declarations: [
        AnnounceChangeAreaPage
    ],
    imports: [
        IonicPageModule.forChild(AnnounceChangeAreaPage)
    ],
    exports: [
        AnnounceChangeAreaPage
    ]
})
export class AnnounceChangeAreaPageModule { }
