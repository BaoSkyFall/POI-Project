import React from 'react';
import { connect } from 'react-redux';
import VisitManagement from '../../components/customer/visit/visit';
import { fetchAllVisit,updateVisit, deleteVisit,addVisit,resetStore } from '../../actions/customer/visit-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.visitManagementReducer.isLoading,
    listVisit: state.visitManagementReducer.listVisit,
    isAction: state.visitManagementReducer.isAction,
    messageError: state.visitManagementReducer.messageError,
    messageSuccess: state.visitManagementReducer.messageSuccess,
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
