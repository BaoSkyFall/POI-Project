import * as Types from './../constants/ActionTypes';
import callApi from '../utils/callApi';


// Register Account User
export const actRegisterUserRequest = (data)=>{
    return (dispatch)=>{
        return callApi(`staff/register`, 'POST', data)
        .then(res=>{
            dispatch(actRegisterUser());
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const actRegisterUser = ()=>{
    return {
        type: Types.CREATE_ACCOUNT,
    }
}

// Search User By Username
export const actSearchUserRequest = (username) =>{
    return (dispatch)=>{
        return callApi(`staff/payment/${username}`,'GET', null)
        .then(res=>{
            dispatch(actSearchUser(res.data.data[0]))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const actSearchUser = (user)=>{
    return {
        type: Types.SEARCH_USERNAME,
        user
    }
}


// Create Payment Account
export const actRegisterPaymentRequest = (data)=>{
    console.log(data)
    return (dispatch)=>{
        return callApi(`staff/payment/register`, 'POST', data)
        .then(res => {
            dispatch(actRegisterPayment());
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export const actRegisterPayment = ()=>{
    return{
        type: Types.CREATE_PAYMENT_ACCOUNT
    }
}




