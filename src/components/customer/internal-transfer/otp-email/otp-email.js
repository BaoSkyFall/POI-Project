import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Form, Button, Spin, notification, Icon } from 'antd';

import './otp-email.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY, MENUITEM } from '../../../../configs/client';

class OTPEmail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisabled: true,
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, accessToken } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.verifyTransaction(email, this.props.idTransaction, values.otpNumbers, accessToken)
            }
        });
    }

    handleChangeOtp = (otp) => {
        if (otp.length < 6) {
            this.setState({ isDisabled: true });
        }
        else {
            this.setState({ isDisabled: false });
        }
    }

    render() {
        const { messageError, messageSuccess, isLoading, idTransaction } = this.props;
        if (!idTransaction) {
            return (
                <Redirect to={MENUITEM.INTERNAL_TRANSFER}/>
            )
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6, offset: 1 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12, offset: 4 },
            },
        };

        const { getFieldDecorator } = this.props.form;

        const contentLayout = (
            
            <Form className='otp-email' onSubmit={this.handleSubmit}>
                <center><h2>Successfull!</h2></center>
                <center><p>Your request has been received. We have send a confirmation mail to your email. Please check your email and enter the OTP to continue</p></center>
                <Form.Item
                    {...formItemLayout}
                >
                    {getFieldDecorator('otpNumbers')(
                        <OtpInput
                            onChange={otp => this.handleChangeOtp(otp)}
                            numInputs={6}
                            separator={<span>-</span>}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        icon="like"
                        htmlType="submit"
                        size='large'
                        disabled={this.state.isDisabled}>
                        Verify Email
                    </Button>
                </Form.Item>
            </Form>
        )

        return (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <Icon type="warning" style={{ color: 'red' }} />,
                    }) : null}

                {messageSuccess ?
                    notification.open({
                        message: messageSuccess,
                        icon: <Icon type="info" style={{ color: 'blue' }} />,
                    }) : null}

                {messageSuccess ?
                    <Redirect to={MENUITEM.INTERNAL_TRANSFER}/> : null}

                {messageSuccess || messageError ? this.props.resetStore(): null}
                
                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                    )}

                {!isLoading && contentLayout}
                
            </React.Fragment>
        )
    }
}

export default Form.create()(OTPEmail);