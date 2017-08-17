import { Injectable, Inject } from '@angular/core';
import { CallApi } from "./call-api";
import { ConfigApp, IAppConfig } from "../app/app.config";


/**
 * ACM012-002 (POST)
 */
@Injectable()
export class SinghaSurveyService {
    Api: any;

    constructor(Api: CallApi, @Inject(ConfigApp) private config: IAppConfig) {
        this.Api = Api;
    }

    customersList(limit: any, offset: any, order: any) {
        let service = this.config.service.customersList;

        service.param = {
            user_id: this.config.userInfo.username,
            offset: offset,
            limit: limit,
            order: order
        };
        return this.Api.call(service.url, service.method, service.param);
    }

    login(userName: any, password: any) {

        let service = this.config.service.login;
        service.param = {
            username: userName,
            password: password,
            lat: "12.3123123",
            long: "213.313242",
            from: "IOS"
        };
        return this.Api.call(service.url, service.method, service.param);
    }

    profile() {
        let service = this.config.service.profile;

        service.param = {
            user_id: this.config.userInfo.username
        };

        return this.Api.call(service.url, service.method, service.param);
    }

    scheduleList(limit: any, offset: any) {
        let service = this.config.service.schedule;

        service.param = {
            user_id: this.config.userInfo.username,
            offset: offset,
            limit: limit
        };

        return this.Api.call(service.url, service.method, service.param);
    }

    visitList(limit: any, offset: any) {
        let service = this.config.service.visit;

        service.param = {
            user_id: this.config.userInfo.username,
            offset: offset,
            limit: limit
        };

        return this.Api.call(service.url, service.method, service.param);
    }

    optionsSearch() {
        let service = this.config.service.optionSearch;

        service.param = {
            user_id: this.config.userInfo.username
        };

        return this.Api.call(service.url, service.method, service.param);
    }

    searchCustomer(key: string, province_id: string, ampher_id: string, tumbol_id: string) {
        let service = this.config.service.searchCustomer;

        service.param = {
            user_id: this.config.userInfo.username,
            key: key,
            province_id: province_id,
            ampher_id: ampher_id,
            tumbol_id: tumbol_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    customerDetail(customer_id: string) {
        let service = this.config.service.customerDetail;

        service.param = {
            user_id: this.config.userInfo.username,
            customer_id: customer_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    optionCustomer() {
        let service = this.config.service.optionCustomer;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    optionChannelCustomer(customer_id: string) {
        let service = this.config.service.optionChannelCustomer;

        service.param = {
            user_id: this.config.userInfo.username,
            customer_id: customer_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    optionUser() {
        let service = this.config.service.optionUser;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    updateUser(level_id: string, mobile: string, date: string, area: string) {
        let service = this.config.service.updateUser;

        service.param = {
            user_id: this.config.userInfo.username,
            level_id: level_id,
            mobile: mobile,
            date: date,
            area: area
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    forgot(username: string) {
        let service = this.config.service.forgot;

        service.param = {
            username: username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    customersCycle() {
        let service = this.config.service.customersCycle;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    visitCycle() {
        let service = this.config.service.visitCycle;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    customersCheck() {
        let service = this.config.service.customersCheck;

        service.param = {
            user_id: this.config.userInfo.username,
            limit: 10000,
            offset: 0
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    customersChecked(customer_id) {
        let service = this.config.service.customersChecked;

        service.param = {
            user_id: this.config.userInfo.username,
            customer_id: customer_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    visitCustomersListCheck() {
        let service = this.config.service.visitCustomersListCheck;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    uploadImageCustomer(imageBase64) {
        let service = this.config.service.uploadImageCustomer;

        service.param = {
            image: imageBase64
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    uploadImageCustomerCallcard(imageBase64) {
        let service = this.config.service.uploadImageCustomer;

        service.param = {
            type: "callcard",
            image: imageBase64
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    createCustomer(
        user_id,
        name,
        latitude,
        longitude,
        address,
        province_id,
        ampher_id,
        tumbol_id,
        postcode,
        tax_number,
        customer_group_id,
        customer_type_id,
        seats,
        project_type_id,
        founder_date,
        status,
        remark,
        contacts,
        channels,
        freezer,
        pg,
        images,
        callcard) {

        let service = this.config.service.createCustomer;

        service.param = {
            user_id: user_id,
            name: name,
            latitude: latitude,
            longitude: longitude,
            address: address,
            province_id: province_id,
            ampher_id: ampher_id,
            tumbol_id: tumbol_id,
            postcode: postcode,
            tax_number: tax_number,
            customer_group_id: customer_group_id,
            customer_type_id: customer_type_id,
            seats: seats,
            project_type_id: project_type_id,
            founder_date: founder_date,
            status: status,
            remark: remark,
            contacts: contacts,
            channels: channels,
            freezer: freezer,
            pg: pg,
            images: images,
            callcard: callcard
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    updateCustomer(
        customer_id,
        user_id,
        name,
        latitude,
        longitude,
        address,
        province_id,
        ampher_id,
        tumbol_id,
        postcode,
        tax_number,
        customer_group_id,
        customer_type_id,
        seats,
        project_type_id,
        founder_date,
        status,
        remark,
        contacts,
        channels,
        freezer,
        pg,
        images,
        callcard) {

        let service = this.config.service.updateCustomer;

        service.param = {
            customer_id: customer_id,
            user_id: user_id,
            name: name,
            latitude: latitude,
            longitude: longitude,
            address: address,
            province_id: province_id,
            ampher_id: ampher_id,
            tumbol_id: tumbol_id,
            postcode: postcode,
            tax_number: tax_number,
            customer_group_id: customer_group_id,
            customer_type_id: customer_type_id,
            seats: seats,
            project_type_id: project_type_id,
            founder_date: founder_date,
            status: status,
            remark: remark,
            contacts: contacts,
            channels: channels,
            freezer: freezer,
            pg: pg,
            images: images,
            callcard: callcard
        }

        return this.Api.callform(service.url, service.method, service.param);
    }
}
