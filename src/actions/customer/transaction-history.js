import axios from 'axios';
import {
    FETCH_TRANSACTION_HISTORY_LOCAL,
    FETCH_TRANSACTION_HISTORY_LOCAL_SUCCESS,
    FETCH_TRANSACTION_HISTORY_LOCAL_FAIL,
    RESET_STORE
} from '../../constants/customer/transaction-history';
import { URL_SERVER_DEPLOY } from '../../configs/server';
import callApi from '../../ultis/callApi';

const fetchTransactionHistoryLocal = (id, accessToken,isAll=true) => {
    return (dispatch) => {
        dispatch({ type: FETCH_TRANSACTION_HISTORY_LOCAL });
        return callApi(`api/money/historyLocal?id=${id}&isAll=${isAll}`, 'GET', {}, { x_accessToken: accessToken })
        .then(res => {
            console.log('resHistory:', res)
            if (res.data.returnCode == 1) {
                dispatch({
                    type: FETCH_TRANSACTION_HISTORY_LOCAL_SUCCESS,
                    transactionHistory: res.data.data
                });
            }
        })
        .catch(error => {
            dispatch({
                type: FETCH_TRANSACTION_HISTORY_LOCAL_FAIL,
                messageError: "Server's error"
            });
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

export {
    fetchTransactionHistoryLocal,
    resetStore
}