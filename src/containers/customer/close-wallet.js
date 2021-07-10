import React from 'react';
import { connect } from 'react-redux';
import CloseWallet from '../../components/customer/close-wallet/close-wallet';
import { fetchUserWallets , closeUserWallet, resetStore } from '../../actions/customer/close-wallet';

const mapStateToProps = (state) => {
  return {
    isLoading: state.closeWalletReducer.isLoading,
    userWallets: state.closeWalletReducer.userWallets,
    messageError: state.closeWalletReducer.messageError,
    messageSuccess: state.closeWalletReducer.messageSuccess,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserWallets: (email, accessToken) => dispatch(fetchUserWallets(email, accessToken)),
    closeUserWallet: (email, walletNumber, accessToken) => dispatch(closeUserWallet(email, walletNumber, accessToken)), 
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseWallet);
