import axios from 'axios';
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
    CHANGE_TAB_PANEL,
    ADD_RECIPIENT,
    ADD_RECIPIENT_SUCCESS,
    ADD_RECIPIENT_FAIL,
    TOGGLE_MODAL_ADD_RECIPIENT
} from '../../constants/customer/setup-recipient';
import callApi from '../../ultis/callApi';
import * as _ from 'lodash'
const fetchRecipients = (username, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS });

        return callApi(`api/recipient/getAllRecipient/${username}`, 'GET', {}, { x_accesstoken: accessToken })
            .then(res => {
                console.log('res All recipient:', res)

                if (res.data.returnCode == 1) {
                    console.log('returnCode:', res.data.returnCode)
                    dispatch({
                        type: FETCH_RECIPIENTS_SUCCESS,
                        recipients: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_RECIPIENTS_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                console.log('error:', error)
                dispatch({
                    type: FETCH_RECIPIENTS_FAIL,
                    messageError:"Error"
                });
            })
    }
}

const updateRecipient = (id, id_recipient, name_recipient,walletId, recipients,accessToken) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_RECIPIENT });
        return callApi(`api/recipient/editRecipient`, 'PUT', {id,id_recipient,name_recipient,walletId}, { x_accesstoken: accessToken })
            .then(res => {
                if (res.data.returnCode == 1) {
                    let index = _.findIndex(recipients, function(o) { return o.id == id && o.id_recipient == id_recipient })
                    recipients[index].name_recipient = name_recipient;
                    dispatch({
                        type: UPDATE_RECIPIENT_SUCCESS,
                         recipients: recipients,
                        messageSuccess: `Update remind name to ${name_recipient} successfully!`
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_RECIPIENT_FAIL,
                        messageError: res.message
                    });
                }
            })
            .catch(error => {
                console.log(error);
                console.log('error:', error)
                dispatch({
                    type: UPDATE_RECIPIENT_FAIL,
                    messageError: error.message
                });
            })
    }
}


const deleteRecipient = (data, recipients, accessToken) => {
    return (dispatch) => {
        dispatch({ type: DELETE_RECIPIENT });
        console.log('data123465:', data)
        return callApi(`api/recipient/deleteRecipient`, 'DELETE', data, { x_accesstoken: accessToken })
            .then(res => {
                if (!res.data.errors) {

                    let result = _.remove(recipients, function (n) {
                        return n.walletId == data.walletId && n.username_recipient == data.username_recipient && n.isLocal == data.isLocal && n.username == data.username
                    });
                    console.log('result:', result)
                    dispatch({
                        type: DELETE_RECIPIENT_SUCCESS,
                        messageSuccess: `Delete receiver record successfully!`,
                        recipients
                    });
                }
                else {
                    dispatch({
                        type: DELETE_RECIPIENT_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                console.log('error:', error)
                dispatch({
                    type: DELETE_RECIPIENT_FAIL,
                    messageError: "Can't connect to server"
                });
            })
    }
}

const addRecipientForeign = (username, receiverWalletNumber, remindName, bank_LinkId, isLocalAdd, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: ADD_RECIPIENT
        });
        console.log('accessToken:', accessToken)
        return callApi(`api/recipient/addRecipientForeign`, 'POST', { id_recipient: null, id: username, bank_LinkId: bank_LinkId, name_recipient: remindName, isLocal: isLocalAdd, walletId: receiverWalletNumber }, { x_accesstoken: accessToken })
            .then(res => {
                if (res.data.returnCode ==1) {
                    dispatch({
                        type: ADD_RECIPIENT_SUCCESS,
                        messageSuccess: `Create receiver record successfully!`
                    });
                    callApi(`api/recipient/getAllRecipient/${username}`, 'GET', {}, { x_accesstoken: accessToken })
                        .then(res => {
                            console.log('res All recipient:', res)

                            if (!res.data.errors) {
                                dispatch({
                                    type: FETCH_RECIPIENTS_SUCCESS,
                                    recipients: res.data.data
                                });
                            }
                            else {
                                dispatch({
                                    type: FETCH_RECIPIENTS_FAIL,
                                    messageError: res.data.message
                                });
                            }
                        })
                        .catch(error => {
                            console.log('error:', error)
                            dispatch({
                                type: FETCH_RECIPIENTS_FAIL,
                                messageError: "Can't connect to server"
                            });
                        })

                }
                else if (res.data.returnCode == -1) {
                    dispatch({
                        type: ADD_RECIPIENT_FAIL,
                        messageError: res.data.message
                    });
                }
                else
                {
                    dispatch({
                        type: ADD_RECIPIENT_FAIL,
                        messageError: res.data.message
                    });
                }
            }).catch(error => {
                console.log('error:', error)
                dispatch({
                    type: ADD_RECIPIENT_FAIL,
                    messageError: 'Error might Cause from Server'
                });
            })
    }
}
const addRecipientLocal = (username, receiverWalletNumber, remindName, usernameRecipient, isLocalAdd, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: ADD_RECIPIENT
        });
        console.log('accessToken:', accessToken)
        return callApi(`api/recipient/addRecipientLocal`, 'POST', { id_recipient: usernameRecipient, id: username, bank_LinkId: 'bankdbb', name_recipient: remindName, isLocal: isLocalAdd, walletId: receiverWalletNumber }, { x_accesstoken: accessToken })
            .then(res => {
                if (res.data.returnCode ==1) {
                    dispatch({
                        type: ADD_RECIPIENT_SUCCESS,
                        messageSuccess: `Create receiver record successfully!`
                    });
                    callApi(`api/recipient/getAllRecipient/${username}`, 'GET', {}, { x_accesstoken: accessToken })
                        .then(res => {
                            console.log('res All recipient:', res)

                            if (!res.data.errors) {
                                dispatch({
                                    type: FETCH_RECIPIENTS_SUCCESS,
                                    recipients: res.data.data
                                });
                            }
                            else {
                                dispatch({
                                    type: FETCH_RECIPIENTS_FAIL,
                                    messageError: res.data.message
                                });
                            }
                        })
                        .catch(error => {
                            console.log('error:', error)
                            dispatch({
                                type: FETCH_RECIPIENTS_FAIL,
                                messageError: "Can't connect to server"
                            });
                        })

                }
                else if (res.data.returnCode == -1) {
                    dispatch({
                        type: ADD_RECIPIENT_FAIL,
                        messageError: res.data.message
                    });
                }
                else
                {
                    dispatch({
                        type: ADD_RECIPIENT_FAIL,
                        messageError: res.data.message
                    });
                }
            }).catch(error => {
                console.log('error:', error)
                dispatch({
                    type: ADD_RECIPIENT_FAIL,
                    messageError: 'Error might Cause from Server'
                });
            })
    }
}

const toggleModalAddRecipient = (isShowModalAddRecipient) => {
    console.log('isShowModalAddRecipientLocal:', isShowModalAddRecipient)
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_ADD_RECIPIENT,
            isShowModalAddRecipient

        });
    }
}
const changeTabPanel = () => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_TAB_PANEL,
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
    addRecipientLocal,
    addRecipientForeign,
    changeTabPanel,
    toggleModalAddRecipient,
    resetStore
}