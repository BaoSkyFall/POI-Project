import * as Types from '../../constants/ActionTypes';

var initialState = {
    isSearching: false,
    isSearchIdSuccess: false,
    isSearchIdFail: false,
    isUpdateFail: false,
    isUpdateSuccess: false,
    isUpdateLoading: false,
    name: '',
    identityNumber: '',
    balance: '',
    walletNumber: '',
    amount: '',
    username: ''
}

const rechargeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_ACCOUNT_PAYMENT:
            return {
                ...state,
                isSearchIdSuccess: true,
                isSearchIdFail: false,
                isSearching: false,
                name: action.account.name,
                identityNumber: action.account.identityNumber,
                balance: action.account.balance,
                walletNumber: action.account.walletNumber,
                username: action.account.username,
                amount: ''

            };
        case Types.RESET_ACCOUNT_PAYMENT_STATUS:
            return {
                isSearchIdSuccess: false,
                isSearchIdFail: false,
                isSearching: true,
                name: '',
                identityNumber: '',
                balance: '',
                walletNumber: '',
                username: '',
                amount: ''
            }
        case Types.SEARCH_ACCOUNT_PAYMENT_FAIL:
            return {
                isSearchIdSuccess: false,
                isSearchIdFail: true,
                isSearching: false,
                name: '',
                identityNumber: '',
                balance: '',
                walletNumber: '',
                username: ''
            };
        case Types.SEARCH_USERNAME_RECHARGE_RESET:
            return {
                isSearchIdSuccess: false,
                isSearchIdFail: false,
                isSearching: false,

            };
        case Types.UPDATE_BALANCE:
            return {
                ...state,
                isUpdateSuccess: false,
                isUpdateLoading: true,
                isUpdateFail: false,
                amount: ''
            };
        case Types.UPDATE_BALANCE_SUCCESS:
            {


                return {
                    ...state,
                    isUpdateSuccess: true,
                    isUpdateFail: false,
                    isUpdateLoading: false,
                    balance: parseInt(state.balance) + parseInt(action.data.money),
                    amount: ''
                };
            }

        case Types.UPDATE_BALANCE_FAIL:
            return {
                ...state,
                isUpdateSuccess: false,
                isUpdateFail: true,
                isUpdateLoading: false,
                amount: ''
            }
        case Types.UPDATE_BALANCE_RESET_STATUS:
            return {
                ...state,
                isUpdateSuccess: false,
                isUpdateFail: false,
                isUpdateLoading: false,
                walletNumber:null,
                amount: ''
            }
        default:
            return { ...state };
    }
}

export default rechargeReducer;
