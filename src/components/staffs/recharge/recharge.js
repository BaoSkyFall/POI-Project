import React, { Component } from 'react'
import "antd/dist/antd.css";
import './recharge.css'
import { Card, Row, Button, Form, Input, InputNumber, message, Spin } from 'antd';
import { URL_SERVER } from '../../../configs/server';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
const FormItem = Form.Item;
class Recharge extends Component {
    constructor(props) {
        super(props)

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
            var dt = {
                walletNumber: values.accountNumber,
                amount: values.Amount
            }
            var accessToken = window.localStorage.getItem('accesstoken')
            this.props.updateBalance(dt, accessToken)
        });
    }

    showAlert = () => {
        var { isUpdateFail, isUpdateSuccess, isUpdateLoading } = this.props.recharge;
        if (isUpdateSuccess) {
            message.success('Recharge Success!', 3)
            this.props.resetUpdate();
        } else if (isUpdateFail) {
            message.error(`${'Error: Recharge Failed'}`)
            this.props.resetUpdate();
        } else if (isUpdateLoading) {
            return (
                <Row className="progress">
                    <Spin className="spn" tip="Loading..." />
                </Row>
            );
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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

        return (
            <Form onSubmit={this.handleSubmit} className="submitRecharge">
                <div style={{ background: '#ECECEC', padding: '30px' }}>

                    <Card title="Recharge" bordered={false} style={{ width: "100%" }}>

                        <FormItem
                            {...formItemLayout}
                            label="ID Wallet: "

                        >
                            {getFieldDecorator('accountNumber',
                                {
                                    rules: [
                                    ],
                                })(
                                    <Input type='number' />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Amount"
                        >
                            {getFieldDecorator('Amount',
                                //{ initialValue: balance ? balance : 0 }, 
                                {
                                    rules: [
                                    ],
                                })(
                                    <InputNumber className="inputAmount"
                                        onChange={(e) => { }}
                                        formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                    />
                                )}
                        </FormItem>
                        {this.showAlert()}
                        <Row >
                            <FormItem>
                                <Button className="buttonRegister"
                                    type="primary" htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </FormItem>
                        </Row>

                    </Card>
                </div>
            </Form >
        )
    }
}

const recharge = Form.create()(Recharge);
export default recharge;
