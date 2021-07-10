import React from 'react';
import { connect } from 'react-redux';
import DestinationTypeManagement from '../../components/customer/destination-type/destination-type';
import { fetchAllDestinationType,updateDestinationType, deleteDestinationType,addDestinationType,resetStore } from '../../actions/customer/destination-type-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.destinationTypeManagementReducer.isLoading,
    listDestinationType: state.destinationTypeManagementReducer.listDestinationType,
    isAction: state.destinationTypeManagementReducer.isAction,
    messageError: state.destinationTypeManagementReducer.messageError,
    messageSuccess: state.destinationTypeManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDestinationType: (accessToken) => dispatch(fetchAllDestinationType(accessToken)),
    updateDestinationType: (accessToken,trip) => dispatch(updateDestinationType(accessToken,trip)),
    deleteDestinationType: (accessToken,id) => dispatch(deleteDestinationType(accessToken,id)),
    addDestinationType: (accessToken,trip) => dispatch(addDestinationType(accessToken,trip)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationTypeManagement);
