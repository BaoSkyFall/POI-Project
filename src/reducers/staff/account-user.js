import * as Types from '../../constants/ActionTypes';
var initialState = {
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    massageError: ''
}

const accountUser = (state = initialState, action) => {
    switch (action.type) {
        case Types.CREATE_ACCOUNT:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isFailed: false
            };
        case Types.CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false
            }
        case Types.CREATE_ACCOUNT_FAIL:
            return {
                ...state,
                isFailed: true,
                isLoading: false,
                massageError: action.massageError
            }
        case Types.CREATE_ACCOUNT_RESET_STATUS:
            return {
                ...state,
                isFailed: false,
                isLoading: false,
                isSuccess: false,
                massageError: ''
            }
        default: return { ...state };
    }
}

export default accountUser;