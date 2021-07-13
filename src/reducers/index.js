import { combineReducers } from "redux";


import userManagementReducer from "./customer/users-management";
import visitManagementReducer from "./customer/visit-management";
import tripManagementReducer from "./customer/trip-management";
import hashtagManagementReducer from "./customer/hashtag-management";
import destinationManagementReducer from "./customer/destination-management";
import destinationTypeManagementReducer from "./customer/destination-type-management";
import poiManagementReducer from "./customer/poi";
import poiTypeManagementReducer from "./customer/poi-type";
import blogManagementReducer from "./customer/blog";

import authReducer from "./auth";
import forgetPasswordReducer from "./forget-password";

import accountUser from "./staff/account-user";
import paymentAccount from "./staff/account-payment";
import rechargeReducer from "./staff/recharge";

export default combineReducers({
  authReducer,
  forgetPasswordReducer,
  // LoginReducer,
  paymentAccount,
  accountUser,
  rechargeReducer,


  userManagementReducer,
  visitManagementReducer,
  tripManagementReducer,
  hashtagManagementReducer,
  destinationManagementReducer,
  destinationTypeManagementReducer,
  poiManagementReducer,
  poiTypeManagementReducer,

  blogManagementReducer
});
