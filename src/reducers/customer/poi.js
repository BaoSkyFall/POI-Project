import {
    FETCH_ALL_POI,
    FETCH_ALL_POI_SUCCESS,
    FETCH_ALL_POI_FAIL,
    UPDATE_POI,
    UPDATE_POI_SUCCESS,
    UPDATE_POI_FAIL,
    ADD_POI,
    ADD_POI_SUCCESS,
    ADD_POI_FAIL,
    DELETE_POI,
    DELETE_POI_SUCCESS,
    DELETE_POI_FAIL,
    ACTIVE_POI,
    ACTIVE_POI_SUCCESS,
    ACTIVE_POI_FAIL,
    RESET_STORE
} from '../../constants/customer/poi';

const initialState = {
    listPOI: [],
    total: 10,
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function poiManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_POI: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_POI_SUCCESS: {
            return {
                ...state,
                listPOI: action.listPOI,
                total:action.total,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_POI_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_POI: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_POI_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_POI_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_POI: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_POI_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_POI_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_POI: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_POI_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_POI_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case ACTIVE_POI: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ACTIVE_POI_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case ACTIVE_POI_FAIL: {
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
