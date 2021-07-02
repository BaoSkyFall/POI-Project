import React from 'react';
import { connect } from 'react-redux';
import UsersManagement from '../../components/customer/users/users';
import { fetchAllUsers, resetStore } from '../../actions/customer/users-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.userManagementReducer.isLoading,
    listUsers: state.userManagementReducer.listUsers,
    messageError: state.userManagementReducer.messageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (accessToken) => dispatch(fetchAllUsers(accessToken)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
