import React, { Component } from 'react'
import { connect } from 'react-redux';
import InternalTransferPage from '../../components/customer/internal-tranfer/internal-tranfer';
import { 
  fetchUserWallets,
  fetchRecipientsLocal,
  fetchRecipientsForeign,
  sendTransferInformation,
  sendTransferInformationForegin,
  getOTP,
  setBalance,
  setValuesTranfer,
  // toggleModalAddRecipient,
  toggleModalTransfer,
  trackRecipientLocal,
  trackRecipientForeign,
  resetStore
} from '../../actions/customer/internal-tranfer';
import { toggleModalAddRecipient, addRecipientLocal } from '../../actions/customer/setup-recipient';

class InternalTransfer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <InternalTransferPage {...this.props}/>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
    return {
      isLoading: state.internalTransferReducer.isLoading,
      isShowModalTransfer: state.internalTransferReducer.isShowModalTransfer,
      isShowModalAddRecipient: state.setupRecipientReducer.isShowModalAddRecipient,
      userWallets: state.internalTransferReducer.userWallets,
      isLocal: state.internalTransferReducer.isLocal,
      recipientsLocal: state.internalTransferReducer.recipientsLocal,
      recipientsForeign: state.internalTransferReducer.recipientsForeign,
      balance: state.internalTransferReducer.balance,     
      idTransaction: state.internalTransferReducer.idTransaction,
      values: state.internalTransferReducer.values,
      emailRecipient: state.internalTransferReducer.emailRecipient,
      fullNameRecipient: state.internalTransferReducer.fullNameRecipient,
      bankRecipient: state.internalTransferReducer.bankRecipient,
      messageSuccess: state.internalTransferReducer.messageSuccess || state.setupRecipientReducer.messageSuccess,
      messageError: state.internalTransferReducer.messageError || state.setupRecipientReducer.messageError,
    }
  };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserWallets: (id, accessToken) => dispatch(fetchUserWallets(id, accessToken)),
    fetchRecipientsLocal: (email, accessToken) => dispatch(fetchRecipientsLocal(email, accessToken)),
    fetchRecipientsForeign: (email, accessToken) => dispatch(fetchRecipientsForeign(email, accessToken)),
    sendTransferInformation: (email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken) => {
      return dispatch(sendTransferInformation(email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken));
    },
    sendTransferInformationForegin: (data,accessToken) => {
      return dispatch(sendTransferInformationForegin(data,accessToken));
    },
    
    toggleModalTransfer: () => dispatch(toggleModalTransfer()),
    toggleModalAddRecipient: (isShowModalAddRecipient) => dispatch(toggleModalAddRecipient(isShowModalAddRecipient)),
    addRecipientLocal: (username, receiverWalletNumber, remindName,usernameRecipient,isLocalAdd, accessToken) => dispatch(addRecipientLocal(username, receiverWalletNumber, remindName,usernameRecipient,isLocalAdd, accessToken)),
    // addRecipientForeign: (username, receiverWalletNumber, remindName,bankLinkId,isLocalAdd, accessToken) => dispatch(addRecipientForeign(username, receiverWalletNumber, remindName,bankLinkId,isLocalAdd, accessToken)),
    trackRecipientLocal: (walletNumber, accessToken) => dispatch(trackRecipientLocal(walletNumber, accessToken)),
    trackRecipientForeign: (walletNumber, accessToken) => dispatch(trackRecipientForeign(walletNumber, accessToken)),
    setBalance: (balance) => dispatch(setBalance(balance)),
    setValuesTranfer:(values) =>dispatch(setValuesTranfer(values)),
    getOTP:(email,accessToken) =>dispatch(getOTP(email,accessToken)),
    
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalTransfer);
