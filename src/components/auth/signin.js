import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Checkbox, Spin, Alert
} from 'antd';

import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../configs/client';
import './styles/signin.css';

const FormItem = Form.Item;
class SignInForm extends React.Component {

    state = {
        isCheckGoogleCaptcha: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSignIn(values);
            }
        });
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const email = localStorage.getItem(EMAIL_KEY) || '';
        const role = localStorage.getItem('role') || '';

        if (email) {
            this.props.resetStatus();
            if (role === 'customer')
                return (<Redirect to={{
                    pathname: '/dashboard/payment-accounts',
                }}/>);
            else if (role === 'staff') {
                return (<Redirect to={{
                    pathname: '/staff/register',
                }}/>);
            }
            else {
                return (<Redirect to={{
                    pathname: '/signin',
                }}/>);
            }
        }
        else {
            if (this.props.signinSuccess) {
                const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
                this.props.verifyAccessToken(accessToken)
            }
        }

        const formLayout = (
            <React.Fragment>
                {this.props.messageError  && (
                    <Alert
                        message="Error"
                        description={this.props.messageError}
                        type="error"
                        showIcon />
                )}

                <br/>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>

             
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="form-signin-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="form-signin-button">
                        Sign In
                    </Button>
                </FormItem>
            </React.Fragment>
        );

        // if(this.props.role === 'customer'){
        //     return (<Redirect to={{
        //         pathname: '/dashboard',
        //     }}/>);
        // }else if(this.props.role === 'staff'){
        //     return (<Redirect to={{
        //         pathname: '/staff',
        //     }}/>);
        // }

        return (
            <Form onSubmit={this.handleSubmit} className="form-signin">
                <legend className="title-signin">
                    <h2>Sign In</h2>
                </legend>

                {this.props.isLoading && (
                    <Spin tip="Loading ..." size='large' >
                        {formLayout}
                    </Spin>
                )}
                {!this.props.isLoading && formLayout}
            </Form>
        );
    }
}

const SignIn = Form.create()(SignInForm);
export default SignIn;
