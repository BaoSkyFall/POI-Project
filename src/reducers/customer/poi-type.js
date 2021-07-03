import {
    FETCH_ALL_POI_TYPE,
    FETCH_ALL_POI_TYPE_SUCCESS,
    FETCH_ALL_POI_TYPE_FAIL,
    UPDATE_POI_TYPE,
    UPDATE_POI_TYPE_SUCCESS,
    UPDATE_POI_TYPE_FAIL,
    ADD_POI_TYPE,
    ADD_POI_TYPE_SUCCESS,
    ADD_POI_TYPE_FAIL,
    DELETE_POI_TYPE,
    DELETE_POI_TYPE_SUCCESS,
    DELETE_POI_TYPE_FAIL,
    RESET_STORE
} from '../../constants/customer/poi-type';

const initialState = {
    listPOIType: [],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function poiTypeManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_POI_TYPE: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_POI_TYPE_SUCCESS: {
            return {
                ...state,
                listPOIType: action.listPOIType,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_POI_TYPE_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_POI_TYPE: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_POI_TYPE_SUCCESS: {
            return {
                ...state,
                listPOIType: action.listPOIType,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_POI_TYPE_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_POI_TYPE: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_POI_TYPE_SUCCESS: {
            return {
                ...state,
                listPOIType: action.listPOIType,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_POI_TYPE_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_POI_TYPE: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_POI_TYPE_SUCCESS: {
            return {
                ...state,
                listPOIType: action.listPOIType,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_POI_TYPE_FAIL: {
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
