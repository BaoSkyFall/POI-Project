import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from '../../components/auth/signup';
import { doSignUp } from '../../actions/auth';

class SignUpContainer extends Component {
  render() {
    return (
      <div>
        <SignUp {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    signupSuccess: state.authReducer.signupSuccess,
    signupFail: state.authReducer.signupFail,
    messageError: state.authReducer.messageError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (infoUser) => dispatch(doSignUp(infoUser)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
