import axios from 'axios';
import {
    FETCH_GET_DEBT_REMINDER,
    FETCH_GET_DEBT_REMINDER_SUCCESS,
    FETCH_GET_DEBT_REMINDER_FAIL,
    FETCH_TRANFER_MONEY_DEBT,
    FETCH_TRANFER_MONEY_DEBT_SUCCESS,
    FETCH_TRANFER_MONEY_DEBT_FAIL,
    FETCH_GET_DEBT_OWNER,
    FETCH_GET_DEBT_OWNER_SUCCESS,
    FETCH_GET_DEBT_OWNER_FAIL,
    ADD_DEBT_REMINDER,
    ADD_DEBT_REMINDER_SUCCESS,
    ADD_DEBT_REMINDER_FAIL,
    GET_NAME_BY_WALLET_ID,
    GET_NAME_BY_WALLET_ID_SUCCESS,
    GET_NAME_BY_WALLET_ID_FAIL,
    DELETE_DEBT_OWNER,
    DELETE_DEBT_OWNER_SUCCESS,
    DELETE_DEBT_OWNER_FAIL,
    SHOW_ADD_MODAL,
    HANDLE_CANCEL_MODAL,
    SHOW_PAY_DEBT_MODAL,
    HANDLE_CANCEL_PAY_DEBT_MODAL

} from '../../constants/customer/debt-reminder.js';
import { URL_SERVER, URL_SERVER_DEPLOY } from '../../configs/server';
import callApi from '../../ultis/callApi';
import moment from 'moment'
import jwt from 'jwt-decode';

const firebase = require("firebase");


const fetchGetDebtReminder = (id_debtor, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_GET_DEBT_REMINDER });
        return callApi(`api/debt-reminder/getDebtReminder/${id_debtor}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res:', res);
                if (res.status === 200) {
                    dispatch({
                        type: FETCH_GET_DEBT_REMINDER_SUCCESS,
                        debtReminders: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_GET_DEBT_REMINDER_FAIL,
                        messageError: res.data.errors[0].message
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_GET_DEBT_REMINDER_FAIL,
                    messageError: "Error Server"
                });
            })

    }
}
function pushNotificationFireBase(string, doc) {
    console.log('doc:', doc)
    firebase
        .firestore()
        .collection('notifications')
        .doc(doc.toString())
        .update({
            listNotify: firebase.firestore.FieldValue.arrayUnion({
                content: string,

            }),
            isRead: false
        })
}
const fetchTranferMoneyDebt = (data, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_TRANFER_MONEY_DEBT });

        return callApi(`api/debt-reminder/payDebt`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                console.log('res:', res)
                if (res.data.returnCode === 1) {
                    dispatch({
                        type: FETCH_TRANFER_MONEY_DEBT_SUCCESS,
                        messageSuccess: res.data.message
                    });
                    let decoded = jwt(accessToken);
                    console.log('data Transfer:', data);
                    console.log('data InTransferDebt:', data);
                    let date = moment(Date.now()).format("DD/MM/YYYY hh:mm a");
                    pushNotificationFireBase(`You have paid for your debt with ${data.money_debt } VNĐ success on ${date} to ${data.creditor} with desciption ${data.description.slice(0,20)}...`, decoded.walletId);
                    pushNotificationFireBase(`You has been credited ${data.money_debt } VNĐ success on ${date} from ${data.name}  with desciption ${data.description.slice(0,20)}...`, data.walletID);
                    callApi(`api/debt-reminder/getDebtReminder/${data.id_debtor}`, 'GET', {}, { x_accessToken: accessToken })
                        .then(res => {
                            console.log('res:', res);
                            if (res.status === 200) {
                                dispatch({
                                    type: FETCH_GET_DEBT_REMINDER_SUCCESS,
                                    debtReminders: res.data.data
                                });

                            }
                            else {
                                dispatch({
                                    type: FETCH_GET_DEBT_REMINDER_FAIL,
                                    messageError: res.data.message
                                });
                            }
                        })
                        .catch((err) => {
                            dispatch({
                                type: FETCH_GET_DEBT_REMINDER_FAIL,
                                messageError: "Error Server"
                            });
                        })

                    dispatch({
                        type: HANDLE_CANCEL_PAY_DEBT_MODAL
                    })
                }

                else if (res.data.returnCode == -1) {
                    dispatch({
                        type: FETCH_TRANFER_MONEY_DEBT_FAIL,
                        messageError: res.data.message
                    });
                    dispatch({
                        type: FETCH_TRANFER_MONEY_DEBT_FAIL,
                        messageError: ''
                    });

                }
                else if (res.data.returnCode == 0) {
                    dispatch({
                        type: FETCH_TRANFER_MONEY_DEBT_FAIL,
                        messageError: res.data.message
                    });
                    dispatch({
                        type: FETCH_TRANFER_MONEY_DEBT_FAIL,
                        messageError: ''
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}
const fetchGetDebtOwner = (id_owner, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_GET_DEBT_OWNER });

        return callApi(`api/debt-reminder/getDebtOwner/${id_owner}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_GET_DEBT_OWNER_SUCCESS,
                        debtOwner: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_GET_DEBT_OWNER_FAIL,
                        messageError: res.data.errors[0].message
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}
const deleteDebtOwner = (id_debt, accessToken) => {
    return (dispatch) => {
        dispatch({ type: DELETE_DEBT_OWNER });

        return callApi(`api/debt-reminder/deleteDebtReminder/`, 'DELETE', { id_debt }, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: DELETE_DEBT_OWNER_SUCCESS,
                    });
                }
                else {
                    dispatch({
                        type: DELETE_DEBT_OWNER_FAIL,
                        messageError: res.data.errors[0].message
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}


const fetchGetNameByWalletId = (wallet_id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: GET_NAME_BY_WALLET_ID });

        return callApi(`api/debt-reminder/getNameByWalletId/${wallet_id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors && res.data.data.length > 0) {
                    console.log("res.data12345: ", res.data.data[0])
                    dispatch({
                        type: GET_NAME_BY_WALLET_ID_SUCCESS,
                        name: res.data.data[0].name,
                        id: res.data.data[0].id

                    });
                }
                else {
                    dispatch({
                        type: GET_NAME_BY_WALLET_ID_FAIL,
                        messageError: "Can't find Name"
                    });
                }

            })
            .catch(error => {
                console.log(error);
            })
    }
}


const addDebtReminder = (data, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: ADD_DEBT_REMINDER
        });
        console.log('data:', data)
        return callApi(`api/debt-reminder/addDebtReminder/`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                if (res.status === 201) {
                    console.log("res.data: ", res.data.data[0])
                    dispatch({
                        type: ADD_DEBT_REMINDER_SUCCESS,
                    });
                }
                else {
                    dispatch({
                        type: ADD_DEBT_REMINDER_FAIL,
                        messageError: "Can't Add data it may cause from server"
                    });
                }

            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: ADD_DEBT_REMINDER_FAIL,
                    messageError: "Can't Add data it may cause from server"
                });
            })

    }
}
const showAddModal = () => {
    return dispatch => {
        dispatch({
            type: SHOW_ADD_MODAL

        })
    }
}

const handleCancelModal = () => {
    return dispatch => {
        dispatch({
            type: HANDLE_CANCEL_MODAL
        })
    }
}
const showPayDebtModal = (data) => {
    console.log('data:', data)
    return dispatch => {
        dispatch({
            type: SHOW_PAY_DEBT_MODAL,
            data
        })
    }
}

const handleCancelPayDebtModal = () => {
    return dispatch => {
        dispatch({
            type: HANDLE_CANCEL_PAY_DEBT_MODAL
        })
    }
}
export {
    fetchGetDebtReminder,
    fetchTranferMoneyDebt,
    fetchGetNameByWalletId,
    deleteDebtOwner,
    fetchGetDebtOwner,
    addDebtReminder,
    handleCancelModal,
    showAddModal,
    showPayDebtModal,
    handleCancelPayDebtModal
}