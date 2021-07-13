import * as Types from '../../constants/ActionTypes';

var initialState = {
    isSearchFailed: false,
    isSearchLoading: false,
    isSearchSuccess:false,
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    username:'',
    name:'',
    email:'',
    phone:'',
    idenityNumber:'',
    dob:'',
    walletNumber:'',
    balance:'',
    messageError: '',
    transactionHistory:null
}

const paymentAccount = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_USERNAME:
            console.log('action:', action)
            
            return {
                ...state,
                isSearchLoading: false,
                isSearchFailed: false,
                isSearchSuccess:true,
                walletNumber: action.user.walletNumber,
                email: action.user.email,
                username: action.user.username,
                name: action.user.name,
                phone: action.user.phone,
                idenityNumber: action.user.idenityNumber,
                dob: action.user.dob,
                balance: action.user.balance,
                



            };
        case Types.SEARCH_USERNAME_FAIL:
            return {
                ...state,
                isSearchLoading: false,
                isSearchFailed: true,
                 walletNumber: '',
                email: '',
                username: '',
                name: '',
                phone: '',
                idenityNumber: '',
                dob: '',
                balance: '',
            };
        case Types.SEARCH_USERNAME_LOADING:
            return {
                ...state,
                isSearchLoading: true,
                isSearchFailed: false
            };
        case Types.SEARCH_USERNAME_RESET:
            return{
                ...state,
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
                messageError: action.messageError
            }
            case Types.FETCH_TRANSACTION_HISTORY_LOCAL:
                return {
                    ...state,
                    isLoading: true,
                    isSuccess: false,
                    isFailed: false
                };
            case Types.FETCH_TRANSACTION_HISTORY_LOCAL_SUCCESS:
                return {
                    ...state,
                    isSuccess: true,
                    isLoading: false,
                    transactionHistory: action.transactionHistory
                }
            case Types.FETCH_TRANSACTION_HISTORY_LOCAL_FAIL:
                return {
                    ...state,
                    isFailed: true,
                    isLoading: false,
                    transactionHistory: null
                }
        default: return { ...state };
    }
}

export default paymentAccount;
