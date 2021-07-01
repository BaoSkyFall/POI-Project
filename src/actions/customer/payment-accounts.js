import axios from 'axios';
import queryBuilder from 'gql-query-builder';
import {
    FETCH_PAYMENT_ACCOUNTS,
    FETCH_PAYMENT_ACCOUNTS_SUCCESS,
    FETCH_PAYMENT_ACCOUNTS_FAIL,
    TOGGLE_MODAL,
    RESET_STORE
} from '../../constants/customer/payment-accounts';
import { URL_SERVER, URL_SERVER_GRAPHQL } from '../../configs/server';

const fetchPaymentAccounts = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_PAYMENT_ACCOUNTS });

        return axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'query',
            operation: 'wallets',
            data: {email, accessToken},
            fields: ['walletNumber', 'balance']
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_PAYMENT_ACCOUNTS_SUCCESS,
                    paymentAccounts: res.data.data.wallets
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