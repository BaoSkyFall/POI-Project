import {
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAIL,
    RESET_STORE
} from '../../constants/customer/users-management';
import callApi from '../../ultis/callApi';


const fetchAllUsers = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_USERS });
        return callApi(`api/User`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
        .then(res => {
            if (res.data) {
                console.log('res:', res.data)
                dispatch({
                    type: FETCH_ALL_USERS_SUCCESS,
                    listUsers: res.data
                });
            }
        })
        .catch(error => {
            dispatch({
                type: FETCH_ALL_USERS_FAIL,
                messageError: "Server's error"
            });
        })
    }
}




const resetStore = () => {
    return dispatch => {
        dispatch({
            type: RESET_STORE
        })
    }
}

export {
    fetchAllUsers,
    resetStore
}