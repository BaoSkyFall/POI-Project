import {
    FETCH_ALL_VISIT,
    FETCH_ALL_VISIT_SUCCESS,
    FETCH_ALL_VISIT_FAIL,
    UPDATE_VISIT,
    UPDATE_VISIT_SUCCESS,
    UPDATE_VISIT_FAIL,
    ADD_VISIT,
    ADD_VISIT_SUCCESS,
    ADD_VISIT_FAIL,
    DELETE_VISIT,
    DELETE_VISIT_SUCCESS,
    DELETE_VISIT_FAIL,
    RESET_STORE
} from '../../constants/customer/visit-management';
import callApi from '../../ultis/callApi';


const fetchAllVisit = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_VISIT });
        return callApi(`api/Visit`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: FETCH_ALL_VISIT_SUCCESS,
                        listUsers: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_VISIT_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addVisit = (accessToken, visit) => {
    return (dispatch) => {
        dispatch({ type: ADD_VISIT });
        return callApi(`api/Visit`, 'POST', visit, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_VISIT_SUCCESS,
                        listUsers: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_VISIT_FAIL,
                        messageError: "Add Visit fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_VISIT_FAIL,
                    messageError: error + " Add Visit fail"
                });
            })
    }
}

const updateVisit = (accessToken, visit) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_VISIT });
        return callApi(`api/Visit`, 'PUT', visit, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_VISIT_SUCCESS,
                        listUsers: res.data,
                        messageSuccess: 'Update Visit Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_VISIT_FAIL,
                        messageError: "Update Visit Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_VISIT_FAIL,
                    messageError: error + " Update Visit Fail"
                });
            })
    }
}

const deleteVisit = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_VISIT });
        return callApi(`api/Visit/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_VISIT_SUCCESS,
                        listUsers: res.data,
                        messageSuccess: 'Inactive Visit Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_VISIT_FAIL,
                        messageError: "Inactive Visit Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_VISIT_FAIL,
                    messageError: error + " Inactive Visit Fail"
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
    fetchAllVisit,
    updateVisit,
    deleteVisit,
    addVisit,
    resetStore
}