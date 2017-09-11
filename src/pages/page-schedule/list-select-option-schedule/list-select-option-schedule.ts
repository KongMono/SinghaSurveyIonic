import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { CallApi } from "../../../providers/call-api";
import { SinghaSurveyService } from "../../../providers/service";
import { AppUtilService } from "../../../app/app.util";

@IonicPage()
@Component({
    selector: 'page-list-select-option-schedule',
    templateUrl: 'list-select-option-schedule.html',
    providers: [
        CallApi,
        SinghaSurveyService,
        AppUtilService]
})

export class ListSelectOptionSchedulePage {
    action: any;
    title: any;
    option: any;
    key: any;
    indexSelect: any;
    callback: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: SinghaSurveyService,
        public util: AppUtilService) {
        this.action = navParams.get('action');
        this.title = navParams.get('title');
        this.option = navParams.get('option');
        this.key = navParams.get('key');
        this.indexSelect = navParams.get('indexSelect');
        this.callback = this.navParams.get("callback")
    }

    ionViewDidLoad() {

    }

    itemSelected(index) {
        let dataCallback = {
            action: this.action,
            indexSelect: index
        }
        this.callback(dataCallback).then(() => {
            this.backPage();
        }, error => {

        });
    }

    backPage() {
        this.navCtrl.pop({ animate: true, animation: 'transition', direction: 'back' });
    }
}
