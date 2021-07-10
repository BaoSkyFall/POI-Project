import {
    FETCH_ALL_DESTINATION_TYPE,
    FETCH_ALL_DESTINATION_TYPE_SUCCESS,
    FETCH_ALL_DESTINATION_TYPE_FAIL,
    UPDATE_DESTINATION_TYPE,
    UPDATE_DESTINATION_TYPE_SUCCESS,
    UPDATE_DESTINATION_TYPE_FAIL,
    ADD_DESTINATION_TYPE,
    ADD_DESTINATION_TYPE_SUCCESS,
    ADD_DESTINATION_TYPE_FAIL,
    DELETE_DESTINATION_TYPE,
    DELETE_DESTINATION_TYPE_SUCCESS,
    DELETE_DESTINATION_TYPE_FAIL,
    RESET_STORE
} from '../../constants/customer/destination-type-management';
import callApi from '../../ultis/callApi';
const fetchAllDestinationType = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_DESTINATION_TYPE });
        return callApi(`api/DesType`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: FETCH_ALL_DESTINATION_TYPE_SUCCESS,
                        listDestinationType: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_DESTINATION_TYPE_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addDestinationType = (accessToken, Destination) => {
    return (dispatch) => {
        dispatch({ type: ADD_DESTINATION_TYPE });
        return callApi(`api/DesType`, 'POST', Destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_DESTINATION_TYPE_SUCCESS,
                        listDestinationType: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_DESTINATION_TYPE_FAIL,
                        messageError: "Add Destination Type fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_DESTINATION_TYPE_FAIL,
                    messageError: error + " Add Destination Type fail"
                });
            })
    }
}

const updateDestinationType = (accessToken, destination) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_DESTINATION_TYPE });
        return callApi(`api/DesType`, 'PUT', destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_DESTINATION_TYPE_SUCCESS,
                        listDestinationType: res.data,
                        messageSuccess: 'Update Destination Type Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_DESTINATION_TYPE_FAIL,
                        messageError: "Update Destination Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_DESTINATION_TYPE_FAIL,
                    messageError: error + " Update Destination Type Fail"
                });
            })
    }
}

const deleteDestinationType = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_DESTINATION_TYPE });
        return callApi(`api/DesType/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_DESTINATION_TYPE_SUCCESS,
                        listDestinationType: res.data,
                        messageSuccess: 'Inactive Destination Type Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_DESTINATION_TYPE_FAIL,
                        messageError: "Inactive Destination Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_DESTINATION_TYPE_FAIL,
                    messageError: error + " Inactive Destination Type Fail"
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
    fetchAllDestinationType,
    updateDestinationType,
    deleteDestinationType,
    addDestinationType,
    resetStore
}