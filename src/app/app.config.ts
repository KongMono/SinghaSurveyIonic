import { OpaqueToken } from '@angular/core';

export let ConfigApp = new OpaqueToken('app.config');

export interface IAppConfig {
  isLogged: any;
  pin_logged: any;
  userInfo: any;

  isBuildDevice: boolean;
  isProduction: boolean;
  endpoint: string;
  endpointUpload: string;
  endpoint_production: string;
  service: any;

}

export const AppConfig: IAppConfig = {
  isLogged: null,
  pin_logged: null,
  userInfo: null,
  isBuildDevice: false,
  isProduction: false,

  endpoint: 'http://128.199.72.29/index.php',
  endpointUpload: 'http://128.199.72.29/',
  endpoint_production: 'https://ssv.boonrawd.co.th',
  service: {
    customersList: {
      url: "/v2/customers/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        limit: "",
        offset: "",
        order: ""
      }
    },
    login: {
      url: "/v2/auth/login/format/json",
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
      url: "/v2/auth/forgot/format/json",
      method: "POST",
      param: {
        username: ""
      }
    },
    visitCycle: {
      url: "/v2/visit/cycle/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    customersCycle: {
      url: "/v2/customers/cycle/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionSearch: {
      url: "/v2/options/search/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    uploadImageCustomer: {
      url: "/v2/customers/image64/format/json",
      method: "POST",
      param: {}
    },
    customersCheck: {
      url: "/v2/customers/check/format/json",
      method: "POST",
      param: {
        user_id: "",
        limit: "",
        offset: ""
      },
    },
    customersChecked: {
      url: "/v2/customers/checked/format/json",
      method: "POST",
      param: {
        user_id: "",
        customer_id: ""
      },
    },
    searchCustomer: {
      url: "/v2/customers/search/format/json",
      method: "POST",
      param: {
        user_id: "",
        key: "",
        province_id: "",
        ampher_id: "",
        tumbol_id: ""
      }
    },
    profile: {
      url: "/v2/user/profile/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    schedule: {
      url: "/v2/schedule/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        limit: "",
        offset: ""
      }
    },
    visit: {
      url: "/v2/visit/list/format/json",
      method: "GET",
      param: {
        user_id: "",
        limit: "",
        offset: ""
      }
    },
    customerDetail: {
      url: "/v2/customers/customer/format/json",
      method: "GET",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    optionCustomer: {
      url: "/v2/options/customer/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    optionChannelCustomer: {
      url: "/v2/options/channel/format/json",
      method: "GET",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    optionUser: {
      url: "/v2/user/option/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    updateUser: {
      url: "/v2/user/updated/format/json",
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
      url: "/v2/visit/customers/format/json",
      method: "GET",
      param: {
        user_id: ""
      }
    },
    visitCustomersChecked: {
      url: "/v2/visit/selected/format/json",
      method: "POST",
      param: {
        user_id: "",
        customer_id: ""
      }
    },
    createCustomer: {
      url: "/v2/customers/created/format/json",
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
      url: "/v2/customers/updated/format/json",
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
    visitCustomerDetail: {
      url: "/v2/visit/row/format/json",
      method: "GET",
      param: {
        user_id: "",
        visit_id: ""
      }
    }
  }
}