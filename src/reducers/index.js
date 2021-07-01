import {combineReducers} from 'redux';

import authReducer from './auth';
import paymentAccountsReducer from './customer/payment-accounts';
import internalTransferReducer from './customer/internal-transfer';
import setupRecipientReducer from './customer/setup-recipient';
import transactionHistoryReducer from './customer/transaction-history';
import closeWalletReducer from './customer/close-wallet';

import accountUser from './staff/account-user';
import paymentAccount from './staff/account-payment';
import recharge from './staff/recharge';


export default combineReducers({
    authReducer,
    paymentAccountsReducer,
    internalTransferReducer,
    setupRecipientReducer,
    transactionHistoryReducer,
    closeWalletReducer,
    accountUser,
    paymentAccount,
    recharge,
})