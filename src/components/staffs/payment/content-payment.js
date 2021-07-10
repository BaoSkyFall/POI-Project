import React from 'react';
import { Link } from 'react-router-dom';
import './FormPayment.css';

import {
    Form, Input, Button, Col, Row, Radio, InputNumber, message, Spin, Progress
} from 'antd';
import "antd/dist/antd.css";
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { URL_SERVER } from '../../../configs/server';

const FormItem = Form.Item;
const Search = Input.Search;



class FormPayment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
        fetch(`${URL_SERVER}/user/me`, {
            headers: {
                x_accesstoken: accessToken
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem(EMAIL_KEY, res.data.email)
                localStorage.setItem('role', res.data.role)
                if (res.data.role !== 'staff') 
                    window.location.href = '/signin';
            }
            else {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(EMAIL_KEY);
                localStorage.removeItem('role');
                window.location.href = '/signin';
            }
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var dt = {
                    "email": this.props.paymentAccount.email,
                }
                var accessToken = window.localStorage.getItem('accesstoken')
                this.props.registerPayment(dt, accessToken);
            }
        });
    }


    showAlertRegister = () => {
        var { isSuccess, isFailed, isLoading, walletNumber,massageError } = this.props.paymentAccount;
        if (isSuccess) {
            message.success(`Your new wallet number is: ${walletNumber}`, 8);
            this.props.resetStatusSearch();
        } else if (isFailed) {
            message.error('Register Error!', 3)
            this.props.resetStatusSearch();
        } else if (isLoading) {
            return (
                <Row className="progress">
                    <Spin tip="Loading..."/>
                </Row>
            );
        }
    }

    showAlertSearch = () => {
        var { isSearchFailed, isSearchLoading } = this.props.paymentAccount;
        if (isSearchLoading) {
            return (
                <Col className="showAlert" span={8}>
                    <Spin tip={"Loading..."} />
                </Col>

            );
        } else if (isSearchFailed) {
            message.error("Username is not exist!", 3)
            this.props.resetStatusSearch();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }


    render() {
        var { fullName, birthday, phone, walletNumber } = this.props.paymentAccount;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        var accessToken = window.localStorage.getItem('accesstoken');
        return (
            <div>
                <Row className="Search">
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Search
                            placeholder="Input username"
                            enterButton="Search"
                            size="large"
                            onSearch={(value) => { this.props.searchUser(value, accessToken) }}
                        />
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row className="errorAlert">
                    <Col span={8}></Col>
                    {this.showAlertSearch()}
                    <Col span={8}></Col>
                </Row>
                <hr />
                <Row >
                    <Form onSubmit={this.handleSubmit} className="form-signin">
                        <FormItem
                            {...formItemLayout}
                            label="Full Name"
                        >
                            {getFieldDecorator('fullname',
                                { initialValue: fullName || null },
                                {
                                    rules: [
                                    ],
                                })(
                                    <Input type="text" disabled={true} />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Phone"
                        >
                            {getFieldDecorator('phone',
                                { initialValue: phone || null },
                                {
                                    rules: [
                                    ],
                                })(
                                    <Input type="text" disabled={true} />
                                )}
                        </FormItem>
                        <Row>
                            <Col span={12} className="date">
                                <FormItem
                                    {...formItemLayout}
                                    label="Birth Date"
                                >
                                    {getFieldDecorator('date',
                                        { initialValue: birthday || null },
                                        {
                                            rules: [
                                            ],
                                        })(
                                            <Input type="text" disabled={true} className="dateInput" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        {this.showAlertRegister()}
                        <Button type="primary" htmlType="submit" className="form-signin-button">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </div>
        );
    }
}

const Payment = Form.create()(FormPayment);
export default Payment;


