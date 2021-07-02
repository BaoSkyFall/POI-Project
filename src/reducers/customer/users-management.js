import {
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAIL,
    RESET_STORE
} from '../../constants/customer/users-management';

const initialState = {
    listUsers: [],
    messageError: '',
    isLoading: false
};

export default function userManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_USERS: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FETCH_ALL_USERS_SUCCESS: {
            return {
                ...state,
                listUsers: action.listUsers,
                isLoading: false
            }
        }
        case FETCH_ALL_USERS_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false
            }
        }
        case RESET_STORE: {
            return {
                ...state,
                messageError: ''
            }
        }
        default:
            return state;
    }
}
