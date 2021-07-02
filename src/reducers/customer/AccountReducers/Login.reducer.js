const initState = {
    status: 0,
    message: '',
    sending: false,
}

const LoginReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOG_IN_REQUEST':
            return {
                ...state,
                status: 0,
                message: '',
                sending: true,
            };
        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                status: 1,
                message: action.message,
                sending: false,
            };
        case 'LOG_IN_FAILURE':
            return {
                ...state,
                status: -1,
                message: action.message,
                sending: false,
            };
        case 'LOG_IN_RESET':
            console.log('reset');
            return initState;
        default:
            return state
    }
}

export default LoginReducer;