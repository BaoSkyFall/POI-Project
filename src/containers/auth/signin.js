import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../../components/auth/signin';
import { doSignIn, resetStatus, verifyAccessToken } from '../../actions/auth';
import { loadReCaptcha } from 'react-recaptcha-google';

import { ACCESS_TOKEN_KEY } from '../../configs/client';

class SignInContainer extends Component {
  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <div>
        <SignIn {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    signinSuccess: state.authReducer.signinSuccess,
    messageError: state.authReducer.messageError,
    email: state.authReducer.email,
    role: state.authReducer.role
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignIn: (infoUser) => dispatch(doSignIn(infoUser)),
    verifyAccessToken: (accessToken) => dispatch(verifyAccessToken(accessToken)),
    resetStatus: () => dispatch(resetStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
