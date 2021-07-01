import React from 'react';
import { connect } from 'react-redux';
import DestinationManagement from '../../components/customer/destination-management/destination-management';
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

export default connect(mapStateToProps, mapDispatchToProps)(DestinationManagement);
