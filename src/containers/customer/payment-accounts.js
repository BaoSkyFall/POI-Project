import React from 'react';
import { connect } from 'react-redux';
import PaymentAccounts from '../../components/customer/payment-accounts/payment-accounts';
import { fetchPaymentAccounts, resetStore, toggleModal } from '../../actions/customer/payment-accounts';

const mapStateToProps = (state) => {
  return {
    isLoading: state.paymentAccountsReducer.isLoading,
    paymentAccounts: state.paymentAccountsReducer.paymentAccounts,
    messageError: state.paymentAccountsReducer.messageError,
    isShowModal: state.paymentAccountsReducer.isShowModal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPaymentAccounts: (email, accessToken) => dispatch(fetchPaymentAccounts(email, accessToken)),
    resetStore: () => dispatch(resetStore()),
    toggleModal: (number) => dispatch(toggleModal(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAccounts);
