import { 
    FETCH_USER_WALLETS, 
    FETCH_USER_WALLETS_SUCCESS, 
    FETCH_USER_WALLETS_FAIL,
    FETCH_RECIPIENTS,
    FETCH_RECIPIENTS_SUCCESS,
    FETCH_RECIPIENTS_FAIL,
    RESET_STORE, 
    SEND_TRANSFER_INFORMATION,
    SEND_TRANSFER_INFORMATION_SUCCESS,
    SEND_TRANSFER_INFORMATION_FAIL,
    VERIFY_TRANSACTION,
    VERIFY_TRANSACTION_SUCCESS,
    VERIFY_TRANSACTION_FAIL,
    TOGGLE_MODAL_TRANSFER,
    TRACK_RECIPIENT,
    TRACK_RECIPIENT_SUCCESS,
} from "../../constants/customer/internal-transfer";

const initialState = {
    userWallets: [],
    recipients: [],
    idTransaction: '',
    messageSuccess: '',
    messageError: '',
    isShowModalTransfer: false,
    isLoading: false,
    emailRecipient: '',
    fullNameRecipient: ''
};

export default function internalTransferReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_WALLETS: 
        case FETCH_RECIPIENTS: 
        case SEND_TRANSFER_INFORMATION: 
        case TRACK_RECIPIENT:
        case VERIFY_TRANSACTION: {
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
        case FETCH_RECIPIENTS_SUCCESS: {
            return {
                ...state,
                recipients: action.recipients,
                isLoading: false
            }
        }
        case SEND_TRANSFER_INFORMATION_SUCCESS: {
            return {
                ...state,
                idTransaction: action.idTransaction,
                messageSuccess: action.messageSuccess,
                isLoading: false
            }
        }
        case TRACK_RECIPIENT_SUCCESS: {
            return {
                ...state,
                emailRecipient: action.emailRecipient,
                fullNameRecipient: action.fullNameRecipient,
                isLoading: false
            }
        }
        case VERIFY_TRANSACTION_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                isLoading: false
            }
        }
        case FETCH_USER_WALLETS_FAIL: 
        case FETCH_RECIPIENTS_FAIL: 
        case SEND_TRANSFER_INFORMATION_FAIL: 
        case VERIFY_TRANSACTION_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageSuccess: '',
                messageError: '',
                isShowModalTransfer: false
            }
        }
        case TOGGLE_MODAL_TRANSFER: {
            return {
                ...state,
                isShowModalTransfer: action.isShowModalTransfer
            }
        }
        default:
            return state;
    }
}
