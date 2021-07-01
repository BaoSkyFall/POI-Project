import {
    FETCH_PAYMENT_ACCOUNTS,
    FETCH_PAYMENT_ACCOUNTS_SUCCESS,
    FETCH_PAYMENT_ACCOUNTS_FAIL,
    TOGGLE_MODAL,
    RESET_STORE
} from '../../constants/customer/payment-accounts';

const initialState = {
    paymentAccounts: [],
    messageError: '',
    isLoading: false
};

export default function paymentAccountsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PAYMENT_ACCOUNTS: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FETCH_PAYMENT_ACCOUNTS_SUCCESS: {
            return {
                ...state,
                paymentAccounts: action.paymentAccounts,
                isLoading: false
            }
        }
        case FETCH_PAYMENT_ACCOUNTS_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                isLoading: false,
                messageError: '',
                isShowModal: false
            }
        }
        case TOGGLE_MODAL: {
            return {
                ...state,
                isShowModal: action.isShowModal
            }
        }
        default:
            return state;
    }
}
