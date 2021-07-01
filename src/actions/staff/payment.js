import * as Types from '../../constants/ActionTypes';
import callApi from '../../utils/callApi';


export const actRegisterPaymentRequest = (data, accessToken) => {

    return (dispatch) => {
        dispatch(actRegisterPayment());
        return callApi(`wallet/create`, 'POST', data, {x_accessToken: accessToken})
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data.data)
                    dispatch(actRegisterSuccess(res.data.data.data.walletNumber));
                    
                }
                else{
                    dispatch(actRegisterFail("Error: Register Failed!!!"));
                }
            })
            .catch(err => {
                dispatch(actRegisterFail("Error: Register Failed!!!"));
            })
    }
}

export const actRegisterSuccess = (walletNumber) => {
    return {
        type: Types.CREATE_PAYMENT_ACCOUNT_SUCCESS,
        walletNumber
    }
}

export const actRegisterFail = (massageError) => {
    return {
        type: Types.CREATE_PAYMENT_ACCOUNT_FAIL,
        massageError
    }
}

export const actRegisterPayment = () => {
    return {
        type: Types.CREATE_PAYMENT_ACCOUNT
    }
}




// export const actSearchUserRequest = (email, accessToken) => {
//     return (dispatch) => {
//         dispatch(actSearchUserLoading());
//         return callApi(`staff/payment/${email}`, 'GET', null, {x_accessToken: accessToken})
//             .then(res => {
//                 if (res.status === 200) {
//                     var accountNumber = Math.random().toString().substring(3, 13);
//                     var dt = { ...res.data.data[0], "accountNumber": accountNumber };
//                     dispatch(actSearchUser(dt));
//                 }else{
//                     dispatch(actSearchUserFail());
//                 }
//             })
//             .catch((err) => {
//                 dispatch(actSearchUserFail());
//             })
//     }
// }

export const actSearchUserRequest = (email, accessToken) => {
    return (dispatch) => {
        dispatch(actSearchUserLoading());
        return callApi(`user?email=${email}`, 'GET', null, {x_accessToken: accessToken})
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    var dt = { ...res.data.data };
                    dispatch(actSearchUser(dt));
                }else{
                    dispatch(actSearchUserFail());
                }
            })
            .catch((err) => {
                dispatch(actSearchUserFail());
            })
    }
}



export const actSearchUser = (user) => {
    return {
        type: Types.SEARCH_USERNAME,
        user
    }
}

export const actSearchUserLoading = () => {
    return {
        type: Types.SEARCH_USERNAME_LOADING
    }
}

export const actSearchUserFail = () => {
    return {
        type: Types.SEARCH_USERNAME_FAIL
    }
}

export const actSearchUserReset = () => {
    return {
        type: Types.SEARCH_USERNAME_RESET
    }
}