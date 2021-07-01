import {
    DO_SIGNUP,
    DO_SIGNUP_SUCCESS,
    DO_SIGNUP_FAIL,
    DO_SIGNIN,
    DO_SIGNIN_SUCCESS,
    DO_SIGNIN_FAIL,
    RESET_STATUS,
    VERIFY_ACCESSTOKEN_SUCCESS,
    VERIFY_ACCESSTOKEN_FAIL
} from '../constants/auth';
import { URL_SERVER } from '../configs/server';
import {
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    EMAIL_KEY,
} from '../configs/client';
import { useHistory } from "react-router-dom";

const doSignUp = (infoUser) => {
    let history = useHistory();

    return (dispatch) => {
        dispatch({
            type: DO_SIGNUP
        });

        fetch(`${URL_SERVER}/register`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(infoUser)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: DO_SIGNUP_SUCCESS,
                    });
                }
                else {
                    dispatch({
                        type: DO_SIGNUP_FAIL,
                        messageError: res.messageError
                    });
                }
                history.push('/dashboard/destination-management')

            })
            .catch(error => {
                console.log(error);
                history.push('/dashboard/destination-management')

            })

        history.push('/dashboard/destination-management')
    }
}


const doSignIn = (infoUser) => {
    return (dispatch) => {
        dispatch({
            type: DO_SIGNIN
        })

        console.log(infoUser);

        fetch(`${URL_SERVER}/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(infoUser)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
                    localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);

                    dispatch({
                        type: DO_SIGNIN_SUCCESS,
                        signinSuccess: true
                    });
                }
                else {
                    dispatch({
                        type: DO_SIGNIN_FAIL,
                        messageError: res.messageError
                    });
                }
            })
            .catch(error => {
                console.log(error);
                let history = useHistory();
                history.push('/dashboard/destination-management')

            })
    }
}

const verifyAccessToken = (accessToken) => {
    return (dispatch) => {
        fetch(`${URL_SERVER}/user/me`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                x_accesstoken: accessToken
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem(EMAIL_KEY, res.data.email);
                    localStorage.setItem('role', res.data.role);

                    dispatch({
                        type: VERIFY_ACCESSTOKEN_SUCCESS,
                        email: res.data.email,
                        role: res.data.role
                    });
                }
                else {
                    dispatch({
                        type: VERIFY_ACCESSTOKEN_FAIL,
                        messageError: res.messageError
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const resetStatus = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_STATUS
        });
    }
}

export {
    doSignUp,
    doSignIn,
    verifyAccessToken,
    resetStatus
}
