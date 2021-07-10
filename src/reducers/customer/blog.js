import {
    FETCH_ALL_BLOG,
    FETCH_ALL_BLOG_SUCCESS,
    FETCH_ALL_BLOG_FAIL,
    UPDATE_BLOG,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,
    ADD_BLOG,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_FAIL,
    DELETE_BLOG,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    ACTIVE_BLOG,
    ACTIVE_BLOG_SUCCESS,
    ACTIVE_BLOG_FAIL,
    RESET_STORE
} from '../../constants/customer/blog';

const initialState = {
    listBlog: [],
    total: 10,
    isAction: false,
    messageError: '',
    messageSuccess: '',
    isLoading: false
};

export default function blogManagementReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_BLOG: {
            return {
                ...state,
                isLoading: true,
                messageSuccess:'',
                messageError:'',
                isAction: false,
            }
        }
        case FETCH_ALL_BLOG_SUCCESS: {
            return {
                ...state,
                listBlog: action.listBlog,
                total:action.total,
                messageSuccess:'',
                messageError:'',
                isLoading: false,
                isAction: false,

            }
        }
        case FETCH_ALL_BLOG_FAIL: {
            return {
                ...state,
                messageSuccess:'',
                messageError: action.messageError,
                isLoading: false,
                isAction: false,

            }
        }
        case UPDATE_BLOG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_BLOG_SUCCESS: {
            return {
                ...state,
                isAction: true,
                isLoading: false,
                messageSuccess: action.messageSuccess,
                messageError: '',
            }
        }
        case UPDATE_BLOG_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isAction: true,
                isLoading: false
            }
        }
        case ADD_BLOG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_BLOG_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isAction: true,
                isLoading: false
            }
        }
        case ADD_BLOG_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_BLOG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DELETE_BLOG_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case DELETE_BLOG_FAIL: {
            return {
                ...state,
                messageSuccess: '',
                messageError: action.messageError,
                isLoading: false,
                isAction: true,

            }
        }
        case ACTIVE_BLOG: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ACTIVE_BLOG_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                messageError: '',
                isLoading: false,
                isAction: true,

            }
        }
        case ACTIVE_BLOG_FAIL: {
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
