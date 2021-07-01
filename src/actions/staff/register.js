import * as Types from './../../constants/ActionTypes';
import callApi from './../../utils/callApi';


// Register Account User
export const actRegisterUserRequest = (data, accessToken) => {
    console.log(data)
    console.log(accessToken)
    return (dispatch) => {
        dispatch(actRegisterUser());
        return callApi(`register`, 'POST', data, {x_accessToken: accessToken})
            .then(res => {
                if (res.status === 200) {
                    dispatch(actRegisterSuccess());
                }
                else{
                    dispatch(actRegisterFail("Error: Email is existed!"));
                }
            })
            .catch((err) => {
                dispatch(actRegisterFail("Error: Sever Error"));
            })
    }
}


export const actRegisterSuccess = () => {
    return {
        type: Types.CREATE_ACCOUNT_SUCCESS
    }
}

export const actRegisterFail = (massageError) => {
    return {
        type: Types.CREATE_ACCOUNT_FAIL,
        massageError
    }
}

export const actRegisterUser = () => {
    return {
        type: Types.CREATE_ACCOUNT,
    }
}

export const actResetStatusRegisterAcount = () => {
    return {
        type: Types.CREATE_ACCOUNT_RESET_STATUS,
    }
}