import React from 'react';
import { connect } from 'react-redux';
import SetupRecipient from '../../components/customer/setup-recipient/setup-recipient';
import {
  fetchRecipients,
  updateRecipient,
  deleteRecipient,
  resetStore,
  addRecipientLocal,
  addRecipientForeign,
  toggleModalAddRecipient,
  changeTabPanel
} from '../../actions/customer/setup-recipient';
import {
  trackRecipientLocal,
  trackRecipientForeign,
} from '../../actions/customer/internal-tranfer'
const mapStateToProps = (state) => {
  return {
    isLoading: state.setupRecipientReducer.isLoading,
    isShowModalAddRecipient: state.setupRecipientReducer.isShowModalAddRecipient,
    recipients: state.setupRecipientReducer.recipients,
    messageSuccess: state.setupRecipientReducer.messageSuccess,
    messageError: state.setupRecipientReducer.messageError,
    isLocalAdd: state.setupRecipientReducer.isLocalAdd,
    bankRecipient: state.internalTransferReducer.bankRecipient,
    fullNameRecipient: state.internalTransferReducer.fullNameRecipient,
    usernameRecipient: state.internalTransferReducer.usernameRecipient,
    isLocalRecipient: state.internalTransferReducer.isLocalRecipient,
    messageErrorAddModal: state.internalTransferReducer.messageError,
    messageSuccessAddModal:state.internalTransferReducer.messageSuccess
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipients: (id, accessToken) => dispatch(fetchRecipients(id, accessToken)),
    addRecipientLocal: (username, receiverWalletNumber, remindName,usernameRecipient,isLocalAdd, accessToken) => dispatch(addRecipientLocal(username, receiverWalletNumber, remindName,usernameRecipient,isLocalAdd, accessToken)),
    addRecipientForeign: (username, receiverWalletNumber, remindName,bankLinkId,isLocalAdd, accessToken) => dispatch(addRecipientForeign(username, receiverWalletNumber, remindName,bankLinkId,isLocalAdd, accessToken)),
    updateRecipient: (email, walletNumber, remindName,walletId,recipients, accessToken) => dispatch(updateRecipient(email, walletNumber, remindName, walletId,recipients,accessToken)),
    deleteRecipient: (data, recipients, accessToken) => dispatch(deleteRecipient(data, recipients, accessToken)),
    resetStore: () => dispatch(resetStore()),
    toggleModalAddRecipient: (isShowModalAddRecipient) => dispatch(toggleModalAddRecipient(isShowModalAddRecipient)),
    trackRecipientLocal: (walletNumber, accessToken) => dispatch(trackRecipientLocal(walletNumber, accessToken)),
    trackRecipientForeign: (bankid,walletNumber, accessToken) => dispatch(trackRecipientForeign(bankid,walletNumber, accessToken)),
    changeTabPanel: () => dispatch(changeTabPanel()),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupRecipient);
