import { connect } from 'react-redux';
import TripManagement from '../../components/customer/trip/trip';
import { fetchAllTrip,updateTrip, deleteTrip,addTrip,resetStore } from '../../actions/customer/trip-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.tripManagementReducer.isLoading,
    listTrip: state.tripManagementReducer.listTrip,
    isAction: state.tripManagementReducer.isAction,
    messageError: state.tripManagementReducer.messageError,
    messageSuccess: state.tripManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTrip: (accessToken) => dispatch(fetchAllTrip(accessToken)),
    updateTrip: (accessToken,trip) => dispatch(updateTrip(accessToken,trip)),
    deleteTrip: (accessToken,id) => dispatch(deleteTrip(accessToken,id)),
    addTrip: (accessToken,trip) => dispatch(addTrip(accessToken,trip)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripManagement);
