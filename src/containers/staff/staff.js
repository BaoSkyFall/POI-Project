import React, { Component } from 'react';
import PageStaff from './../../components/staffs/index/index';
import { connect } from 'react-redux';
import { actRegisterUserRequest, actResetStatusRegisterAcount } from '../../actions/staff/register';
import { actSearchUserRequest, actRegisterPaymentRequest, actSearchUserReset } from '../../actions/staff/payment';
import { actSearchAccountRequest, actRechargeRequest, actResetStatus, actResetStatusRecharge, actRechargeReset } from '../../actions/staff/recharge';

class Staff extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <PageStaff {...this.props} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerState: state.accountUser,
        paymentAccount: state.paymentAccount,
        recharge: state.recharge
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onRegister: (data,accessToken) => {
            dispatch(actRegisterUserRequest(data, accessToken));
        },
        resetStatus: () =>{
            dispatch(actResetStatusRegisterAcount());
        },
        searchUser: (username, accessToken) => {
            dispatch(actSearchUserRequest(username, accessToken));
        },
        registerPayment: (data, accessToken) => {
            dispatch(actRegisterPaymentRequest(data, accessToken));
        },
        searchAccount: (id, accessToken) => {
            dispatch(actSearchAccountRequest(id, accessToken));
        },
        resetStatusSearch: () =>{
            dispatch(actSearchUserReset());
        },
        resetStatusRechargeSearch: ()=>{
            dispatch(actResetStatusRecharge());
        },
        searchReset:()=>{
            dispatch(actResetStatus())
        },
        updateBalance: (data, accessToken) =>{
            dispatch(actRechargeRequest(data, accessToken));
        },
        resetUpdate: () =>{
            dispatch(actRechargeReset());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Staff);