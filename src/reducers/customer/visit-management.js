import {
    FETCH_ALL_VISIT,
    FETCH_ALL_VISIT_SUCCESS,
    FETCH_ALL_VISIT_FAIL,
    UPDATE_VISIT,
    UPDATE_VISIT_SUCCESS,
    UPDATE_VISIT_FAIL,
    ADD_VISIT,
    ADD_VISIT_SUCCESS,
    ADD_VISIT_FAIL,
    DELETE_VISIT,
    DELETE_VISIT_SUCCESS,
    DELETE_VISIT_FAIL,
    RESET_STORE
} from '../../constants/customer/visit-management';

const initialState = {
    listVisit: [],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function visitManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_VISIT: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_VISIT_SUCCESS: {
            return {
                ...state,
                listVisit: action.listVisit,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_VISIT_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_VISIT: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_VISIT_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_VISIT_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_VISIT: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_VISIT_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_VISIT_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_VISIT: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_VISIT_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_VISIT_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageError: '',
                messageSuccess: '',
                isAction: false,
            }
        }
        default:
            return state;
    }
}
