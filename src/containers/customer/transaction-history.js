import React from 'react';
import { connect } from 'react-redux';
import TransactionHistory from '../../components/customer/transaction-history/transaction-history';
import { fetchTransactionHistory, resetStore } from '../../actions/customer/transaction-history';

const mapStateToProps = (state) => {
  return {
    isLoading: state.transactionHistoryReducer.isLoading,
    transactionHistory: state.transactionHistoryReducer.transactionHistory,
    messageError: state.transactionHistoryReducer.messageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransactionHistory: (email, accessToken) => dispatch(fetchTransactionHistory(email, accessToken)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
