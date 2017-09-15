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

        if (this.config.isBuildDevice && this.config.isProduction) {
            url = this.config.endpoint_production + url;
        } else if (this.config.isBuildDevice && !this.config.isProduction) {
            url = this.config.endpoint + url;
        }

        console.log("url", url);
        console.log("params", param);

        if (method == "GET") {
            return this._get(url, param);
        } else {
            return this._post(url, param);
        }
    }

    private callform(url: string, method: string, param: any) {

        if (this.config.isBuildDevice && this.config.isProduction) {
            url = this.config.endpoint_production + url;
        } else if (this.config.isBuildDevice && !this.config.isProduction) {
            url = this.config.endpoint + url;
        }

        console.log("url", url);
        console.log("params", param);

        return this._post_form(url, param);

    }

    private callTrack(url: string, param: any) {

        console.log("track url", url);
        console.log("track params", param);

        return this._post_track(url, param);
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
                    console.log("data resolve", data);
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }


    private _post(url: string, param: any) {

        return new Promise((resolve, reject) => {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            let body = JSON.stringify(param);

            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log("data resolve", data);
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }

    private _post_form(url: string, param: any) {

        return new Promise((resolve, reject) => {

            let formData = new FormData();

            for (let dataKey in param) {
                formData.append(dataKey, param[dataKey]);
            }

            this.http.post(url, formData)
                .map(res => res.json())
                .subscribe(data => {
                    console.log("data resolve", data);
                    resolve(data);
                }, error => {
                    reject(error);
                });

        });
    }

    private _post_track(url: string, param: any) {

        return new Promise((resolve, reject) => {

            let header = new Headers({
                'Content-Type': "application/json",
                'ssv_api': "gvlgvl;u@lv'ryolb[g0Hf"
            });

            let options = new RequestOptions({ headers: header });

            let body = JSON.stringify(param);

            this.http.post(url, body, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log("data resolve", data);
                    resolve(data);
                }, error => {
                    reject(error);
                });

        });
    }
}