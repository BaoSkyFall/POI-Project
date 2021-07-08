import {
    FETCH_ALL_DESTINATION_TYPE,
    FETCH_ALL_DESTINATION_TYPE_SUCCESS,
    FETCH_ALL_DESTINATION_TYPE_FAIL,
    UPDATE_DESTINATION_TYPE,
    UPDATE_DESTINATION_TYPE_SUCCESS,
    UPDATE_DESTINATION_TYPE_FAIL,
    ADD_DESTINATION_TYPE,
    ADD_DESTINATION_TYPE_SUCCESS,
    ADD_DESTINATION_TYPE_FAIL,
    DELETE_DESTINATION_TYPE,
    DELETE_DESTINATION_TYPE_SUCCESS,
    DELETE_DESTINATION_TYPE_FAIL,
    RESET_STORE
} from '../../constants/customer/destination-type-management';

const initialState = {
    listDestinationType: [],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function destinationTypeManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_DESTINATION_TYPE: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_DESTINATION_TYPE_SUCCESS: {
            return {
                ...state,
                listDestinationType: action.listDestinationType,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_DESTINATION_TYPE_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_DESTINATION_TYPE: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_DESTINATION_TYPE_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_DESTINATION_TYPE_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_DESTINATION_TYPE: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_DESTINATION_TYPE_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_DESTINATION_TYPE_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_DESTINATION_TYPE: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_DESTINATION_TYPE_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_DESTINATION_TYPE_FAIL: {
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
