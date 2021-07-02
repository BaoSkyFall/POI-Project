import {
    FETCH_GET_DEBT_REMINDER,
    FETCH_GET_DEBT_REMINDER_SUCCESS,
    FETCH_GET_DEBT_REMINDER_FAIL,
    FETCH_TRANFER_MONEY_DEBT,
    FETCH_TRANFER_MONEY_DEBT_SUCCESS,
    FETCH_TRANFER_MONEY_DEBT_FAIL,
    FETCH_GET_DEBT_OWNER,
    FETCH_GET_DEBT_OWNER_SUCCESS,
    FETCH_GET_DEBT_OWNER_FAIL,
    GET_NAME_BY_WALLET_ID,
    GET_NAME_BY_WALLET_ID_SUCCESS,
    GET_NAME_BY_WALLET_ID_FAIL,
    ADD_DEBT_REMINDER,
    ADD_DEBT_REMINDER_SUCCESS,
    ADD_DEBT_REMINDER_FAIL,
    DELETE_DEBT_OWNER,
    DELETE_DEBT_OWNER_SUCCESS,
    DELETE_DEBT_OWNER_FAIL,
    SHOW_ADD_MODAL,
    HANDLE_CANCEL_MODAL,
    SHOW_PAY_DEBT_MODAL,
    HANDLE_CANCEL_PAY_DEBT_MODAL

} from '../../constants/customer/debt-reminder';
const initialState = {
    debtReminders: [],
    debtOwner: [],
    userWallet: [],
    messageSuccess: '',
    messageError: '',
    name: '',
    walletId: '',
    idDebtor: '',
    data: null,
    isLoading: false,
    messageSuccessOTP:'',
    visible: false,
    visiblePayDebt: false,
    confirmLoading: false,
    isAction: false,
    debtorModal: null,

};
export default function debtReminderReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GET_DEBT_REMINDER: {
            return {
                ...state,
                isLoading: true,

                name: '',
                idDebtor: ''
            }
        }
        case FETCH_GET_DEBT_REMINDER_SUCCESS: {
            return {
                ...state,
                debtReminders: action.debtReminders,
                isLoading: false,
                isAction: false,
                name: '',
                idDebtor: ''

            }
        }
        case FETCH_GET_DEBT_REMINDER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,
                isAction: false

            }
        }
        case FETCH_TRANFER_MONEY_DEBT: {
            return {
                ...state,
                messageError:'',
                messageSuccess:'',
                messageSuccessOTP:''
                // isLoading:true
            }
        }
        case FETCH_TRANFER_MONEY_DEBT_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                isLoading: false,
                isAction: false,
                name: '',
                idDebtor: '',
                data: null

            }
        }
        case FETCH_TRANFER_MONEY_DEBT_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case FETCH_GET_DEBT_OWNER: {
            return {
                ...state,
                name: '',
                idDebtor: ''
                // isLoading:true
            }
        }
        case FETCH_GET_DEBT_OWNER_SUCCESS: {
            return {
                ...state,
                debtOwner: action.debtOwner,
                isLoading: false,
                isAction: false,
                name: '',
                idDebtor: ''
            }
        }
        case FETCH_GET_DEBT_OWNER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case ADD_DEBT_REMINDER: {
            return {
                ...state,
                isAction: true,
                // isLoading:true
            }
        }
        case ADD_DEBT_REMINDER_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                isLoading: false,
                isAction: true,

            }
        }
        case ADD_DEBT_REMINDER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case DELETE_DEBT_OWNER: {
            return {
                ...state,
                // isLoading:true
            }
        }
        case DELETE_DEBT_OWNER_SUCCESS: {
            return {
                ...state,
                // messageSuccess: action.messageSuccess,
                isLoading: false,
                isAction: true

            }
        }
        case DELETE_DEBT_OWNER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }

        case GET_NAME_BY_WALLET_ID: {
            return {
                ...state,
                // isLoading:true
            }
        }
        case GET_NAME_BY_WALLET_ID_SUCCESS: {
            return {
                ...state,
                // messageSuccess: action.messageSuccess,
                isLoading: false,
                messageError: '',
                // isAction:false,
                name: action.name,
                idDebtor: action.id

            }
        }
        case GET_NAME_BY_WALLET_ID_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,
                name: ''
            }
        }


        case SHOW_ADD_MODAL: {
            return {
                ...state,
                visible: true,
                name: '',
                walletId: '',
                isLoading: false,
                confirmLoading: false,
                isAction: false,
                debtorModal: null,
                messageSuccess: '',
                messageError: '',
            }
        }
        case HANDLE_CANCEL_MODAL: {
            return {
                ...state,
                visible: false,
                name: '',
                walletId: '',
                isLoading: false,
                confirmLoading: false,
                isAction: false,
                debtorModal: null,
                messageSuccess: '',
                messageError: '',
            }
        }
        case SHOW_PAY_DEBT_MODAL: {
            return {
                ...state,
                visiblePayDebt:true,
                messageSuccessOTP:'',
                data: action.data
            }

        }
        case HANDLE_CANCEL_PAY_DEBT_MODAL: {
            return {
                ...state,
                visiblePayDebt:false,
                messageError:'',
                messageSuccess:'',
                messageSuccessOTP:'',
                data:null,

            }
        }
        default:
            return state;
    }
}