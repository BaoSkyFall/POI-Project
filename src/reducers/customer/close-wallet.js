import {
    FETCH_USER_WALLETS,
    FETCH_USER_WALLETS_SUCCESS,
    FETCH_USER_WALLETS_FAIL,
    CLOSE_USER_WALLET,
    CLOSE_USER_WALLET_SUCCESS,
    CLOSE_USER_WALLET_FAIL,
    RESET_STORE
} from '../../constants/customer/close-wallet';

const initialState = {
    userWallets: [],
    messageSuccess: '',
    messageError: '',
    isLoading: false,
};

export default function closeWalletReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_WALLETS: 
        case CLOSE_USER_WALLET: {
            return {
                ...state,
                isLoading: true
            }
        }
        case FETCH_USER_WALLETS_SUCCESS: {
            return {
                ...state,
                userWallets: action.userWallets,
                messageError: '',
                isLoading: false
            }
        }
        case CLOSE_USER_WALLET_SUCCESS: {
            return {
                ...state,
                userWallets: action.userWallets,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
            }
        }
        case FETCH_USER_WALLETS_FAIL:
        case CLOSE_USER_WALLET_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageSuccess: '',
                messageError: ''
            }
        }
        default:
            return state;
    }
}
