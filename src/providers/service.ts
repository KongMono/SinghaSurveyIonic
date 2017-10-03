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

    login(userName: any, password: any, lat: any, long: any) {

        let service = this.config.service.login;
        service.param = {
            username: userName,
            password: password,
            lat: lat,
            long: long,
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

    searchVisitCustomer(search: string, start_date: string, end_date: string) {
        let service = this.config.service.searchVisitCustomer;

        service.param = {
            user_id: this.config.userInfo.username,
            search: search,
            start_date: start_date,
            end_date: end_date
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

    visitCustomersListCheck(lat, long) {
        let service = this.config.service.visitCustomersListCheck;

        service.param = {
            user_id: this.config.userInfo.username,
            lat: lat,
            long: long
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    visitCustomersChecked(customer_id) {
        let service = this.config.service.visitCustomersChecked;

        service.param = {
            user_id: this.config.userInfo.username,
            customer_id: customer_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    visitCustomerDetail(visit_id) {
        let service = this.config.service.visitCustomerDetail;

        service.param = {
            user_id: this.config.userInfo.username,
            visit_id: visit_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    deleteCustomer(customer_id) {
        let service = this.config.service.deleteCustomer;

        service.param = {
            user_id: this.config.userInfo.username,
            customer_id: customer_id
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    optionCustomerFilter() {
        let service = this.config.service.optionCustomerFilter;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }


    optionVisitSale() {
        let service = this.config.service.optionVisitSale;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }


    optionEquipment() {
        let service = this.config.service.optionEquipment;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    optionSale() {
        let service = this.config.service.optionSale;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    optionActivity() {
        let service = this.config.service.optionActivity;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    visitActivityDetail(activity_id) {
        let service = this.config.service.visitActivityDetail;

        service.param = {
            user_id: this.config.userInfo.username,
            activity_id: activity_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    uploadImageCustomer(imageBase64) {
        let service = this.config.service.uploadImageCustomer;

        service.param = {
            image: imageBase64
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    uploadImageCustomerCallcard(imageBase64) {
        let service = this.config.service.uploadImageCustomer;

        service.param = {
            type: "callcard",
            image: imageBase64
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    // Activity
    uploadImageVisitCustomerTool(imageBase64) {
        let service = this.config.service.uploadImageVisitCustomer;

        service.param = {
            image: imageBase64
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    // visit
    uploadImageVisitCustomerVisit(imageBase64) {
        let service = this.config.service.uploadImageVisitCustomer;

        service.param = {
            type: "visit",
            image: imageBase64
        }
        return this.Api.callform(service.url, service.method, service.param);
    }

    // visit
    uploadImageVisitCustomerSale(imageBase64) {
        let service = this.config.service.uploadImageVisitCustomer;

        service.param = {
            type: "sale",
            image: imageBase64
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    // visit
    uploadImageVisitCustomerNote(imageBase64) {
        let service = this.config.service.uploadImageVisitCustomer;

        service.param = {
            type: "note",
            image: imageBase64
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    // Activity
    uploadImageVisitCustomerActivity(imageBase64) {
        let service = this.config.service.uploadImageVisitCustomer;

        service.param = {
            type: "activity",
            image: imageBase64
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    checkVersion() {
        let service = this.config.service.checkVersion;
        return this.Api.call(service.url, service.method, service.param);
    }

    updateVisitActivity(
        user_id,
        visit_activity_id,
        venue_type,
        venue_name,
        vendor_id,
        tradition_type_id,
        activity_master_id,
        activity_id,
        activity_name,
        start_date,
        end_date,
        pg,
        sales,
        equipment,
        sale_images,
        images) {

        let service = this.config.service.updateVisitActivity;

        service.param = {
            user_id: user_id,
            visit_activity_id: visit_activity_id,
            venue_type: venue_type,
            venue_name: venue_name,
            vendor_id: vendor_id,
            tradition_type_id: tradition_type_id,
            activity_master_id: activity_master_id,
            activity_id: activity_id,
            activity_name: activity_name,
            start_date: start_date,
            end_date: end_date,
            pg: pg,
            sales: sales,
            equipment: equipment,
            sale_images: sale_images,
            images: images
        }
        return this.Api.callform(service.url, service.method, service.param);
    }

    updateVisitCustomer(
        user_id,
        visit_id,
        latitude,
        longitude,
        customer_id,
        remark,
        activities,
        sale,
        receipt,
        equipment,
        images,
        note) {

        let service = this.config.service.updateVisitCustomer;

        service.param = {
            user_id: user_id,
            visit_id: visit_id,
            latitude: latitude,
            longitude: longitude,
            customer_id: customer_id,
            remark: remark,
            activities: activities,
            sale: sale,
            receipt: receipt,
            equipment: equipment,
            images: images,
            note: note
        }
        return this.Api.callform(service.url, service.method, service.param);
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

        return this.Api.callform(service.url, service.method, service.param);
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

    deleteSchedule(schedule_id) {
        let service = this.config.service.deleteSchedule;

        service.param = {
            user_id: this.config.userInfo.username,
            schedule_id: schedule_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    updatedSchedule(schedule_id, cycle_id, plan) {
        let service = this.config.service.updatedSchedule;

        service.param = {
            user_id: this.config.userInfo.username,
            schedule_id: schedule_id,
            cycle_id: cycle_id,
            plan: plan
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    getScheduleCycleList() {
        let service = this.config.service.getScheduleCycleList;

        service.param = {
            user_id: this.config.userInfo.username
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    createdSchedule(cycle_id) {
        let service = this.config.service.createdSchedule;

        service.param = {
            user_id: this.config.userInfo.username,
            cycle_id: cycle_id
        }

        return this.Api.callform(service.url, service.method, service.param);
    }

    getScheduleView(schedule_id) {
        let service = this.config.service.getScheduleView;

        service.param = {
            user_id: this.config.userInfo.username,
            schedule_id: schedule_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    getScheduleDetailList(schedule_id) {
        let service = this.config.service.getScheduleDetailList;

        service.param = {
            user_id: this.config.userInfo.username,
            schedule_id: schedule_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    getOptionSchedule(schedule_id) {
        let service = this.config.service.getOptionSchedule;

        service.param = {
            user_id: this.config.userInfo.username,
            schedule_id: schedule_id
        }

        return this.Api.call(service.url, service.method, service.param);
    }

    setTracking(CUSTOMER_ID, ARM_CODE, ACTION_ID, lat, long) {

        let param = {
            SELL_ID: this.config.userInfo.username,
            CUSTOMER_ID: CUSTOMER_ID,
            AGENT_CODE: "\"\"",
            LATITUDE: lat,
            LONGITUDE: long,
            APP_SOURCE: "SSV",
            MOBILE_DEVICE: "iOS",
            ARM_CODE: ARM_CODE,
            ACTION_ID: ACTION_ID,
        }

        return this.Api.callTrack(this.config.endpoint_tracking, param);
    }

    setTrackingBackground(username, lat, long) {

        let param = {
            SELL_ID: username,
            CUSTOMER_ID: "\"\"",
            AGENT_CODE: "\"\"",
            LATITUDE: lat,
            LONGITUDE: long,
            APP_SOURCE: "SSV",
            MOBILE_DEVICE: "iOS",
            ARM_CODE: "\"\"",
            ACTION_ID: "0",
        }

        return this.Api.callTrack(this.config.endpoint_tracking, param);
    }

}
