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
    ACTIVE_POI,
    ACTIVE_POI_SUCCESS,
    ACTIVE_POI_FAIL,
    RESET_STORE
} from '../../constants/customer/poi';
import callApi from '../../ultis/callApi';
import { storage } from "../../firebase/index";
const fetchAllPOI = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_POI });
        return callApi(`api/Poi`, 'GET', {}, { Authorization: 'Bearer ' + accessToken,'X-Pagination': JSON.stringify({"PageSize":999,"CurrentPageIndex":1})
})
            .then(res => {
                if (res.status === 200) {
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

const addPOI = (accessToken, poi,image) => {
    return (dispatch) => {
        dispatch({ type: ADD_POI });
        return callApi(`api/Poi`, 'POST', poi, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res) {
                    console.log('res:', res.data)
                    poi.poiId = res.data
                    if (image) {
                        const uploadTask = storage.ref(`poi/${res.data}`).put(image);
                        uploadTask.on(
                            "state_changed",
                            snapshot => {
                            },
                            error => {
                                console.log(error);
                                this.setState({ confirmLoading: false })

                            },
                            () => {
                                storage
                                    .ref('poi')
                                    .child(res.data)
                                    .getDownloadURL()
                                    .then(url => {
                                        dispatch({
                                            type: ADD_POI_SUCCESS,
                                            messageSuccess: "Add POI success"
                                        });
                                        poi.imageUrl = url

                                        dispatch({ type: UPDATE_POI });
                                        return callApi(`api/Poi`, 'PUT', poi, { Authorization: 'Bearer ' + accessToken })
                                            .then(result => {

                                                if (result.status === 200) {
                                                    console.log('result:', result.data)
                                                    dispatch({
                                                        type: UPDATE_POI_SUCCESS,
                                                        messageSuccess: 'Update Image to Firebase Success'
                                                    });
                                                }
                                                else {
                                                    dispatch({
                                                        type: UPDATE_POI_FAIL,
                                                        messageError: "Update Image to Firebase Fail"
                                                    });
                                                }
                                            })
                                            .catch(error => {
                                                dispatch({
                                                    type: UPDATE_POI_FAIL,
                                                    messageError: error + " Update Image to Firebase Fail"
                                                });
                                            })
                                    });
                            }

                        );
                    }
                    else {
                        dispatch({
                            type: ADD_POI_SUCCESS,
                            messageSuccess: "Add Destination success"
                        });
                    }
                }
                else {
                    dispatch({
                        type: ADD_POI_FAIL,
                        messageError: "Add Destination fail"
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
const activePOI = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: ACTIVE_POI });
        return callApi(`api/Poi/approve/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ACTIVE_POI_SUCCESS,
                        listPOIType: res.data,
                        messageSuccess: 'Inactive POI Type Success'

                    });
                }
                else {
                    dispatch({
                        type: ACTIVE_POI_FAIL,
                        messageError: "Inactive POI Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ACTIVE_POI_FAIL,
                    messageError: error + " Inactive POI Type Fail"
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
    activePOI,
    addPOI,
    resetStore
}