import {
    FETCH_USER_WALLETS,
    FETCH_USER_WALLETS_SUCCESS,
    FETCH_USER_WALLETS_FAIL,
    FETCH_RECIPIENTS_LOCAL,
    FETCH_RECIPIENTS_LOCAL_SUCCESS,
    FETCH_RECIPIENTS_LOCAL_FAIL,
    FETCH_RECIPIENTS_FOREIGN,
    FETCH_RECIPIENTS_FOREIGN_SUCCESS,
    FETCH_RECIPIENTS_FOREIGN_FAIL,
    RESET_STORE,
    RESET_MESSAGE,
    SET_BALANCE,
    SET_VALUES_TRANFER,
    SEND_TRANSFER_INFORMATION,
    SEND_TRANSFER_INFORMATION_SUCCESS,
    SEND_TRANSFER_INFORMATION_FAIL,
    GET_OTP,
    GET_OTP_SUCCESS,
    GET_OTP_FAIL,
    TOGGLE_MODAL_TRANSFER,
    TRACK_RECIPIENT_LOCAL,
    TRACK_RECIPIENT_LOCAL_SUCCESS,
    TRACK_RECIPIENT_LOCAL_FAIL,
    TRACK_RECIPIENT_FOREIGN,
    TRACK_RECIPIENT_FOREIGN_SUCCESS,
    TRACK_RECIPIENT_FOREIGN_FAIL,
} from "../../constants/customer/internal-tranfer";

const initialState = {
    userWallets: [],
    recipientsLocal: [],
    recipientsForeign: [],
    idTransaction: '',
    messageSuccess: '',
    balance: null,
    messageError: '',
    values: {},
    isShowModalTransfer: false,
    isLocal: true,
    isLoading: false,
    bankRecipient: '',
    emailRecipient: '',
    fullNameRecipient: '',
    usernameRecipient: '',
    isLocalRecipient: false,
};

export default function internalTransferReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_WALLETS:
            {
                return {
                    ...state,
                    isLoading: true
                }
            }
        case FETCH_RECIPIENTS_LOCAL: {
            return {
                ...state,
                isLoading: true
            }
        }
        case SEND_TRANSFER_INFORMATION: {
            return {
                ...state,
                messageError: '',
                messageSuccess: '',
                isLoading: true
            }
        }
        case TRACK_RECIPIENT_LOCAL: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_OTP: {
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
        case FETCH_RECIPIENTS_LOCAL_SUCCESS: {
            return {
                ...state,
                recipientsLocal: action.recipientsLocal,
                isLoading: false
            }
        }
        case FETCH_RECIPIENTS_FOREIGN_SUCCESS: {
            return {
                ...state,
                recipientsForeign: action.recipientsForeign,
                isLoading: false
            }
        }
        case SEND_TRANSFER_INFORMATION_SUCCESS: {
            return {
                ...state,
                idTransaction: action.idTransaction,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false
            }
        }
        case TRACK_RECIPIENT_LOCAL_SUCCESS: {

            return {
                ...state,
                emailRecipient: action.emailRecipient,
                fullNameRecipient: action.fullNameRecipient,
                usernameRecipient: action.usernameRecipient,
                isLocalRecipient: action.isLocalRecipient,
                bankRecipient: action.bankRecipient ? action.bankRecipient : 'BBD Bank',
                isLoading: false
            }
        }
        case SET_BALANCE: {
            return {
                ...state,
                balance: action.balance
            }
        }
        case SET_VALUES_TRANFER: {
            return {
                ...state,
                values: action.values
            }
        }
        case TRACK_RECIPIENT_FOREIGN_SUCCESS: {

            return {
                ...state,
                fullNameRecipient: action.fullNameRecipient,
                bankRecipient: action.bankRecipient ? action.bankRecipient : 'BBD Bank',
                isLoading: false
            }
        }
        case TRACK_RECIPIENT_FOREIGN_FAIL: {

            return {
                ...state,
                messageError: action.messageError
            }
        }

        case GET_OTP_SUCCESS: {
            console.log('action GET OTP SUCCESS:', action)
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false
            }
        }
        case FETCH_USER_WALLETS_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case FETCH_RECIPIENTS_LOCAL_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case SEND_TRANSFER_INFORMATION_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageSuccess,
                isLoading: false
            }
        }
        case GET_OTP_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                messageSuccess: '',
                isLoading: false
            }
        }
        case RESET_MESSAGE: {
            return {
                ...state,
                messageSuccess: '',
                messageError: '',
            }
        }
   
        case RESET_STORE: {
            return {
                ...state,
                isLocal: !state.isLocal,
                idTransaction: '',

                isShowModalTransfer: false,
                isLoading: false,
                bankRecipient: '',
                emailRecipient: '',
                fullNameRecipient: ''
            }
        }
        case TOGGLE_MODAL_TRANSFER: {
            return {
                ...state,
                isShowModalTransfer: !state.isShowModalTransfer
            }
        }
        default:
            return state;
    }
}
