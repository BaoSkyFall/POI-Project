import axios from 'axios';
import {
    FETCH_USER_WALLETS,
    FETCH_USER_WALLETS_SUCCESS,
    FETCH_USER_WALLETS_FAIL,
    FETCH_RECIPIENTS_LOCAL,
    FETCH_RECIPIENTS_LOCAL_SUCCESS,
    FETCH_RECIPIENTS_LOCAL_FAIL,
    FETCH_RECIPIENTS_FOREIGN,
    FETCH_RECIPIENTS_FOREIGN_SUCCESS,
    FETCH_RECIPIENTS_FOREIGN_FAIL,
    RESET_STORE,
    RESET_MESSAGE,
    SET_BALANCE,
    SET_VALUES_TRANFER,
    SEND_TRANSFER_INFORMATION,
    SEND_TRANSFER_INFORMATION_SUCCESS,
    SEND_TRANSFER_INFORMATION_FAIL,
    GET_OTP,
    GET_OTP_SUCCESS,
    GET_OTP_FAIL,
    TOGGLE_MODAL_TRANSFER,
    TOGGLE_MODAL_ADD_RECIPIENT,
    TRACK_RECIPIENT_LOCAL,
    TRACK_RECIPIENT_LOCAL_SUCCESS,
    TRACK_RECIPIENT_LOCAL_FAIL,
    TRACK_RECIPIENT_FOREIGN,
    TRACK_RECIPIENT_FOREIGN_SUCCESS,
    TRACK_RECIPIENT_FOREIGN_FAIL,
} from '../../constants/customer/internal-tranfer';
import { ACCESS_TOKEN_KEY } from '../../configs/client';
import { URL_SERVER, URL_SERVER_DEPLOY } from '../../configs/server';
import jwt from 'jwt-decode';
import callApi from '../../ultis/callApi';
import moment from 'moment'
const firebase = require("firebase");

const fetchUserWallets = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER_WALLETS });
        let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        return callApi(`api/moneyAccount/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res moneyAccount:', res)
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_USER_WALLETS_SUCCESS,
                        userWallets: res.data.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_USER_WALLETS_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_USER_WALLETS_FAIL,
                    messageError: error
                });
            })
    }
}


const fetchRecipientsLocal = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS_LOCAL });

        return callApi(`api/recipient/getRecipientLocal/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_RECIPIENTS_LOCAL_SUCCESS,
                        recipientsLocal: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_RECIPIENTS_LOCAL_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_RECIPIENTS_LOCAL_FAIL,
                    messageError: error
                });
            })
    }
}

const trackRecipientLocal = (walletNumber, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: TRACK_RECIPIENT_LOCAL
        });

        return callApi(`api/recipient/trackRecipientLocal/${walletNumber}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res:', res.data.data[0])
                if (!res.data.errors) {
                    dispatch({
                        type: TRACK_RECIPIENT_LOCAL_SUCCESS,
                        emailRecipient: res.data.data[0].email,
                        fullNameRecipient: res.data.data[0].fullname,
                        usernameRecipient: res.data.data[0].username,
                        isLocalRecipient: res.data.data[0].isLocal,

                        bankRecipient: res.data.data[0].name,
                    })
                }
                else {
                    dispatch({
                        type: TRACK_RECIPIENT_LOCAL_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: TRACK_RECIPIENT_LOCAL_FAIL,
                    messageError: 'Fail track Recipient'
                });
            })
    }
}
const fetchRecipientsForeign = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS_FOREIGN });

        return callApi(`api/recipient/getRecipientForeign/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_RECIPIENTS_FOREIGN_SUCCESS,
                        recipientsForeign: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_RECIPIENTS_FOREIGN_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_RECIPIENTS_FOREIGN_FAIL,
                    messageError: error
                });
            })
    }
}

const trackRecipientForeign = (idBank, credit_number, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: TRACK_RECIPIENT_FOREIGN
        });

        return callApi(`api/partner-bank/info-partner/${idBank}/${credit_number}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('resPartner:', res.data)
                if (res.data.returnCode == 1) {
                    let name
                    if (res.data.data.lastname && res.data.data.firstname)
                        name = `${res.data.data.lastname} ${res.data.data.firstname}`
                    else
                        name = res.data.data.data.name;
                    dispatch({
                        type: TRACK_RECIPIENT_FOREIGN_SUCCESS,
                        fullNameRecipient: name,
                        bankRecipient: idBank,

                    })
                }
                else {
                    dispatch({
                        type: TRACK_RECIPIENT_FOREIGN_FAIL,
                        messageError: `Fail track Recipient Foreign Bank with ${credit_number}`
                    });
                    dispatch({
                        type: TRACK_RECIPIENT_FOREIGN_FAIL,
                        messageError: ``
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: TRACK_RECIPIENT_FOREIGN_FAIL,
                    messageError: `Fail track Recipient Foreign Bank with ${credit_number}`
                });
                dispatch({
                    type: TRACK_RECIPIENT_FOREIGN_FAIL,
                    messageError: ``
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
const sendTransferInformation = (data, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: SEND_TRANSFER_INFORMATION
        });
        return callApi(`api/money/transferLocal`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                console.log('res Tranfer Money:', res.data.message)
                if (!res.data.errors) {
                    let decoded = jwt(accessToken);
                    console.log('data Transfer:', data);
                    let date = moment(Date.now()).format("DD/MM/YYYY hh:mm a")
                    pushNotificationFireBase(`You has been debited ${data.money} VNĐ success on ${date} to ${data.to} with desciption ${data.description}`, decoded.walletId);
                    pushNotificationFireBase(`You has been credited ${data.money} VNĐ success on ${date} from ${data.from}  with desciption ${data.description}`, data.to);
                    dispatch({
                        type: TOGGLE_MODAL_TRANSFER,
                    });
                    dispatch({
                        type: SEND_TRANSFER_INFORMATION_SUCCESS,
                        // idTransaction: res.data.data.created_verification._id,
                        messageSuccess: res.data.message
                    });
                    dispatch({
                        type: RESET_MESSAGE
                    })
                }
                else {
                    dispatch({
                        type: SEND_TRANSFER_INFORMATION_FAIL,
                        messageError: res.data.message
                    });
                    dispatch({
                        type: RESET_MESSAGE
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}
const sendTransferInformationForegin = (data, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: SEND_TRANSFER_INFORMATION
        });
        console.log('data3456:', data)
        return callApi(`api/partner-bank/send-money`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                console.log('res Tranfer Money:', res.data.message)
                if (!res.data.errors) {
                    let decoded = jwt(accessToken);
                    console.log('data Transfer:', data);
                    let date = moment(Date.now()).format("DD/MM/YYYY hh:mm a")
                    pushNotificationFireBase(`You has been debited ${data.money} VNĐ success on ${date} to ${data.credit_number} in bank ${data.idBank}`, decoded.walletId);
                    dispatch({
                        type: TOGGLE_MODAL_TRANSFER,
                    });
                    dispatch({
                        type: SEND_TRANSFER_INFORMATION_SUCCESS,
                        // idTransaction: res.data.data.created_verification._id,
                        messageSuccess: res.data.message
                    });
                    dispatch({
                        type: RESET_MESSAGE
                    })
                }
                else {
                    dispatch({
                        type: SEND_TRANSFER_INFORMATION_FAIL,
                        messageError: res.data.message
                    });
                    dispatch({
                        type: RESET_MESSAGE
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}
const getOTP = (email, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: GET_OTP
        });

        return callApi(`api/users/getOTP`, 'POST', { email, accessToken }, { x_accessToken: accessToken })
            .then(res => {
                console.log('resOTP:', res)
                if (!res.data.errors) {
                    dispatch({
                        type: GET_OTP_SUCCESS,
                        messageSuccess: res.data.message
                    });

                    dispatch({
                        type: GET_OTP_SUCCESS,
                        messageSuccess: ''
                    });

                }
                else {
                    dispatch({
                        type: GET_OTP_FAIL,
                        messageError: res.data.message
                    });
                    dispatch({
                        type: RESET_MESSAGE
                    })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: GET_OTP_FAIL,
                    messageError: "Can't send OTP it may cause from server"
                });
                dispatch({
                    type: RESET_MESSAGE
                })
            })
    }
}

const toggleModalTransfer = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_TRANSFER,
        });
    }
}
const toggleModalAddRecipient = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_ADD_RECIPIENT,

        });
    }
}
const setBalance = (balance) => {
    return (dispatch) => {
        dispatch({
            type: SET_BALANCE,
            balance
        });
    }
}
const setValuesTranfer = (values) => {
    return (dispatch) => {
        dispatch({
            type: SET_VALUES_TRANFER,
            values
        });
    }
}

const resetStore = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_STORE
        })
    }
}

export {
    fetchUserWallets,
    fetchRecipientsLocal,
    fetchRecipientsForeign,
    sendTransferInformation,
    sendTransferInformationForegin,
    getOTP,
    toggleModalTransfer,
    trackRecipientLocal,
    trackRecipientForeign,
    toggleModalAddRecipient,
    setBalance,
    setValuesTranfer,
    resetStore
}