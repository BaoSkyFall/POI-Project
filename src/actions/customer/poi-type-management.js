import {
    FETCH_ALL_POI_TYPE,
    FETCH_ALL_POI_TYPE_SUCCESS,
    FETCH_ALL_POI_TYPE_FAIL,
    UPDATE_POI_TYPE,
    UPDATE_POI_TYPE_SUCCESS,
    UPDATE_POI_TYPE_FAIL,
    ADD_POI_TYPE,
    ADD_POI_TYPE_SUCCESS,
    ADD_POI_TYPE_FAIL,
    DELETE_POI_TYPE,
    DELETE_POI_TYPE_SUCCESS,
    DELETE_POI_TYPE_FAIL,
    RESET_STORE
} from '../../constants/customer/poi-type';
import callApi from '../../ultis/callApi';
const fetchAllPOIType = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_POI_TYPE });
        return callApi(`api/PoiType`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: FETCH_ALL_POI_TYPE_SUCCESS,
                        listPOIType: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_POI_TYPE_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addPOIType = (accessToken, Destination) => {
    return (dispatch) => {
        dispatch({ type: ADD_POI_TYPE });
        return callApi(`api/PoiType`, 'POST', Destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_POI_TYPE_SUCCESS,
                        listPOIType: res.data
                    });
                }
                else {
                    dispatch({
                        type: ADD_POI_TYPE_FAIL,
                        messageError: "Add POI Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_POI_TYPE_FAIL,
                    messageError: error + " Add POI Type Fail"
                });
            })
    }
}

const updatePOIType = (accessToken, destination) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_POI_TYPE });
        return callApi(`api/PoiType`, 'PUT', destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_POI_TYPE_SUCCESS,
                        listPOIType: res.data,
                        messageSuccess: 'Update POI Type Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_POI_TYPE_FAIL,
                        messageError: "Update POI Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_POI_TYPE_FAIL,
                    messageError: error + " Update POI Type Fail"
                });
            })
    }
}

const deletePOIType = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_POI_TYPE });
        return callApi(`api/PoiType/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_POI_TYPE_SUCCESS,
                        listPOIType: res.data,
                        messageSuccess: 'Inactive POI Type Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_POI_TYPE_FAIL,
                        messageError: "Inactive POI Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_POI_TYPE_FAIL,
                    messageError: error + " Inactive POI Type Fail"
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
    fetchAllPOIType,
    updatePOIType,
    deletePOIType,
    addPOIType,
    resetStore
}