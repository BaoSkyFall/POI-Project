import * as Types from '../../constants/ActionTypes';
import callApi from '../../utils/callApi';



export const actRechargeRequest = (data, accessToken) => {
    console.log(data)
    return (dispatch) => {
        dispatch(actRecharge());
        return callApi(`wallet/recharge`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                if (res.status === 200) {
                    dispatch(actRechargeSuccess());
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

export const actRechargeSuccess = () => {
    return {
        type: Types.UPDATE_BALANCE_SUCCESS
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
        return callApi(`wallet/recharge/${id}`, 'GET', null, { x_accessToken: accessToken })
            .then(res => {
                if (res.status === 200) {
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
