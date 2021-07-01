import axios from 'axios';
import queryBuilder from 'gql-query-builder';
import {
    FETCH_USER_WALLETS,
    FETCH_USER_WALLETS_SUCCESS,
    FETCH_USER_WALLETS_FAIL,
    CLOSE_USER_WALLET,
    CLOSE_USER_WALLET_SUCCESS,
    CLOSE_USER_WALLET_FAIL,
    RESET_STORE
} from '../../constants/customer/close-wallet';
import { URL_SERVER, URL_SERVER_GRAPHQL } from '../../configs/server';

const fetchUserWallets = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER_WALLETS });

        return axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'query',
            operation: 'wallets',
            data: {email, accessToken},
            fields: ['walletNumber', 'balance', 'isClosed']
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_USER_WALLETS_SUCCESS,
                    userWallets: res.data.data.wallets
                });
            }
            else {
                dispatch({
                    type: FETCH_USER_WALLETS_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const closeUserWallet = (email, walletNumber, accessToken) => {
    return (dispatch) => {
        dispatch({ type: CLOSE_USER_WALLET });

        return axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'mutation',
            operation: 'closed_wallets',
            data: { email, walletNumber, accessToken },
            fields: ['walletNumber', 'balance', 'isClosed']
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: CLOSE_USER_WALLET_SUCCESS,
                    userWallets: res.data.data.closed_wallets,
                    messageSuccess: `wallet ${walletNumber} is closed`
                });
            }
            else {
                dispatch({
                    type: CLOSE_USER_WALLET_FAIL,
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
    return (dispatch) => {
        dispatch({
            type: RESET_STORE,
        });
    }
}

export {
    fetchUserWallets,
    closeUserWallet,
    resetStore
}