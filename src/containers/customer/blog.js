import { connect } from 'react-redux';
import BlogManagement from '../../components/customer/blog/blog';
import { fetchAllBlog,updateBlog, deleteBlog,addBlog,resetStore,activeBlog} from '../../actions/customer/blog-management';


const mapStateToProps = (state) => {
  return {
    isLoading: state.blogManagementReducer.isLoading,
    listBlog: state.blogManagementReducer.listBlog,
    isAction: state.blogManagementReducer.isAction,
    total:state.blogManagementReducer.total,
    messageError: state.blogManagementReducer.messageError,
    messageSuccess: state.blogManagementReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBlog: (accessToken,pageIndex) => dispatch(fetchAllBlog(accessToken,pageIndex)),
    updateBlog: (accessToken,trip) => dispatch(updateBlog(accessToken,trip)),
    deleteBlog: (accessToken,id) => dispatch(deleteBlog(accessToken,id)),
    addBlog: (accessToken,blog,image) => dispatch(addBlog(accessToken,blog,image)),
    activeBlog: (accessToken,id) => dispatch(activeBlog(accessToken,id)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogManagement);
