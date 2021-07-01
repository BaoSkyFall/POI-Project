import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageStaff from './../../components/staffs/index/index';
import { actSearchUserRequest, actRegisterPaymentRequest } from '../../actions/staff/payment';

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
        paymentAccount: state.paymentAccount
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchUser: (username) => {
            dispatch(actSearchUserRequest(username));
        },
        registerPayment: (data) => {
            dispatch(actRegisterPaymentRequest(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);
