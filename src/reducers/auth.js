import {
    DO_SIGNIN,
    DO_SIGNIN_SUCCESS,
    DO_SIGNIN_FAIL,
    RESET_STATUS,
    VERIFY_ACCESSTOKEN_SUCCESS,
    VERIFY_ACCESSTOKEN_FAIL
} from '../constants/auth';

const initialState = {
    signinSuccess: false,
    messageError: '',
    email: '',
    role: '',
    isLoading: false
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case DO_SIGNIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case DO_SIGNIN_SUCCESS: {
            return {
                ...state,
                signinSuccess: action.signinSuccess,
                isLoading: false
            }
        }
        case DO_SIGNIN_FAIL:
        case VERIFY_ACCESSTOKEN_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false
            }
        }
        case VERIFY_ACCESSTOKEN_SUCCESS: {
            return {
                ...state,
                email: action.email,
                role: action.role
            }
        }
        case RESET_STATUS: {
            return {
                ...state,
                signinSuccess: false,
                messageError: ''
            }
        }
        default: 
            return state;
    }
}