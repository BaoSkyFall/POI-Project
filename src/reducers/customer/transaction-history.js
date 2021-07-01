import {
    FETCH_TRANSACTION_HISTORY,
    FETCH_TRANSACTION_HISTORY_SUCCESS,
    FETCH_TRANSACTION_HISTORY_FAIL,
    RESET_STORE
} from '../../constants/customer/transaction-history';

const initialState = {
    transactionHistory: [],
    messageError: '',
    isLoading: false
};

export default function transactionHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FETCH_TRANSACTION_HISTORY_SUCCESS: {
            return {
                ...state,
                transactionHistory: action.transactionHistory,
                isLoading: false
            }
        }
        case FETCH_TRANSACTION_HISTORY_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageError: ''
            }
        }
        default:
            return state;
    }
}
