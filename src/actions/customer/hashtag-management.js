import {
    FETCH_ALL_HASHTAG,
    FETCH_ALL_HASHTAG_SUCCESS,
    FETCH_ALL_HASHTAG_FAIL,
    UPDATE_HASHTAG,
    UPDATE_HASHTAG_SUCCESS,
    UPDATE_HASHTAG_FAIL,
    ADD_HASHTAG,
    ADD_HASHTAG_SUCCESS,
    ADD_HASHTAG_FAIL,
    DELETE_HASHTAG,
    DELETE_HASHTAG_SUCCESS,
    DELETE_HASHTAG_FAIL,
    RESET_STORE
} from '../../constants/customer/hashtag-management';
import callApi from '../../ultis/callApi';
import moment from 'moment';


const fetchAllHashTag = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_HASHTAG });
        return callApi(`api/HashTag`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    // res.data.map(el => {
                    //     el.startTime = moment(new Date(el.startTime)).format("DD/MM/YYYY - hh:mm")
                    //     el.endTime = moment(new Date(el.endTime)).format("DD/MM/YYYY - hh:mm")
                    // })
                    dispatch({
                        type: FETCH_ALL_HASHTAG_SUCCESS,
                        listHashTag: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_HASHTAG_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addHashTag = (accessToken, trip) => {
    return (dispatch) => {
        dispatch({ type: ADD_HASHTAG });
        return callApi(`api/HashTag`, 'POST', trip, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                console.log('res:', res)
                if (res.status === 200 || res.status === 201) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ADD_HASHTAG_SUCCESS,
                        listHashTag: res.data,
                        messageSuccess: 'Add HashTag Success'
                    });
                }
                else {
                    dispatch({
                        type: ADD_HASHTAG_FAIL,
                        messageError: "Add HashTag fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_HASHTAG_FAIL,
                    messageError: error + " Add HashTag fail"
                });
            })
    }
}

const updateHashTag = (accessToken, trip) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_HASHTAG });
        return callApi(`api/HashTag`, 'PUT', trip, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_HASHTAG_SUCCESS,
                        listHashTag: res.data,
                        messageSuccess: 'Update HashTag Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_HASHTAG_FAIL,
                        messageError: "Update HashTag Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_HASHTAG_FAIL,
                    messageError: error + " Update HashTag Fail"
                });
            })
    }
}

const deleteHashTag = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_HASHTAG });
        return callApi(`api/HashTag/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_HASHTAG_SUCCESS,
                        listHashTag: res.data,
                        messageSuccess: 'Inactive HashTag Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_HASHTAG_FAIL,
                        messageError: "Inactive HashTag Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_HASHTAG_FAIL,
                    messageError: error + " Inactive HashTag Fail"
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
    fetchAllHashTag,
    updateHashTag,
    deleteHashTag,
    addHashTag,
    resetStore
}