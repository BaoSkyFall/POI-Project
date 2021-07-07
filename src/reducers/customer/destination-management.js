import {
    FETCH_ALL_DESTINATION,
    FETCH_ALL_DESTINATION_SUCCESS,
    FETCH_ALL_DESTINATION_FAIL,
    FETCH_ALL_PROVINCE,
    FETCH_ALL_PROVINCE_SUCCESS,
    FETCH_ALL_PROVINCE_FAIL,
    UPDATE_DESTINATION,
    UPDATE_DESTINATION_SUCCESS,
    UPDATE_DESTINATION_FAIL,
    ADD_DESTINATION,
    ADD_DESTINATION_SUCCESS,
    ADD_DESTINATION_FAIL,
    DELETE_DESTINATION,
    DELETE_DESTINATION_SUCCESS,
    DELETE_DESTINATION_FAIL,
    RESET_STORE
} from '../../constants/customer/destination-management';

const initialState = {
    listDestination: [],
    listProvince:[],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function destinationManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_DESTINATION: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_DESTINATION_SUCCESS: {
            return {
                ...state,
                listDestination: action.listDestination,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_DESTINATION_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_PROVINCE: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_PROVINCE_SUCCESS: {
            return {
                ...state,
                listProvince: action.listProvince,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_PROVINCE_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        
        case UPDATE_DESTINATION: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_DESTINATION_SUCCESS: {
            return {
                ...state,
                listDestination: action.listDestination,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_DESTINATION_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_DESTINATION: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_DESTINATION_SUCCESS: {
            return {
                ...state,
                listDestination: action.listDestination,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_DESTINATION_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_DESTINATION: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_DESTINATION_SUCCESS: {
            return {
                ...state,
                listDestination: action.listDestination,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_DESTINATION_FAIL: {
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
