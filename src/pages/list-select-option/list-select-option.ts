import { Component, Inject } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { CallApi } from "../../providers/call-api";
import { SinghaSurveyService } from "../../providers/service";
import { AppUtilService } from "../../app/app.util";
import { ConfigApp, IAppConfig } from "../../app/app.config";


@IonicPage()
@Component({
    selector: 'page-list-select-option',
    templateUrl: 'list-select-option.html',
    providers: [
        CallApi,
        SinghaSurveyService,
        AppUtilService]
})

export class ListSelectOptionPage {
    action: any;
    option: any;
    key: any;
    indexSelect: any;
    callback: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: SinghaSurveyService,
        public util: AppUtilService,
        @Inject(ConfigApp) private config: IAppConfig) {
        this.action = navParams.get('action');
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
