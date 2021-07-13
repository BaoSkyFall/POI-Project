import React, { Component } from 'react'
import "antd/dist/antd.css";
import './recharge.css'
import { Card, Col, Row, Button, Form, Input, InputNumber, message, Spin } from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;

class Recharge extends Component {
    formRef = React.createRef();

    componentWillMount() {
        console.log('componentWillMount:')

        this.props.resetStatusRechargeSearch();

    }
    componentDidMount() {
        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 200) {
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var dt = {
                walletNumber: values.accountNumber,
                amount: values.amount
            }
            console.log('dt:', dt)
            var accessToken = window.localStorage.getItem('accesstoken')
            this.props.updateBalance(dt, accessToken)
        });
    }
    componentDidUpdate() {
        var data = this.props.recharge
        console.log('data:', data);
        this.formRef.current.setFieldsValue(data)


    }
    showAlert = () => {
        console.log("recharge props: ", this.props)
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
    onFinish = (values) => {

        console.log('values:', values)
        let accessToken = window.localStorage.getItem('accesstoken');
        let data = {
            username: values.username,
            id: values.walletNumber,

            money: values.amount
        }
        this.props.updateBalance(data, accessToken)
    }
    showAlertSearching = () => {
        var { isSearchIdSuccess, isSearchIdFail, walletNumber } = this.props.recharge;
        if (walletNumber) {
            if (isSearchIdSuccess) {
                // message.success(`Find info success with name: ${name}`, 3);
                // this.props.resetStatusSearch();
                // this.props.resetStatusRechargeSearch();
            }
            else if (isSearchIdFail) {
                // message.error("Can't find info from your Input, please check again!", 3)
                // this.props.resetStatusRechargeSearch();

                // this.props.resetStatusSearch();
                // } else if (isLoading) {
                //     return (
                //         <Row className="progress">
                //             <Spin tip="Loading..." />
                //         </Row>
                //     );
            }
        }



    }
    render() {
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
        var accessToken = window.localStorage.getItem('accesstoken');
        var data = this.props.recharge;
        return (
            <div>
                <Card title="Recharge" bordered={false} style={{ width: "100%" }}>

                    <Row className="Search">
                        <Col offset={8} span={8}>

                            <Search
                                placeholder="Input Wallet ID"
                                enterButton="Search"
                                size="large"
                                type="number"
                                // value="phanhaibinh"
                                onSearch={(defaultValue) => {
                                    this.formRef.current.setFieldsValue({ amount: '' })

                                    this.props.searchAccount(defaultValue, accessToken)
                                }}
                            />
                            {this.showAlertSearching()}
                        </Col>
                    </Row>

                    <Form
                        ref={this.formRef}

                        onFinish={this.onFinish} className="submitRecharge">
                        <div style={{ background: '#ECECEC', padding: '30px' }}>


                            <FormItem
                                {...formItemLayout}
                                label="ID Wallet: "
                                name="walletNumber"
                                type="walletNumber"


                            >
                                <Input type="text" defaultValue={""} disabled={true} />



                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Full Name"
                                name="name"
                            >

                                <Input type="text" defaultValue={""} disabled={true} />

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Username"
                                name="username"
                            >

                                <Input type="text" defaultValue={""} disabled={true} />

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Identity Number"
                                name="identityNumber"

                            >


                                <Input type="text" defaultValue={""} disabled={true} />

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Balance"
                                name="balance"

                            >


                                <InputNumber className="inputAmount"
                                    disabled={true}
                                    onChange={(e) => { }}
                                    formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Amount"
                                name="amount"
                            >


                                <InputNumber className="inputAmount"
                                    onChange={(e) => { }}
                                    formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                />

                            </FormItem>
                            {this.showAlert()}

                            <FormItem>
                                <Button className="buttonRegister"
                                    type="primary" htmlType="submit"

                                >
                                    ADD MONEY
                                </Button>
                            </FormItem>


                        </div>
                    </Form >
                </Card>

            </div>
        )
    }
}

const recharge = Recharge;
export default recharge;
