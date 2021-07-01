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
    RESET_STORE,
    ADD_RECIPIENT,
    ADD_RECIPIENT_SUCCESS,
    ADD_RECIPIENT_FAIL,
    TOGGLE_MODAL_ADD_RECIPIENT
} from '../../constants/customer/setup-recipient';

const initialState = {
    recipients: [],
    isLoading: false,
    messageSuccess: '',
    messageError: '',
    statusDeleteRecipient: 0,
    isShowModalAddRecipient: false
};

export default function setupRecipientReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RECIPIENTS: 
        case UPDATE_RECIPIENT: 
        case DELETE_RECIPIENT: 
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
        case UPDATE_RECIPIENT_SUCCESS:
        case DELETE_RECIPIENT_SUCCESS: {
            return {
                ...state,
                recipients: action.recipients,
                messageSuccess: action.messageSuccess,
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
                isShowModalAddRecipient: action.isShowModalAddRecipient
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageSuccess: '',
                messageError: '',
                isShowModalAddRecipient: false
            }
        }
        default:
            return state;
    }
}
