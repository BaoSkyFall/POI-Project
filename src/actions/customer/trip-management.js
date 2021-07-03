import {
    FETCH_ALL_TRIP,
    FETCH_ALL_TRIP_SUCCESS,
    FETCH_ALL_TRIP_FAIL,
    UPDATE_TRIP,
    UPDATE_TRIP_SUCCESS,
    UPDATE_TRIP_FAIL,
    ADD_TRIP,
    ADD_TRIP_SUCCESS,
    ADD_TRIP_FAIL,
    DELETE_TRIP,
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAIL,
    RESET_STORE
} from '../../constants/customer/trip-management';
import callApi from '../../ultis/callApi';
import moment from 'moment';


const fetchAllTrip = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_TRIP });
        return callApi(`api/Trip`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    res.data.map(el => {
                        el.startTime = moment(new Date(el.startTime)).format("DD/MM/YYYY - hh:mm")
                        el.endTime = moment(new Date(el.endTime)).format("DD/MM/YYYY - hh:mm")
                    })
                    dispatch({
                        type: FETCH_ALL_TRIP_SUCCESS,
                        listTrip: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_TRIP_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addTrip = (accessToken, trip) => {
    return (dispatch) => {
        dispatch({ type: ADD_TRIP });
        return callApi(`api/Trip`, 'POST', trip, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_TRIP_SUCCESS,
                        listTrip: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_TRIP_FAIL,
                        messageError: "Add Trip fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_TRIP_FAIL,
                    messageError: error + " Add Trip fail"
                });
            })
    }
}

const updateTrip = (accessToken, trip) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_TRIP });
        return callApi(`api/Trip`, 'PUT', trip, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_TRIP_SUCCESS,
                        listTrip: res.data,
                        messageSuccess: 'Update Trip Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_TRIP_FAIL,
                        messageError: "Update Trip Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_TRIP_FAIL,
                    messageError: error + " Update Trip Fail"
                });
            })
    }
}

const deleteTrip = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_TRIP });
        return callApi(`api/Trip/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_TRIP_SUCCESS,
                        listTrip: res.data,
                        messageSuccess: 'Inactive Trip Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_TRIP_FAIL,
                        messageError: "Inactive Trip Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_TRIP_FAIL,
                    messageError: error + " Inactive Trip Fail"
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
    fetchAllTrip,
    updateTrip,
    deleteTrip,
    addTrip,
    resetStore
}