import {
    FETCH_ALL_DESTINATION,
    FETCH_ALL_DESTINATION_SUCCESS,
    FETCH_ALL_DESTINATION_FAIL,
    UPDATE_DESTINATION,
    UPDATE_DESTINATION_SUCCESS,
    UPDATE_DESTINATION_FAIL,
    ADD_DESTINATION,
    ADD_DESTINATION_SUCCESS,
    ADD_DESTINATION_FAIL,
    DELETE_DESTINATION,
    DELETE_DESTINATION_SUCCESS,
    DELETE_DESTINATION_FAIL,
    RESET_STORE
} from '../../constants/customer/destination-management';
import callApi from '../../ultis/callApi';
import moment from 'moment';


const fetchAllDestination = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_DESTINATION });
        return callApi(`api/Destination`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    res.data.map(el => {
                        el.startTime = moment(new Date(el.startTime)).format("DD/MM/YYYY - hh:mm")
                        el.endTime = moment(new Date(el.endTime)).format("DD/MM/YYYY - hh:mm")
                    })
                    dispatch({
                        type: FETCH_ALL_DESTINATION_SUCCESS,
                        listDestination: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_DESTINATION_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addDestination = (accessToken, Destination) => {
    return (dispatch) => {
        dispatch({ type: ADD_DESTINATION });
        return callApi(`api/Destination`, 'POST', Destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_DESTINATION_SUCCESS,
                        listDestination: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_DESTINATION_FAIL,
                        messageError: "Add Destination fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_DESTINATION_FAIL,
                    messageError: error + " Add Destination fail"
                });
            })
    }
}

const updateDestination = (accessToken, destination) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_DESTINATION });
        return callApi(`api/Destination`, 'PUT', destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_DESTINATION_SUCCESS,
                        listDestination: res.data,
                        messageSuccess: 'Update Destination Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_DESTINATION_FAIL,
                        messageError: "Update Destination Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_DESTINATION_FAIL,
                    messageError: error + " Update Destination Fail"
                });
            })
    }
}

const deleteDestination = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_DESTINATION });
        return callApi(`api/Destination/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_DESTINATION_SUCCESS,
                        listDestination: res.data,
                        messageSuccess: 'Inactive Destination Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_DESTINATION_FAIL,
                        messageError: "Inactive Destination Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_DESTINATION_FAIL,
                    messageError: error + " Inactive Destination Fail"
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
    fetchAllDestination,
    updateDestination,
    deleteDestination,
    addDestination,
    resetStore
}