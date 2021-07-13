import React from 'react';
import './content-payment.css';

import {
    Form, Input, Table, Col, Row, message, Spin, InputNumber
} from 'antd';

import "antd/dist/antd.css";
import { ACCESS_TOKEN_KEY } from '../../../configs/client';
import { formatDate } from '../../../ultis/dateFormat';


const FormItem = Form.Item;
const Search = Input.Search;



class FormPayment extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.columns = [{
            title: 'From Origin Wallet',
            dataIndex: 'user',
            defaultSortOrder: 'descend',
            width: '18%',
            // sorter: (a, b) => a.user - b.user,
        }, {
            title: 'To Destination Wallet',
            dataIndex: 'partner',
            width: '18%',
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.partner - b.partner,
        },
            , {
            title: 'Action',
            className: 'column-money',
            dataIndex: 'type',
            width: '13%',
            // sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: 'Date',
            dataIndex: 'time',
            // defaultSortOrder: 'descend',
            width: '20%',
            // sorter: (a, b) => a.time.localeCompare(b.time),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'money_transfer',
            // defaultSortOrder: 'descend',
            width: '15%',
            render: values => (

                <span className="">
                    {values > 0 ? '+' + values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                    } đ
                </span>

            ),
            sorter: (a, b) => a.money_transfer - b.money_transfer,
        }, {
            title: "Description",
            dataIndex: 'description',
            // defaultSortOrder: 'descend',
        }];
    }

    componentDidUpdate() {
        console.log('formRef:', this.formRef.current)
        let data = this.props.paymentAccount;
        if (data.dob)
            data.dob = formatDate(data.dob, 'DD-MM-YYYY');
        this.formRef.current.setFieldsValue(data)
    }
    componentWillUnmount() {

    }
    componentDidMount() {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';

        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.status === 200) {
        //             localStorage.setItem(EMAIL_KEY, res.data.email)
        //             localStorage.setItem('role', res.data.role)
        //             if (res.data.role !== 'staff')
        //                 window.location.href = '/signin';
        //         }
        //         else {
        //             localStorage.removeItem(ACCESS_TOKEN_KEY);
        //             localStorage.removeItem(EMAIL_KEY);
        //             localStorage.removeItem('role');
        //             window.location.href = '/signin';
        //         }
        //     })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, defaultValues) => {
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
        var { isSuccess, isFailed, isLoading, walletNumber, messageError } = this.props.paymentAccount;
        if (isSuccess) {
            message.success(`Find an info with wallet Number is: ${walletNumber}`, 8);
            this.props.resetStatusSearch();
        } else if (isFailed) {
            message.error('Cannot find user!', 3)
            this.props.resetStatusSearch();
        } else if (isLoading) {
            return (
                <Row className="progress">
                    <Spin tip="Loading..." />
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
        } 
        // else if (isSearchFailed) {
        //     message.error("Username is not exist!", 3)
        //     this.props.resetStatusSearch();
        // }
    }

    validateToNextPassword = (rule, defaultValue, callback) => {
        const form = this.props.form;
        if (defaultValue && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    compareToFirstPassword = (rule, defaultValue, callback) => {
        const form = this.props.form;
        if (defaultValue && defaultValue !== form.getFielddefaultValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }


    render() {
        var { walletNumber,transactionHistory, name, dob, phone, indenityNumber, balance, email } = this.props.paymentAccount;
        const {} =this.props;
        var data = this.props.paymentAccount;
        console.log(' this.props.paymentAccount:',  this.props);
                console.log('data:', data)
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
        return (
            <div>
                <Row className="Search">
                    <Col offset={8} span={8}>

                        <Search
                            placeholder="Input username"
                            enterButton="Search"
                            size="large"
                            // value="phanhaibinh"
                            onSearch={(defaultValue) => { this.props.searchUser(defaultValue, accessToken)
                                                        this.props.fetchTransactionHistoryLocalByUserName(defaultValue, accessToken);
                                                        }}
                        />
                    </Col>
                </Row>
                <Row className="errorAlert">
                    <Col span={8}></Col>
                    {this.showAlertSearch()}
                    <Col span={8}></Col>
                </Row>
                <hr />
                <Row className="displaySearch">
                    {/* <Col span={15} offset={8}>

                        <Input addonBefore="Wallet Number" value={walletNumber} type="text" disabled={true} />
                        <Input addonBefore="Email" value={email} type="text" disabled={true} />
                        <Input addonBefore="Full Name" value={name} type="text" disabled={true} />
                        <Input addonBefore="Phone" value={phone} type="text" disabled={true} />
                        <Input addonBefore="Identity Number" value={indenityNumber} type="text" disabled={true} />
                        <Input addonBefore="Balance" value={balance} type="text" disabled={true} />
                        <Input addonBefore="Day of Birth" value={dob} type="text" disabled={true} />

                    </Col> */}
                    <Form initialValues={data}
                        ref={this.formRef}
                        className="form-signin">

                        <FormItem
                            {...formItemLayout}
                            label="Wallet Number"
                            name="walletNumber"
                        >
                            <Input value={walletNumber} type="text" disabled={true} />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Email"
                            name="email"

                        >


                            <Input type="text" disabled={true} />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Full Name"
                            name="name"
                        >

                            <Input type="text" disabled={true} />

                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Phone"
                            name="phone"

                        >


                            <Input type="text" disabled={true} />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Identity Number"
                            name="idenityNumber"

                        >


                            <Input type="text" disabled={true} />

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

                        <Row>
                            <Col span={12} className="date">
                                <FormItem
                                    {...formItemLayout}
                                    label="Birth Date"
                                    name="dob"
                                >

                                    <Input type="text" disabled={true} className="dateInput" />

                                </FormItem>
                            </Col>
                        </Row>

                        {this.showAlertRegister()}

                    </Form>
                </Row>

                <hr />
                <Table
                    columns={this.columns}
                    dataSource={transactionHistory}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '80vh' }}
                    bordered />
            </div>
        );
    }
}

const Payment = FormPayment;
export default Payment;


