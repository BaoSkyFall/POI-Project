import { connect } from 'react-redux';
import HashTagManagement from '../../components/customer/hashtag/hashtag';
import { fetchAllHashTag,updateHashTag, deleteHashTag,addHashTag,resetStore } from '../../actions/customer/hashtag-management';

const mapStateToProps = (state) => {
  return {
    isLoading: state.hashtagManagementReducer.isLoading,
    listHashTag: state.hashtagManagementReducer.listHashTag,
    isAction: state.hashtagManagementReducer.isAction,
    messageError: state.hashtagManagementReducer.messageError,
    messageSuccess: state.hashtagManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHashTag: (accessToken) => dispatch(fetchAllHashTag(accessToken)),
    updateHashTag: (accessToken,trip) => dispatch(updateHashTag(accessToken,trip)),
    deleteHashTag: (accessToken,id) => dispatch(deleteHashTag(accessToken,id)),
    addHashTag: (accessToken,trip) => dispatch(addHashTag(accessToken,trip)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HashTagManagement);
