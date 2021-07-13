import React from 'react';
import "./content-register.css";

import {
    Form, Input, Button, Spin, notification, Row, DatePicker, message, Card
} from 'antd';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import { ACCESS_TOKEN_KEY, } from '../../../configs/client';
const FormItem = Form.Item;
message.config({
    left: 100,
});

class FormRegister extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 200) {
        //         localStorage.setItem(EMAIL_KEY, res.data.email)
        //         localStorage.setItem('role', res.data.role)
        //         if (res.data.role !== 'staff') 
        //             window.location.href = '/signin';
        //     }
        //     else {
        //         localStorage.removeItem(ACCESS_TOKEN_KEY);
        //         localStorage.removeItem(EMAIL_KEY);
        //         localStorage.removeItem('role');
        //         window.location.href = '/signin';
        //     }
        // })
    }



    showAlert = () => {
        var { isSuccess, isFailed, isLoading, messageError } = this.props.registerState;
        if (isSuccess) {
            notification.open({
                message: `Create Customer Success `,
                icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                description: 'Your customer created has been stored in database'
            })
        } else if (isFailed) {
            notification.open({
                message: `Create Customer Fail `,
                icon: <CloseOutlined style={{ color: 'red' }} />,
                description: 'Please check your input is valid'
            })
            this.props.resetStatus();
        } else if (isLoading) {
            return (
                <Row className="progress">
                    <Spin className="spn" tip="Loading..." />
                </Row>
            );
        }
    }
    onFinish = (values) => {
        values.dob = values.dob.format('YYYY-MM-DD');
        delete values.confirm;
        values.role = 1;
        let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        this.props.onRegister(values, accessToken);
    }
    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8 },
                lg: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 16 },
                lg: { span: 16 },
            },
        };


        return (
            <React.Fragment>
                <Form
                    initialValues={{ indentity_number: '025845999', phone: '0909909999', name: 'Phan Hải Bình', username: 'phanhaibinh', password: 'phanhaibinh', email: 'phanhaibinh@gmail.com', confirm: 'phanhaibinh' }}
                    onFinish={this.onFinish} className="cardRegister">
                    <Card
                        title="Personal Infomation"
                        style={{ width: "90%" }}
                    >

                        <FormItem
                            className="itemForm"
                            {...formItemLayout}
                            label="Full Name"
                            name="name"
                            rules={[
                                {
                                    type: 'string', message: 'The input is not valid ',
                                }, {
                                    required: true, message: 'Please input your Full Name!',
                                }]}
                        >

                            <Input name="name" type="text" style={{ width: "50%" }}
                            />

                        </FormItem>
                        <FormItem
                            className="itemForm"
                            label="Birth Date"
                            {...formItemLayout}
                            name="dob"
                            rules={[
                                {
                                    required: true, message: 'Please input your Birthday',
                                }]}

                        >

                            <DatePicker
                                format='DD-MM-YYYY'
                                className="aaa"
                            />

                        </FormItem>
                        <FormItem
                            className="inputP"
                            {...formItemLayout}
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >

                            <Input type="number" addonBefore="+84" />

                        </FormItem>

                        <FormItem
                            className="itemForm"
                            label="Indentity Number"
                            {...formItemLayout}
                            name="indentity_number"
                            rules={[{
                                required: true, message: 'Please input your Identity Number',
                            }]}
                        >
                            <Input type="number" name="indentity_number" />


                        </FormItem>

                    </Card>
                    <Card
                        title="Login Infomation"
                        style={{ width: "90%" }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="E-mail"
                            name="email"
                            rules={[{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }]}

                        >

                            <Input name="email" />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Username"
                            name="username"
                            rules={[{
                                type: 'string', message: 'The input is not valid Username!',
                            }, {
                                required: true, message: 'Please input your Username!',
                            }]}

                        >

                            <Input name="email" />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password"
                            name="password"

                            rules={[{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }]}
                        >

                            <Input type="password"
                                // onChange={handleChange} onChange={handleChange} 
                                name="password" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                            name="confirm"
                            dependencies={['password']}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >

                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        </FormItem>
                    </Card>
                    {this.showAlert()}
                    <Row className="cssCenter">
                        <FormItem>
                            <Button className="buttonRegister"
                                type="primary" htmlType="submit"
                            >
                                Register
                            </Button>
                        </FormItem>
                    </Row>
                </Form>

            </React.Fragment>
        );
    }
}

export default FormRegister
