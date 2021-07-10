import React from 'react';
import { connect } from 'react-redux';
import DestinationManagement from '../../components/customer/destination/destination';
import { fetchAllDestination,updateDestination, deleteDestination,addDestination,resetStore,fetchAllProvince } from '../../actions/customer/destination-management';
import { fetchAllDestinationType } from '../../actions/customer/destination-type-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.destinationManagementReducer.isLoading,
    listDestination: state.destinationManagementReducer.listDestination,
    listDestinationType: state.destinationTypeManagementReducer.listDestinationType,
    listProvince:state.destinationManagementReducer.listProvince,
    isAction: state.destinationManagementReducer.isAction,
    messageError: state.destinationManagementReducer.messageError,
    messageSuccess: state.destinationManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDestination: (accessToken) => dispatch(fetchAllDestination(accessToken)),
    fetchAllDestinationType: (accessToken) => dispatch(fetchAllDestinationType(accessToken)),
    updateDestination: (accessToken,trip) => dispatch(updateDestination(accessToken,trip)),
    deleteDestination: (accessToken,id) => dispatch(deleteDestination(accessToken,id)),
    addDestination: (accessToken,des,image) => dispatch(addDestination(accessToken,des,image)),
    fetchAllProvince: (accessToken,trip) => dispatch(fetchAllProvince(accessToken,trip)),


    
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationManagement);
