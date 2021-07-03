import { combineReducers } from "redux";

import paymentAccountsReducer from "./customer/payment-accounts";
import setupRecipientReducer from "./customer/setup-recipient";
import internalTransferReducer from "./customer/internal-tranfer";
import transactionHistoryReducer from "./customer/transaction-history";
import debtReminderReducer from "./customer/debt-reminder";
import userManagementReducer from "./customer/users-management";
import visitManagementReducer from "./customer/visit-management";
import tripManagementReducer from "./customer/trip-management";


import authReducer from "./auth";
import forgetPasswordReducer from "./forget-password";

import accountUser from "./staff/account-user";
import paymentAccount from "./staff/account-payment";
import rechargeReducer from "./staff/recharge";

export default combineReducers({
  authReducer,
  forgetPasswordReducer,
  // LoginReducer,
  setupRecipientReducer,
  paymentAccountsReducer,
  internalTransferReducer,
  transactionHistoryReducer,
  debtReminderReducer,
  paymentAccount,
  authReducer,
  accountUser,
  rechargeReducer,


  userManagementReducer,
  visitManagementReducer,
  tripManagementReducer
});
