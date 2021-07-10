import {
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    RESET_STORE
} from '../../constants/customer/users-management';

const initialState = {
    listUsers: [],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function userManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_USERS: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_USERS_SUCCESS: {
            return {
                ...state,
                listUsers: action.listUsers,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_USERS_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_USER_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_USER: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_USER_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_USER_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_USER: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_USER_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_USER_FAIL: {
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
