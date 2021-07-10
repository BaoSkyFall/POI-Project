import React, { Component } from 'react'
import { connect } from 'react-redux';
import InternalTransferPage from '../../components/customer/internal-transfer/internal-tranfer';
import { 
  fetchUserWallets, 
  fetchRecipients,
  resetStore,
  sendTransferInformation,
  toggleModalTransfer,
  trackRecipient,
} from '../../actions/customer/internal-transfer';
import { toggleModalAddRecipient, addRecipient } from '../../actions/customer/setup-recipient';

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
    recipients: state.internalTransferReducer.recipients,
    idTransaction: state.internalTransferReducer.idTransaction,
    emailRecipient: state.internalTransferReducer.emailRecipient,
    fullNameRecipient: state.internalTransferReducer.fullNameRecipient,
    messageSuccess: state.internalTransferReducer.messageSuccess || state.setupRecipientReducer.messageSuccess,
    messageError: state.internalTransferReducer.messageError || state.setupRecipientReducer.messageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserWallets: (email, accessToken) => dispatch(fetchUserWallets(email, accessToken)),
    fetchRecipients: (email, accessToken) => dispatch(fetchRecipients(email, accessToken)),
    sendTransferInformation: (email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken) => {
      return dispatch(sendTransferInformation(email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken));
    },
    toggleModalTransfer: (isShowModalTransfer) => dispatch(toggleModalTransfer(isShowModalTransfer)),
    toggleModalAddRecipient: (isShowModalAddRecipient) => dispatch(toggleModalAddRecipient(isShowModalAddRecipient)),
    addRecipient: (email, receiverWalletNumber, remindName, accessToken) => dispatch(addRecipient(email, receiverWalletNumber, remindName, accessToken)),
    trackRecipient: (walletNumber, accessToken) => dispatch(trackRecipient(walletNumber, accessToken)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalTransfer);
