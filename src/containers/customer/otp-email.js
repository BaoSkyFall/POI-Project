import React, { Component } from 'react'
import { connect } from 'react-redux';
import OTPEmail from '../../components/customer/internal-transfer/otp-email/otp-email';
import { 
  resetStore,
  verifyTransaction,  
} from '../../actions/customer/internal-transfer';

const mapStateToProps = (state) => {
  return {
    isLoading: state.internalTransferReducer.isLoading,
    isShowModal: state.internalTransferReducer.isShowModal,
    idTransaction: state.internalTransferReducer.idTransaction,
    messageSuccess: state.internalTransferReducer.messageSuccess,
    messageError: state.internalTransferReducer.messageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyTransaction: (email, id, OTP, accessToken) => dispatch(verifyTransaction(email, id, OTP, accessToken)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPEmail);
