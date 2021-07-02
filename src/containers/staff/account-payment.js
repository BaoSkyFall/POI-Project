import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageStaff from './../../components/staffs/index/index';
import { actSearchUserRequest, actRegisterPaymentRequest,fetchTransactionHistoryLocalByUserName } from '../../actions/staff/payment';

class PaymentContainer extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <React.Fragment>
                <PageStaff {...this.props} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSearchFailed: state.paymentAccount.isSearchFailed,
        isSearchLoading: state.paymentAccount.isSearchLoading,
        isSearchSuccess: state.paymentAccount.isSearchSuccess,
        isSuccess: state.paymentAccount.isSuccess,
        isFailed: state.paymentAccount.isFailed,
        isLoading: state.paymentAccount.isLoading,
        username: state.paymentAccount.username,
        name: state.paymentAccount.name,
        email: state.paymentAccount.email,
        phone: state.paymentAccount.phone,
        indenityNumber: state.paymentAccount.indenityNumber,
        dob: state.paymentAccount.dob,
        walletNumber: state.paymentAccount.walletNumber,
        balance: state.paymentAccount.balance,
        messageError: state.paymentAccount.messageError,
        transactionHistory: state.paymentAccount.transactionHistory
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchUser: (username) => {
            dispatch(actSearchUserRequest(username));
        },
        registerPayment: (data) => {
            dispatch(actRegisterPaymentRequest(data));
        },
        fetchTransactionHistoryLocalByUserName: (username, accessToken,isAll=true)=>{
            dispatch(fetchTransactionHistoryLocalByUserName(username, accessToken,isAll=true))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);
