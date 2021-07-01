import * as Types from '../../constants/ActionTypes';

var initialState = {
    isSearchFailed: false,
    isSearchLoading: false,
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    walletNumber:'',
    massageError: ''
}

const paymentAccount = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_USERNAME:
            state = action.user
            return {
                ...state,
                isSearchLoading: false,
                isSearchFailed: false
            };
        case Types.SEARCH_USERNAME_FAIL:
            return {
                ...state,
                isSearchLoading: false,
                isSearchFailed: true
            };
        case Types.SEARCH_USERNAME_LOADING:
            return {
                ...state,
                isSearchLoading: true,
                isSearchFailed: false
            };
        case Types.SEARCH_USERNAME_RESET:
            return{
                isLoading: false,
                isSuccess: false,
                isFailed: false
            };
        case Types.CREATE_PAYMENT_ACCOUNT:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isFailed: false
            };
        case Types.CREATE_PAYMENT_ACCOUNT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                walletNumber: action.walletNumber
            }
        case Types.CREATE_PAYMENT_ACCOUNT_FAIL:
            return {
                ...state,
                isFailed: true,
                isLoading: false,
                massageError: action.massageError
            }
        default: return { ...state };
    }
}

export default paymentAccount;
