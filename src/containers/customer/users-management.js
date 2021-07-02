import React from 'react';
import { connect } from 'react-redux';
import UsersManagement from '../../components/customer/users/users';
import { fetchTransactionHistoryLocal, resetStore } from '../../actions/customer/transaction-history';

const mapStateToProps = (state) => {
  return {
    isLoading: state.transactionHistoryReducer.isLoading,
    transactionHistory: state.transactionHistoryReducer.transactionHistory,
    messageError: state.transactionHistoryReducer.messageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransactionHistoryLocal: (id, accessToken,isAll) => dispatch(fetchTransactionHistoryLocal(id, accessToken,isAll)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
