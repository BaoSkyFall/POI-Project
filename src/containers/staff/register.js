import React, { Component } from 'react';
import PageStaff from './../../components/staffs/index/index';
import { connect } from 'react-redux';
import { actRegisterUserRequest } from '../../actions/staff/register';

class RegisterContainer extends Component {
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

const mapStateToProps = (state) =>{
    return{
        registerState: state.accountUser
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onRegister: (data) => {
            dispatch(actRegisterUserRequest(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);