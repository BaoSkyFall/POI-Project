import * as Types from '../../constants/ActionTypes';
import callApi from '../../ultis/callApi';



export const actRechargeRequest = (data, accessToken) => {
    console.log(data)
    return (dispatch) => {
        dispatch(actRecharge());
        console.log('data123124124124:', data)
        return callApi(`api/money/addMoney`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('data: recharge', data)
                    dispatch(actRechargeSuccess(data));
                }
                else {
                    dispatch(actRechargeFail())
                }
            })
            .catch(err => {
                dispatch(actRechargeFail());
            })
    }
}


export const actRecharge = () => {
    return {
        type: Types.UPDATE_BALANCE
    }
}

export const actRechargeSuccess = (data) => {
    return {
        type: Types.UPDATE_BALANCE_SUCCESS,
        data
    }
}

export const actRechargeFail = () => {
    return {
        type: Types.UPDATE_BALANCE_FAIL
    }
}

export const actRechargeReset = () => {
    return {
        type: Types.UPDATE_BALANCE_RESET_STATUS
    }
}


// Search User By ID
export const actSearchAccountRequest = (id, accessToken) => {
    return (dispatch) => {
        dispatch(actResetStatus());
        return callApi(`api/staff/getInfoUserByWalletId/${id}`, 'GET', null, { x_accessToken: accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log("res: ",res)
                    dispatch(actSearchAccount(res.data.data[0]))
                } else {
                    dispatch(actSearchAccountFail())
                }
            })
            .catch((err) => {
                dispatch(actSearchAccountFail())
            })
    }
}

export const actResetStatus = () => {
    return {
        type: Types.RESET_ACCOUNT_PAYMENT_STATUS
    }
}

export const actSearchAccountFail = () => {
    return {
        type: Types.SEARCH_ACCOUNT_PAYMENT_FAIL
    }
}

export const actSearchAccount = (account) => {
    return {
        type: Types.SEARCH_ACCOUNT_PAYMENT,
        account
    }
}

export const actResetStatusRecharge = () => {
    return {
        type: Types.SEARCH_USERNAME_RECHARGE_RESET
    }
}
