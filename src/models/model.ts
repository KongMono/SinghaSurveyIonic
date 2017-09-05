interface CustomersListModel {
  data: CustomersListData[];
}
interface CustomersListData {
  'customer_id': string;
  name: string;
  latitude: null | string;
  longitude: null | string;
  'customer_group_id': string;
  status: string;
  address: string;
  'customer_group_name': string;
  'project_type_name': string;
  'long_address': string;
  'is_edit': string;
  'status_plan': string;
  'count_survey': number;
}

interface LoginModel {
  username: string;
  type?: any;
  firstname: string;
  surname: string;
  email: string;
  mobile: string;
  'ampher_id'?: any;
  'province_id': string;
  'company_id': string;
  'prov_name'?: any;
  permission: string;
  'user_level_id': string;
  'master_group_id': string;
  'master_section_id': string;
  'master_area_id': string;
  'province_multi': string;
  'position_des'?: any;
  'enable_latlong': string;
  'enable_visit': string;
  'enable_customer': string;
  'max_customer'?: any;
  'sale_group_id'?: any;
  'user_id': string;
}

interface visitCustomersListModel {
  data: visitList[];
}

interface visitList {
  customer_id: string;
  name: string;
}
interface ForgotModel {
  msg: string;
}

interface customersCheckModel {
  customers: Customer[];
}

interface Customer {
  customers_id: string;
  name: string;
}

interface CustomerFilterModel {
  select: Select[];
}

interface Select {
  id: string;
  name: string;
}

interface ProfileModel {
  data: ProfileData;
}
interface ProfileData {
  username: string;
  image: string;
  fullname: string;
  mobile: string;
  type: string;
  area: ProfileArea[];
}
interface ProfileArea {
  province: string;
  ampher: string[];
}

interface ScheduleListModel {
  data: ScheduleListData[];
}
interface ScheduleListData {
  'schedule_id': string;
  'cycle_id': string;
  name: string;
  'start_date': string;
  'end_date': string;
  'can_delete': string;
}

interface VisitListModel {
  data: VisitListData[];
}
interface VisitListData {
  'visit_id': string;
  'customer_id': string;
  'customer_name': string;
  latitude: string;
  longitude: string;
  address: string;
  'customer_group_name': string;
  'project_type_name': string;
  'created_date': string;
  'is_sale': string;
  'is_activity': string;
  'is_premium': string;
  'is_tracking': string;
}


interface CustomerDetailModel {
  customer_id: string;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  province_id: string;
  ampher_id: string;
  tumbol_id: string;
  postcode: string;
  tax_number: string;
  customer_group_id: string;
  customer_type_id: string;
  seats: string;
  project_type_id: string;
  founder_date: string;
  status: string;
  remark: string;
  user_last_updated: string;
  updated_at: string;
  created_at: string;
  contacts: any[];
  channels: any[];
  pg: any[];
  freezer: any[];
  callcard: any[];
  images?: any;
}

interface optionsVisitSaleModel {
  boonrawd: Boonrawd[];
  rival: Boonrawd[];
}
interface Boonrawd {
  product_id: string;
  product_name: string;
}

interface optionsSaleModel {
  product_group: Productgroup[];
  promotion: Promotion[];
}

interface visitActivityDetailModel {
  visit_activity_id: string;
  venue_type: string;
  venue_name: string;
  vendor_id: string;
  tradition_type_id: string;
  activity_name: string;
  start_date: string;
  end_date: string;
  activity_master_id: string;
  activity_id: string;
  pg: any[];
  sales: any[];
  equipment: any[];
  images?: any;
  sale_images?: any;
}

interface optionsActivityModel {
  vendor: Vendor[];
  tradition_type: Traditiontype[];
}

interface Traditiontype {
  tradition_type_id: string;
  tradition_name: string;
  activity_master: Activitymaster[];
}

interface Activitymaster {
  activity_master_id: string;
  activity_master_name: string;
  activity: Activity[];
}

interface Activity {
  activity_id: string;
  activity_name: string;
}

interface Vendor {
  vendor_id: string;
  name: string;
}

interface Promotion {
  promotion_id: string;
  name: string;
}

interface Productgroup {
  product_group_id: string;
  name: string;
  product: Product[];
}

interface Product {
  product_id: string;
  name: string;
}

interface optionEquipmentModel {
  data: Datum[];
}

interface Datum {
  product_vendor_id: string;
  name: string;
  product_group: Productgroup[];
}

interface Productgroup {
  product_group_id: string;
  name: string;
  product: Product[];
}

interface Product {
  product_id: string;
  name: string;
}
interface OptionSearchCustomerModel {
  province: Province[];
}

interface Province {
  province_id: string;
  province_th: string;
  ampher: Ampher[];
}

interface Ampher {
  ampher_id: string;
  ampher_th: string;
  tumbol: Tumbol[];
}

interface Tumbol {
  tumbol_id: string;
  tumbol_th: string;
}
interface optionCustomerModel {
  province: Province[];
  customer_group: Customergroup[];
  status: Status[];
}

interface Status {
  status_id: string;
  name: string;
}

interface Customergroup {
  customer_group_id: string;
  name: string;
  customer_type: Customertype[];
  project_type: Projecttype[];
}

interface Projecttype {
  project_type_id: string;
  name: string;
}

interface Customertype {
  customer_type_id: string;
  name: string;
}

interface Province {
  province_id: string;
  province_th: string;
  ampher: Ampher[];
}

interface Ampher {
  ampher_id: string;
  ampher_th: string;
  tumbol: Tumbol[];
}

interface Tumbol {
  tumbol_id: string;
  tumbol_th: string;
}


interface optionChannelCustomerModel {
  customer_group: Customergroup[];
  product_category: Productcategory[];
}

interface Productcategory {
  product_category_id: string;
  name: string;
}

interface Customergroup {
  customer_group_id: string;
  name: string;
  customer_channel: Customerchannel[];
}

interface Customerchannel {
  id: string;
  name: string;
}

interface OptionUserModel {
  level: OptionUserDataLevel[];
  province: OptionUserDataProvince[];
}
interface OptionUserDataProvince {
  province_id: string;
  province_th: string;
  ampher: OptionUserDataProvinceDataAmpher[];
}
interface OptionUserDataProvinceDataAmpher {
  ampher_id: string;
  ampher_th: string;
}
interface OptionUserDataLevel {
  level_id: string;
  level_name: string;
}

interface CustomersCycleModel {
  name: string;
  visit: CustomersCycleDataVisit[];
}
interface CustomersCycleDataVisit {
  name: string;
  total: string;
  percent: number;
}

interface VisitCycleModel {
  name: string;
  visit: VisitCycleDataVisit[];
}
interface VisitCycleDataVisit {
  name: string;
  total: number;
}

interface VisitCustomerDetailModel {
  id: string;
  latitude: string;
  longitude: string;
  customer_id: string;
  customer_name: string;
  remark: string;
  updated_at: string;
  created_at: string;
  visit_date: string;
  equipment: any[];
  images?: any;
  note: any[];
  activities: any[];
  order: Order[];
  sale: Sale;
  receipt: Boonrawd[];
}

interface Sale {
  boonrawd: Boonrawd[];
  rival: Boonrawd[];
}

interface Boonrawd {
  year: string;
  month: string;
  status: boolean;
  value: any[];
}

interface Order {
  year: string;
  month: string;
  value: any[];
}