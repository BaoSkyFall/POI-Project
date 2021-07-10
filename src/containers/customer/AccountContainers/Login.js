import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  sendLogin,
  reset,
} from "../../../actions/customer/AccountActions/Login";
import Login from "../../../components/customer/AccountComponents/Login";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => {
      dispatch(reset());
    },
    onSendLogin: (username, password) => {
      dispatch(sendLogin(username, password));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
