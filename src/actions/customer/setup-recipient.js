import axios from 'axios';
import queryBuilder from 'gql-query-builder';
import {
    FETCH_RECIPIENTS,
    FETCH_RECIPIENTS_SUCCESS,
    FETCH_RECIPIENTS_FAIL,
    UPDATE_RECIPIENT,
    UPDATE_RECIPIENT_SUCCESS,
    UPDATE_RECIPIENT_FAIL,
    DELETE_RECIPIENT,
    DELETE_RECIPIENT_SUCCESS,
    DELETE_RECIPIENT_FAIL,
    RESET_STORE,
    ADD_RECIPIENT,
    ADD_RECIPIENT_SUCCESS,
    ADD_RECIPIENT_FAIL,
    TOGGLE_MODAL_ADD_RECIPIENT
} from '../../constants/customer/setup-recipient';
import { URL_SERVER_GRAPHQL } from '../../configs/server';

const fetchRecipients = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS });

        axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'query',
            operation: 'receivers',
            data: { email, accessToken },
            fields: ['email', 'walletNumber', 'remindName']
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_RECIPIENTS_SUCCESS,
                    recipients: res.data.data.receivers
                });
            }
            else {
                dispatch({
                    type: FETCH_RECIPIENTS_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const updateRecipient = (email, walletNumber, remindName, accessToken) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_RECIPIENT });

        axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'mutation',
            operation: 'updated_receivers',
            data: {
                email,
                walletNumber,
                remindName,
                accessToken
            },
            fields: [ 'email', 'walletNumber', 'remindName' ]
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: UPDATE_RECIPIENT_SUCCESS,
                    recipients: res.data.data.updated_receivers,
                    messageSuccess: `Update remind name successfully!`
                });
            }
            else {
                dispatch({
                    type: UPDATE_RECIPIENT_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}


const deleteRecipient = (email, walletNumber, accessToken) => {
    return (dispatch) => {
        dispatch({ type: DELETE_RECIPIENT });

        axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'mutation',
            operation: 'deleted_receivers',
            data: {
                email,
                walletNumber,
                accessToken
            },
            fields: [ 'email', 'walletNumber', 'remindName' ]
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: DELETE_RECIPIENT_SUCCESS,
                    recipients: res.data.data.deleted_receivers,
                    messageSuccess: `Delete receiver record successfully!`
                });
            }
            else {
                dispatch({
                    type: DELETE_RECIPIENT_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const addRecipient = (email, receiverWalletNumber, remindName, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: ADD_RECIPIENT
        });

        axios.post(URL_SERVER_GRAPHQL, queryBuilder({
            type: 'mutation',
            operation: 'created_receivers',
            data: {
                email,
                receiverWalletNumber,
                remindName,
                accessToken
            },
            fields: [ 'email', 'walletNumber', 'remindName' ]
        }))
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: ADD_RECIPIENT_SUCCESS,
                    recipients: res.data.data.created_receivers,
                    messageSuccess: `Create receiver record successfully!`
                });
            }
            else {
                dispatch({
                    type: ADD_RECIPIENT_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
    }
}

const toggleModalAddRecipient = (isShowModalAddRecipient) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_ADD_RECIPIENT,
            isShowModalAddRecipient
        });
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
    fetchRecipients,
    updateRecipient,
    deleteRecipient,
    addRecipient,
    toggleModalAddRecipient,
    resetStore
}