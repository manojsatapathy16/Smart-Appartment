export const BASE_URL: string = 'http://192.168.11.250:8000/';
// export const BASE_URL: string = 'https://smartapartment.onrender.com/';

export const APIS: { [key: string]: string } = {
  LOGIN: BASE_URL + 'login',
  CUSTOMER: BASE_URL + 'guestList_aprt',
  RENTED_CUSTOMER: BASE_URL + 'cusList_aprt',
  SECURITY_LIST: BASE_URL + 'secList_aprt',
  APPROVAL_ACTION: BASE_URL + 'acctaproval',
  ADD_VISITERS: BASE_URL + 'addVisitors',
  GET_VISITERS: BASE_URL + 'getVisitors',
  SECURITY_LIST_CUSTOMER: BASE_URL + 'secList_cust'
};