import {
    FETCH_ALL_BLOG,
    FETCH_ALL_BLOG_SUCCESS,
    FETCH_ALL_BLOG_FAIL,
    UPDATE_BLOG,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,
    ADD_BLOG,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_FAIL,
    DELETE_BLOG,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    ACTIVE_BLOG,
    ACTIVE_BLOG_SUCCESS,
    ACTIVE_BLOG_FAIL,
    RESET_STORE
} from '../../constants/customer/blog';
import callApi from '../../ultis/callApi';
import { storage } from "../../firebase/index";
const fetchAllBlog = (accessToken,pageIndex) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_BLOG });
        return callApi(`api/Blog?pageIndex=${pageIndex}`, 'GET', {}, {
            Authorization: 'Bearer ' + accessToken, 'X-Pagination': JSON.stringify({ "PageSize": 999, "CurrentPageIndex": 1 })
        })
            .then(res => {
                if (res.status === 200) {
                    res.data.forEach(element => {
                        element.content = JSON.parse(element.content)
                        element.description = element.content.description
                        element.imageUrls = element.content.imageUrls|| []

                    });
                    dispatch({
                        type: FETCH_ALL_BLOG_SUCCESS,
                        listBlog: res.data,
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_ALL_BLOG_FAIL,
                    messageError: "Server's error"
                });
            })
    }
}

const addBlog = (accessToken, poi, image) => {
    return (dispatch) => {
        dispatch({ type: ADD_BLOG });
        return callApi(`api/Blog`, 'POST', poi, { Authorization: 'Bearer ' + accessToken })
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
                                            type: ADD_BLOG_SUCCESS,
                                            messageSuccess: "Add Blog success"
                                        });
                                        poi.imageUrl = url

                                        dispatch({ type: UPDATE_BLOG });
                                        return callApi(`api/Blog`, 'PUT', poi, { Authorization: 'Bearer ' + accessToken })
                                            .then(result => {

                                                if (result.status === 200) {
                                                    console.log('result:', result.data)
                                                    dispatch({
                                                        type: UPDATE_BLOG_SUCCESS,
                                                        messageSuccess: 'Update Image to Firebase Success'
                                                    });
                                                }
                                                else {
                                                    dispatch({
                                                        type: UPDATE_BLOG_FAIL,
                                                        messageError: "Update Image to Firebase Fail"
                                                    });
                                                }
                                            })
                                            .catch(error => {
                                                dispatch({
                                                    type: UPDATE_BLOG_FAIL,
                                                    messageError: error + " Update Image to Firebase Fail"
                                                });
                                            })
                                    });
                            }

                        );
                    }
                    else {
                        dispatch({
                            type: ADD_BLOG_SUCCESS,
                            messageSuccess: "Add Destination success"
                        });
                    }
                }
                else {
                    dispatch({
                        type: ADD_BLOG_FAIL,
                        messageError: "Add Destination fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_BLOG_FAIL,
                    messageError: error + " Add Blog fail"
                });
            })
    }
}

const updateBlog = (accessToken, destination) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_BLOG });
        return callApi(`api/Blog`, 'PUT', destination, { Authorization: 'Bearer ' + accessToken })
            .then(res => {

                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: UPDATE_BLOG_SUCCESS,
                        listBlog: res.data,
                        messageSuccess: 'Update Blog Success'
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_BLOG_FAIL,
                        messageError: "Update Blog Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_BLOG_FAIL,
                    messageError: error + " Update Blog Fail"
                });
            })
    }
}
const activeBlog = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: ACTIVE_BLOG });
        return callApi(`api/Blog/accept/${id}`, 'POST', {id}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: ACTIVE_BLOG_SUCCESS,
                        listBlogType: res.data,
                        messageSuccess: 'Inactive Blog Type Success'

                    });
                }
                else {
                    dispatch({
                        type: ACTIVE_BLOG_FAIL,
                        messageError: "Inactive Blog Type Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: ACTIVE_BLOG_FAIL,
                    messageError: error + " Inactive Blog Type Fail"
                });
            })
    }
}
const deleteBlog = (accessToken, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_BLOG });
        return callApi(`api/Blog/${id}`, 'DELETE', {}, { Authorization: 'Bearer ' + accessToken })
            .then(res => {
                if (res.status === 200) {
                    console.log('res:', res.data)
                    dispatch({
                        type: DELETE_BLOG_SUCCESS,
                        listBlog: res.data,
                        messageSuccess: 'Inactive Blog Success'

                    });
                }
                else {
                    dispatch({
                        type: DELETE_BLOG_FAIL,
                        messageError: "Inactive Blog Fail"
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: DELETE_BLOG_FAIL,
                    messageError: error + " Inactive Blog Fail"
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
    fetchAllBlog,
    updateBlog,
    deleteBlog,
    activeBlog,
    addBlog,
    resetStore
}