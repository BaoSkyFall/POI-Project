import React from 'react';
import { connect } from 'react-redux';
import SetupRecipient from '../../components/customer/setup-recipient/setup-recipient';
import {
  fetchRecipients,
  updateRecipient,
  deleteRecipient,
  resetStore,
  addRecipient,
  toggleModalAddRecipient
} from '../../actions/customer/setup-recipient';

const mapStateToProps = (state) => {
  return {
    isLoading: state.setupRecipientReducer.isLoading,
    isShowModalAddRecipient: state.setupRecipientReducer.isShowModalAddRecipient,
    recipients: state.setupRecipientReducer.recipients,
    messageSuccess: state.setupRecipientReducer.messageSuccess,
    messageError: state.setupRecipientReducer.messageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipients: (email, accessToken) => dispatch(fetchRecipients(email, accessToken)),
    addRecipient: (email, receiverWalletNumber, remindName, accessToken) => dispatch(addRecipient(email, receiverWalletNumber, remindName, accessToken)),
    updateRecipient: (email, walletNumber, remindName, accessToken) => dispatch(updateRecipient(email, walletNumber, remindName, accessToken)),
    deleteRecipient: (email, walletNumber, accessToken) => dispatch(deleteRecipient(email, walletNumber, accessToken)),
    resetStore: () => dispatch(resetStore()),
    toggleModalAddRecipient: (isShowModalAddRecipient) => dispatch(toggleModalAddRecipient(isShowModalAddRecipient))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupRecipient);
