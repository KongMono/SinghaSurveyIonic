import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

export class SSVErrorHandler extends IonicErrorHandler implements ErrorHandler {
    constructor() {
        super();
    }

    handleError(err: any): void {
        console.log('Error: ' + err);
        // window.fabric.Crashlytics.addLog(err);
        // window.fabric.Crashlytics.sendNonFatalCrash(err);
        super.handleError(err);
    }

}