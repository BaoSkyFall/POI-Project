import React from 'react';
import { connect } from 'react-redux';
import POIManagement from '../../components/customer/poi/poi';
import { fetchAllPOI,updatePOI, deletePOI,addPOI,resetStore,activePOI} from '../../actions/customer/poi-management';
import { fetchAllPOIType} from '../../actions/customer/poi-type-management';
import { fetchAllDestination} from '../../actions/customer/destination-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.poiManagementReducer.isLoading,
    listPOI: state.poiManagementReducer.listPOI,
    listPOIType: state.poiTypeManagementReducer.listPOIType,
    listDestination: state.destinationManagementReducer.listDestination,
    isAction: state.poiManagementReducer.isAction,
    total:state.poiManagementReducer.total,
    messageError: state.poiManagementReducer.messageError,
    messageSuccess: state.poiManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPOI: (accessToken,pageIndex) => dispatch(fetchAllPOI(accessToken,pageIndex)),
    fetchAllDestination: (accessToken) => dispatch(fetchAllDestination(accessToken)),
    fetchAllPOIType: (accessToken) => dispatch(fetchAllPOIType(accessToken)),
    updatePOI: (accessToken,trip) => dispatch(updatePOI(accessToken,trip)),
    deletePOI: (accessToken,id) => dispatch(deletePOI(accessToken,id)),
    addPOI: (accessToken,poi,image) => dispatch(addPOI(accessToken,poi,image)),
    activePOI: (accessToken,id) => dispatch(activePOI(accessToken,id)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(POIManagement);
