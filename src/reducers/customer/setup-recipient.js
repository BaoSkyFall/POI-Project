import {
    FETCH_RECIPIENTS,
    FETCH_RECIPIENTS_SUCCESS,
    FETCH_RECIPIENTS_FAIL,
    UPDATE_RECIPIENT,
    UPDATE_RECIPIENT_SUCCESS,
    UPDATE_RECIPIENT_FAIL,
    DELETE_RECIPIENT,
    DELETE_RECIPIENT_SUCCESS,
    DELETE_RECIPIENT_FAIL,
    CHANGE_TAB_PANEL,
    RESET_STORE,
    ADD_RECIPIENT,
    ADD_RECIPIENT_SUCCESS,
    ADD_RECIPIENT_FAIL,
    TOGGLE_MODAL_ADD_RECIPIENT
} from '../../constants/customer/setup-recipient';

const initialState = {
    recipients: [],
    isLoading: false,
    isLocalAdd: true,
    messageSuccess: '',
    messageError: '',
    messageSuccessAddModal: '',
    messageErrorAddModal: '',
    statusDeleteRecipient: 0,
    isShowModalAddRecipient: false
};

export default function setupRecipientReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RECIPIENTS:
            {
                return {
                    ...state,
                    isLoading: false
                }
            }
        case UPDATE_RECIPIENT:
        case DELETE_RECIPIENT:
            {
                return {
                    ...state,
                    isLoading: true
                }
            }
        case ADD_RECIPIENT: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FETCH_RECIPIENTS_SUCCESS: {
            return {
                ...state,
                recipients: action.recipients,
                isLoading: false
            }
        }
        case ADD_RECIPIENT_SUCCESS:
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess,
                    isLoading: false
                }
            }
        case UPDATE_RECIPIENT_SUCCESS:
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess,
                    isLoading: false
                }
            }
        case DELETE_RECIPIENT_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                recipients: action.recipients,
                isLoading: false
            }
        }
        case FETCH_RECIPIENTS_FAIL:
        case ADD_RECIPIENT_FAIL:
        case UPDATE_RECIPIENT_FAIL:
        case DELETE_RECIPIENT_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false
            }
        }
        case TOGGLE_MODAL_ADD_RECIPIENT: {
            return {
                ...state,
                messageSuccessAddModal: '',
                messageErrorAddModal: '',
                isShowModalAddRecipient: action.isShowModalAddRecipient,
                isLocalAdd: true
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageSuccess: '',
                messageError: '',
                messageSuccessAddModal: '',
                messageErrorAddModal: '',
                isShowModalAddRecipient: false,
            }
        }
        case CHANGE_TAB_PANEL: {
            return {
                ...state,
                messageErrorAddModal: '',
                messageSuccessAddModal: '',
                isLocalAdd: !state.isLocalAdd
            }
        }
        default:
            return state;
    }
}
