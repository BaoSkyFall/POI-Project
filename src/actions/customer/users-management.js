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
import callApi from '../../ultis/callApi';


const fetchAllUsers = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_USERS });
        return callApi(`api/User`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
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

const addUser = (accessToken, user) => {
    return (dispatch) => {
        dispatch({ type: ADD_USER });
        return callApi(`api/User`, 'POST', user, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_USER_SUCCESS,
                        listUsers: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_USER_FAIL,
                        messageError: "Add User fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_USER_FAIL,
                    messageError: error + " Add User fail"
                });
            })
    }
}

const updateUser = (accessToken, user) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_USER });
        return callApi(`api/User`, 'PUT', user, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        listUsers: res.data,
                        messageSuccess: 'Update User Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_USER_FAIL,
                        messageError: "Update User Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_USER_FAIL,
                    messageError: error + " Update User Fail"
                });
            })
    }
}

const deleteUser = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_USER });
        return callApi(`api/User/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_USER_SUCCESS,
                        listUsers: res.data,
                        messageSuccess: 'Inactive User Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_USER_FAIL,
                        messageError: "Inactive User Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_USER_FAIL,
                    messageError: error + " Inactive User Fail"
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
    updateUser,
    deleteUser,
    addUser,
    resetStore
}