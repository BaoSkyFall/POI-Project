import React from 'react';
import { connect } from 'react-redux';
import UsersManagement from '../../components/customer/users/users';
import { fetchAllUsers,addUser, updateUser,deleteUser,resetStore } from '../../actions/customer/users-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.userManagementReducer.isLoading,
    listUsers: state.userManagementReducer.listUsers,
    isAction: state.userManagementReducer.isAction,
    messageError: state.userManagementReducer.messageError,
    messageSuccess: state.userManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (accessToken) => dispatch(fetchAllUsers(accessToken)),
    updateUser: (accessToken,user) => dispatch(updateUser(accessToken,user)),
    deleteUser: (accessToken,id) => dispatch(deleteUser(accessToken,id)),
    addUser: (accessToken,user) => dispatch(addUser(accessToken,user)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
