import {
    FETCH_ALL_POI,
    FETCH_ALL_POI_SUCCESS,
    FETCH_ALL_POI_FAIL,
    UPDATE_POI,
    UPDATE_POI_SUCCESS,
    UPDATE_POI_FAIL,
    ADD_POI,
    ADD_POI_SUCCESS,
    ADD_POI_FAIL,
    DELETE_POI,
    DELETE_POI_SUCCESS,
    DELETE_POI_FAIL,
    RESET_STORE
} from '../../constants/customer/poi';
import callApi from '../../ultis/callApi';
const fetchAllPOI = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_POI });
        return callApi(`api/Poi`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: FETCH_ALL_POI_SUCCESS,
                        listPOI: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_POI_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addPOI = (accessToken, Destination) => {
    return (dispatch) => {
        dispatch({ type: ADD_POI });
        return callApi(`api/Poi`, 'POST', Destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_POI_SUCCESS,
                        listPOI: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_POI_FAIL,
                        messageError: "Add POI fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_POI_FAIL,
                    messageError: error + " Add POI fail"
                });
            })
    }
}

const updatePOI = (accessToken, destination) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_POI });
        return callApi(`api/Poi`, 'PUT', destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_POI_SUCCESS,
                        listPOI: res.data,
                        messageSuccess: 'Update POI Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_POI_FAIL,
                        messageError: "Update POI Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_POI_FAIL,
                    messageError: error + " Update POI Fail"
                });
            })
    }
}

const deletePOI = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_POI });
        return callApi(`api/Poi/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_POI_SUCCESS,
                        listPOI: res.data,
                        messageSuccess: 'Inactive POI Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_POI_FAIL,
                        messageError: "Inactive POI Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_POI_FAIL,
                    messageError: error + " Inactive POI Fail"
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
    fetchAllPOI,
    updatePOI,
    deletePOI,
    addPOI,
    resetStore
}