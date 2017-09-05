import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

export class SSVErrorHandler extends IonicErrorHandler {

    handleError(err: any): void {

        super.handleError(err);
        fabric.Crashlytics.sendNonFatalCrash(err);
    }

}