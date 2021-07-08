import React from 'react';
import { connect } from 'react-redux';
import POIManagement from '../../components/customer/poi/poi';
import { fetchAllPOI,updatePOI, deletePOI,addPOI,resetStore } from '../../actions/customer/poi-management';
import { fetchAllPOIType} from '../../actions/customer/poi-type-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.poiManagementReducer.isLoading,
    listPOI: state.poiManagementReducer.listPOI,
    listPOIType: state.poiTypeManagementReducer.listPOIType,
    isAction: state.poiManagementReducer.isAction,
    messageError: state.poiManagementReducer.messageError,
    messageSuccess: state.poiManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPOI: (accessToken) => dispatch(fetchAllPOI(accessToken)),
    fetchAllPOIType: (accessToken) => dispatch(fetchAllPOIType(accessToken)),
    updatePOI: (accessToken,trip) => dispatch(updatePOI(accessToken,trip)),
    deletePOI: (accessToken,id) => dispatch(deletePOI(accessToken,id)),
    addPOI: (accessToken,trip) => dispatch(addPOI(accessToken,trip)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(POIManagement);
