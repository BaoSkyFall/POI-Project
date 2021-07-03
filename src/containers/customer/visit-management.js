import React from 'react';
import { connect } from 'react-redux';
import VisitManagement from '../../components/customer/visit/visit';
import { fetchAllVisit,updateVisit, deleteVisit,addVisit,resetStore } from '../../actions/customer/visit-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.userManagementReducer.isLoading,
    listVisit: state.userManagementReducer.listVisit,
    isAction: state.userManagementReducer.isAction,
    messageError: state.userManagementReducer.messageError,
    messageSuccess: state.userManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllVisit: (accessToken) => dispatch(fetchAllVisit(accessToken)),
    updateVisit: (accessToken,visit) => dispatch(updateVisit(accessToken,visit)),
    deleteVisit: (accessToken,id) => dispatch(deleteVisit(accessToken,id)),
    addVisit: (accessToken,visit) => dispatch(addVisit(accessToken,visit)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitManagement);
