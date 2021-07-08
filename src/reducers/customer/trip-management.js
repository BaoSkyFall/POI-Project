import {
    FETCH_ALL_TRIP,
    FETCH_ALL_TRIP_SUCCESS,
    FETCH_ALL_TRIP_FAIL,
    UPDATE_TRIP,
    UPDATE_TRIP_SUCCESS,
    UPDATE_TRIP_FAIL,
    ADD_TRIP,
    ADD_TRIP_SUCCESS,
    ADD_TRIP_FAIL,
    DELETE_TRIP,
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAIL,
    RESET_STORE
} from '../../constants/customer/trip-management';

const initialState = {
    listTrip: [],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function tripManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_TRIP: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_TRIP_SUCCESS: {
            return {
                ...state,
                listTrip: action.listTrip,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_TRIP_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_TRIP: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_TRIP_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_TRIP_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_TRIP: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_TRIP_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_TRIP_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_TRIP: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_TRIP_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_TRIP_FAIL: {
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
