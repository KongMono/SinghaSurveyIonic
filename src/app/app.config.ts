import { OpaqueToken } from '@angular/core';

export let ConfigApp = new OpaqueToken('app.config');

export interface IAppConfig {
  isLogged: any;
  pin_logged: any;
  userInfo: any;

  versionApp: any;
  versionBuild: any;

  isBuildDevice: boolean;
  isProduction: boolean;
  endpoint: string;
  endpoint_view_image: string;
  endpoint_production: string;
  endpoint_view_image_production: string;
  endpoint_tracking: string;
  service: any;

  latitude: any;
  longitude: any;
  maxDate: any;
}

export const AppConfig: IAppConfig = {
  isLogged: null,
  pin_logged: null,
  userInfo: null,
  isBuildDevice: false,
  isProduction: false,
  versionApp: null,
  versionBuild: null,
  latitude: null,
  longitude: null,
  maxDate: null,

  endpoint: 'http://ssv.devcode.in',
  endpoint_view_image: 'http://ssv.devcode.in/',
  endpoint_production: 'https://ssv.boonrawd.co.th',
  endpoint_view_image_production: 'https://ssv.boonrawd.co.th/',
  endpoint_tracking: 'https://ws.boonrawd.co.th/SSV/api/CustGeo/',
  service: {
    customersList: {
      url: "/v3/customers/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        limit: "",
        offset: "",
        order: ""
      }
    },
    login: {
      url: "/v3/auth/login/format/json",
      method: "POST",
      param: {
        username: "",
        password: "",
        lat: "",
        long: "",
        from: "IOS"
      }
    },
    forgot: {
      url: "/v3/auth/forgot/format/json",
      method: "POST",
      param: {
        username: ""
      }
    },
    visitCycle: {
      url: "/v3/visit/cycle/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    customersCycle: {
      url: "/v3/customers/cycle/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionSearch: {
      url: "/v3/options/search/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    uploadImageCustomer: {
      url: "/v3/customers/image64/format/json",
      method: "POST",
      param: {}
    },
    uploadImageVisitCustomer: {
      url: "/v3/visit/image64/format/json",
      method: "POST",
      param: {}
    },

    customersCheck: {
      url: "/v3/customers/check/format/json",
      method: "POST",
      param: {
        user_id: "",
        limit: "",
        offset: ""
      },
    },
    customersChecked: {
      url: "/v3/customers/checked/format/json",
      method: "POST",
      param: {
        user_id: "",
        customer_id: ""
      },
    },
    searchCustomer: {
      url: "/v3/customers/search/format/json",
      method: "POST",
      param: {
        user_id: "",
        key: "",
        province_id: "",
        ampher_id: "",
        tumbol_id: ""
      }
    },
    searchVisitCustomer: {
      url: "/v3/visit/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        search: "",
        start_date: "",
        end_date: ""
      }
    },
    profile: {
      url: "/v3/user/profile/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    schedule: {
      url: "/v3/schedule/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        limit: "",
        offset: ""
      }
    },
    visit: {
      url: "/v3/visit/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        limit: "",
        offset: ""
      }
    },
    customerDetail: {
      url: "/v3/customers/customer/format/json",
      method: "GET",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    optionCustomer: {
      url: "/v3/options/customer/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionChannelCustomer: {
      url: "/v3/options/channel/format/json",
      method: "GET",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    optionCustomerFilter: {
      url: "/v3/options/customer_filter/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionUser: {
      url: "/v3/user/option/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    updateUser: {
      url: "/v3/user/updated/format/json",
      method: "POST",
      param: {
        user_id: "",
        level_id: "",
        mobile: "",
        date: "",
        area: ""
      }
    },
    visitCustomersListCheck: {
      url: "/v3/visit/customers/format/json",
      method: "GET",
      param: {
        user_id: "",
        lat: "",
        long: ""
      }
    },
    visitCustomersChecked: {
      url: "/v3/visit/selected/format/json",
      method: "POST",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    createCustomer: {
      url: "/v3/customers/created/format/json",
      method: "POST",
      param: {
        user_id: "",
        name: "",
        latitude: "",
        longitude: "",
        address: "",
        province_id: "",
        ampher_id: "",
        tumbol_id: "",
        postcode: "",
        tax_number: "",
        customer_group_id: "",
        customer_type_id: "",
        seats: "",
        project_type_id: "",
        founder_date: "",
        status: "",
        remark: "",
        contacts: "",
        channels: "",
        freezer: "",
        pg: "",
        images: "",
        callcard: ""
      }
    },
    updateCustomer: {
      url: "/v3/customers/updated/format/json",
      method: "POST",
      param: {
        customer_id: "",
        user_id: "",
        name: "",
        latitude: "",
        longitude: "",
        address: "",
        province_id: "",
        ampher_id: "",
        tumbol_id: "",
        postcode: "",
        tax_number: "",
        customer_group_id: "",
        customer_type_id: "",
        seats: "",
        project_type_id: "",
        founder_date: "",
        status: "",
        remark: "",
        contacts: "",
        channels: "",
        freezer: "",
        pg: "",
        images: "",
        callcard: ""
      }
    },
    optionVisitSale: {
      url: "/v3/options/visit_sale/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionEquipment: {
      url: "/v3/options/equipment/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionSale: {
      url: "/v3/options/sale/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionActivity: {
      url: "/v3/options/activity/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    visitActivityDetail: {
      url: "/v3/visit/activity_row/format/json",
      method: "GET",
      param: {
        user_id: "",
        activity_id: ""
      }
    },
    updateVisitCustomer: {
      url: "/v3/visit/updated/format/json",
      method: "POST",
      param: {
        user_id: "",
        visit_id: "",
        latitude: "",
        longitude: "",
        customer_id: "",
        remark: "",
        activities: "",
        sale: "",
        receipt: "",
        equipment: "",
        images: "",
        note: ""
      }
    },
    updateVisitActivity: {
      url: "/v3/visit/create_activity/format/json",
      method: "POST",
      param: {
        user_id: "",
        visit_activity_id: "",
        venue_type: "",
        venue_name: "",
        vendor_id: "",
        tradition_type_id: "",
        activity_master_id: "",
        activity_id: "",
        activity_name: "",
        start_date: "",
        end_date: "",
        pg: "",
        sales: "",
        equipment: "",
        sale_images: "",
        images: ""
      }
    },

    visitCustomerDetail: {
      url: "/v3/visit/row/format/json",
      method: "GET",
      param: {
        user_id: "",
        visit_id: ""
      }
    },
    deleteCustomer: {
      url: "/v3/customers/deleted/format/json",
      method: "POST",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    deleteSchedule: {
      url: "/v3/schedule/deleted/format/json",
      method: "POST",
      param: {
        user_id: "",
        schedule_id: ""
      }
    },
    updatedSchedule: {
      url: "/v3/schedule/updated/format/json",
      method: "POST",
      param: {
        user_id: "",
        schedule_id: "",
        cycle_id: "",
        plan: ""
      }
    },
    getScheduleCycleList: {
      url: "/v3/schedule/cycle/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    createdSchedule: {
      url: "/v3/schedule/created/format/json",
      method: "POST",
      param: {
        user_id: "",
        cycle_id: ""
      }
    },
    getScheduleView: {
      url: "/v3/schedule/cal/format/json",
      method: "GET",
      param: {
        user_id: "",
        schedule_id: ""
      }
    },
    getScheduleDetailList: {
      url: "/v3/schedule/row/format/json",
      method: "GET",
      param: {
        user_id: "",
        schedule_id: ""
      }
    },
    getOptionSchedule: {
      url: "/v3/schedule/option/format/json",
      method: "GET",
      param: {
        user_id: "",
        schedule_id: ""
      }
    },
    checkVersion: {
      url: "/v3/version/ios/format/json",
      method: "GET",
      param: {
      }
    }
  }
}