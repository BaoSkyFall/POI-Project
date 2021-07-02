import React, { Component } from "react";
import { connect } from "react-redux";
import ForgetPassword from "../../components/auth/forgetPassword";
import { doSendOTP, doSendNewPassword } from "../../actions/auth";

class ForgetPasswordContainer extends Component {
  render() {
    return (
      <div>
        <ForgetPassword {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.forgetPasswordReducer.step,
    email: state.forgetPasswordReducer.email,
    errorMessage: state.forgetPasswordReducer.errorMessage,
    isLoading: state.forgetPasswordReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendOTP: (email) => dispatch(doSendOTP(email)),
    sendNewPassword: (otp, time, NewPassword, email) =>
      dispatch(doSendNewPassword(otp, time, NewPassword, email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPasswordContainer);
