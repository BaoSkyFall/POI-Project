import {
    FETCH_ALL_HASHTAG,
    FETCH_ALL_HASHTAG_SUCCESS,
    FETCH_ALL_HASHTAG_FAIL,
    UPDATE_HASHTAG,
    UPDATE_HASHTAG_SUCCESS,
    UPDATE_HASHTAG_FAIL,
    ADD_HASHTAG,
    ADD_HASHTAG_SUCCESS,
    ADD_HASHTAG_FAIL,
    DELETE_HASHTAG,
    DELETE_HASHTAG_SUCCESS,
    DELETE_HASHTAG_FAIL,
    RESET_STORE
} from '../../constants/customer/hashtag-management';

const initialState = {
    listHashTag: [],
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function hashtagManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_HASHTAG: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_HASHTAG_SUCCESS: {
            return {
                ...state,
                listHashTag: action.listHashTag,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_HASHTAG_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_HASHTAG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_HASHTAG_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_HASHTAG_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_HASHTAG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_HASHTAG_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_HASHTAG_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_HASHTAG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_HASHTAG_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_HASHTAG_FAIL: {
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
