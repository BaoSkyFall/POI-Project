import React from 'react';
import { connect } from 'react-redux';
import POITypeManagement from '../../components/customer/poi-type/poi-type';
import { fetchAllPOIType,updatePOIType, deletePOIType,addPOIType,resetStore } from '../../actions/customer/poi-type-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.poiTypeManagementReducer.isLoading,
    listPOIType: state.poiTypeManagementReducer.listPOIType,
    isAction: state.poiTypeManagementReducer.isAction,
    messageError: state.poiTypeManagementReducer.messageError,
    messageSuccess: state.poiTypeManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPOIType: (accessToken) => dispatch(fetchAllPOIType(accessToken)),
    updatePOIType: (accessToken,trip) => dispatch(updatePOIType(accessToken,trip)),
    deletePOIType: (accessToken,id) => dispatch(deletePOIType(accessToken,id)),
    addPOIType: (accessToken,poiType) => dispatch(addPOIType(accessToken,poiType)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(POITypeManagement);
