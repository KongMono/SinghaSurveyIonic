import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ConfigApp, IAppConfig } from "../app/app.config";

@Injectable()
export class CallApi {

    constructor(private http: Http,
        @Inject(ConfigApp) private config: IAppConfig) {
    }

    private call(url: string, method: string, param: any) {
        console.log("url", url);
        console.log("params", param);

        if (this.config.isBuildDevice && this.config.isProduction) {
            url = this.config.endpoint_production + url;
        } else if (this.config.isBuildDevice && !this.config.isProduction) {
            url = this.config.endpoint + url;
        }

        if (method == "GET") {
            return this._get(url, param);
        } else {
            return this._post(url, param);
        }
    }

    private _get(url: string, param: any) {

        return new Promise((resolve, reject) => {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({
                headers: headers,
                params: param
            });

            return this.http.get(url, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }

    private _post(url: string, param: any) {

        // if(url == "/v2/customers/image64/format/json"){
        //     url = "https://ssv.boonrawd.co.th/v2/customers/image64/format/json";
        // }

        return new Promise((resolve, reject) => {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(param);

            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });

    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}