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
    FETCH_ALL_PROVINCE,
    FETCH_ALL_PROVINCE_SUCCESS,
    FETCH_ALL_PROVINCE_FAIL,
    RESET_STORE
} from '../../constants/customer/destination-management';
import callApi from '../../ultis/callApi';
import moment from 'moment';
import { storage } from "../../firebase/index";
import * as _ from 'lodash'

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
                    // storage
                    //     .ref("destination")
                    //     .listAll()
                    //     .then(result => {
                    //         // setUrl(result);

                    //         result.items.forEach((itemRef) => {
                    //             mapDisplayImage(itemRef);
                    //             const index = _.findIndex(res.data, o => {
                    //                 return itemRef.name.includes(o.destinationId)
                    //             })
                    //             console.log('index:', index)
                    //             if (index !== -1) {
                    //                 itemRef.getDownloadURL().then(function (url) {
                    //                     res.data[index].imageUrl = url
                    //                 })
                    //             }
                    //             // All the items under listRef.
                    //         });
                    //         setTimeout(() => {
                    //             console.log('res:', res.data)
                    //             dispatch({
                    //                 type: FETCH_ALL_DESTINATION_SUCCESS,
                    //                 listDestination: res.data
                    //             });
                    //         }, 500)

                    //     });

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
const fetchAllProvince = (accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_PROVINCE });
        return callApi(`api/Province`, 'GET', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)

                    dispatch({
                        type: FETCH_ALL_PROVINCE_SUCCESS,
                        listProvince: res.data
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_PROVINCE_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}
const mapDisplayImage = (imageRef) => {

    imageRef.getDownloadURL().then(function (url) {
        console.log('url:', url)

    }).catch(function (error) {
    });
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
const addDestination = (accessToken, Destination, image) => {
    return (dispatch) => {
        dispatch({ type: ADD_DESTINATION });
        return callApi(`api/Destination`, 'POST', Destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res) {
                    //Id = res.data
                    console.log('res:', res.data)
                    Destination.destinationId = res.data
                    if (image) {
                        const uploadTask = storage.ref(`destination/${res.data}`).put(image);
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
                                    .ref('destination')
                                    .child(res.data)
                                    .getDownloadURL()
                                    .then(url => {
                                        dispatch({
                                            type: ADD_DESTINATION_SUCCESS,
                                            messageSuccess: "Add Destination success"
                                        });
                                        Destination.imageUrl = url

                                        dispatch({ type: UPDATE_DESTINATION });
                                        return callApi(`api/Destination`, 'PUT', Destination, { Authorization: 'Bearer ' + accessToken })
                                            .then(result => {

                                                if (result.status === 200) {
                                                    console.log('result:', result.data)
                                                    dispatch({
                                                        type: UPDATE_DESTINATION_SUCCESS,
                                                        messageSuccess: 'Update Image to Firebase Success'
                                                    });
                                                }
                                                else {
                                                    dispatch({
                                                        type: UPDATE_DESTINATION_FAIL,
                                                        messageError: "Update Image to Firebase Fail"
                                                    });
                                                }
                                            })
                                            .catch(error => {
                                                dispatch({
                                                    type: UPDATE_DESTINATION_FAIL,
                                                    messageError: error + " Update Image to Firebase Fail"
                                                });
                                            })
                                    });
                            }

                        );
                    }
                    else {
                        dispatch({
                            type: ADD_DESTINATION_SUCCESS,
                            messageSuccess: "Add Destination success"
                        });
                    }
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
    fetchAllProvince,
    resetStore
}