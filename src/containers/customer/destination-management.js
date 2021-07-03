import React from 'react';
import { connect } from 'react-redux';
import DestinationManagement from '../../components/customer/destination/destination';
import { fetchAllDestination,updateDestination, deleteDestination,addDestination,resetStore } from '../../actions/customer/destination-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.destinationManagementReducer.isLoading,
    listDestination: state.destinationManagementReducer.listDestination,
    isAction: state.destinationManagementReducer.isAction,
    messageError: state.destinationManagementReducer.messageError,
    messageSuccess: state.destinationManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDestination: (accessToken) => dispatch(fetchAllDestination(accessToken)),
    updateDestination: (accessToken,trip) => dispatch(updateDestination(accessToken,trip)),
    deleteDestination: (accessToken,id) => dispatch(deleteDestination(accessToken,id)),
    addDestination: (accessToken,trip) => dispatch(addDestination(accessToken,trip)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationManagement);
