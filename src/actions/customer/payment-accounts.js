import axios from 'axios';
import {
    FETCH_PAYMENT_ACCOUNTS,
    FETCH_PAYMENT_ACCOUNTS_SUCCESS,
    FETCH_PAYMENT_ACCOUNTS_FAIL,
    TOGGLE_MODAL,
    RESET_STORE
} from '../../constants/customer/payment-accounts';
import { URL_SERVER, URL_SERVER_DEPLOY } from '../../configs/server';
import callApi from '../../ultis/callApi';

const fetchPaymentAccounts = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_PAYMENT_ACCOUNTS });

        return callApi(`api/moneyAccount/${id}`, 'GET', {}, { x_accessToken: accessToken })
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_PAYMENT_ACCOUNTS_SUCCESS,
                    paymentAccounts: res.data.data.data
                });
            }
            else {
                dispatch({
                    type: FETCH_PAYMENT_ACCOUNTS_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const resetStore = () => {
    return dispatch => {
        dispatch({
            type: RESET_STORE
        })
    }
}

const toggleModal = (isShowModal) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL,
            isShowModal
        });
    }
}

export {
    fetchPaymentAccounts,
    resetStore,
    toggleModal
}