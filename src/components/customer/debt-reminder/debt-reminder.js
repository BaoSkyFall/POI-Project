import React from 'react';
import { Table, notification, Spin, Card, Row, InputNumber, Col, Popconfirm, Button, Modal, Form, Input } from 'antd';
import { PlusSquareOutlined, RetweetOutlined, DeleteFilled, TransactionOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

import './debt-reminder.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../ultis/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined, InfoCircleOutlined, MailFilled } from '@ant-design/icons';
import jwt from 'jwt-decode';

class DebtReminder extends React.Component {
    formRef = React.createRef();
    formRef2 = React.createRef();
    inputRef = React.createRef();

    constructor(props) {
        super(props);

        this.columnsDebtReminders = [{
            title: 'Creditor',
            dataIndex: 'creditor',
            // defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.creditor.localeCompare(b.creditor),
        }, {
            title: 'Wallet ID',
            dataIndex: 'walletID',
            width: '18%',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.walletID - b.walletID,
        }, {
            title: 'Date Create',
            dataIndex: 'dateCreate',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.dateCreate.localeCompare(b.dateCreate),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'money_debt',
            defaultSortOrder: 'descend',
            render: values => (

                <span className="">
                    {values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    } đ
                </span>

            ),
            width: '15%',
            sorter: (a, b) => a.money_debt - b.money_debt,
        }, {
            title: "Description",
            dataIndex: 'description',
            defaultSortOrder: 'descend',
        }, {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.status - b.status,

            render: (values) => {

                return (
                    values.status == 0 ?
                        <a onClick={() => { this.showPayDebtModalInComponent(values) }} style={{ color: '#1890ff', fontSize: '15px' }}><TransactionOutlined style={{ marginRight: '4px' }} />Pay
                    </a> : <p style={{ color: 'green', fontSize: '15px', }}><CheckCircleFilled style={{ marginRight: '4px' }} />Paid</p>
                )
            }

        },];
        this.columnsDebtOwners = [{
            title: 'Debtor',
            dataIndex: 'debtor',
            // defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.debtor.localeCompare(b.debtor),
        }, {
            title: 'Wallet ID',
            dataIndex: 'walletID',
            width: '18%',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.walletID - b.walletID,
        }, {
            title: 'Date Create',
            dataIndex: 'dateCreate',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.dateCreate.localeCompare(b.dateCreate),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'money_debt',
            defaultSortOrder: 'descend',
            render: values => (

                <span className="">
                    {values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    } đ
                </span>

            ),
            width: '15%',
            sorter: (a, b) => a.money_debt - b.money_debt,
        }, {
            title: "Description",
            dataIndex: 'description',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.status - b.status,
            width: 100,
            render: (values) => {
                return (
                    values.status == 0 ?
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDeleteDebtOwner(values)}>
                            <a style={{ color: '#f5222d', fontSize: '15px' }}><DeleteFilled style={{ marginRight: '4px' }} />Delete</a>            </Popconfirm> : <p style={{ color: 'green', fontSize: '15px', }}><CheckCircleFilled style={{ marginRight: '4px' }} />Paid</p>
                )
            }


        },];
        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            visible: false,
            confirmLoading: false,
        }
    }
    showPayDebtModalInComponent = (data) => {
        this.props.showPayDebtModal(data);
    }
    onFinish = values => {
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    componentDidUpdate = () => {
        const { isAction, name, messageError, data, visiblePayDebt } = this.props;
        if (isAction) {
            const { accessToken, email } = this.state;
            var decoded = jwt(accessToken) || {};
            this.props.fetchGetDebtReminder(decoded.userId, accessToken)
            this.props.fetchGetDebtOwner(decoded.userId, accessToken);
            this.props.handleCancelModal();
        }
        if (name || messageError) {
            console.log('formRef:', this.formRef)
            if (this.formRef.current)
                this.formRef.current.setFieldsValue({ name })
        }
        if (visiblePayDebt) {
            if (data) {
                console.log('formRef2:', this.formRef2)
                console.log('formRef:', this.formRef)
                console.log('data:', data)
                if (this.formRef2.current) {
                    this.formRef2.current.setFieldsValue({ walletId: data.walletID, name: data.creditor, description: data.description, amount: data.money_debt })

                }

            }
        }

    }
    onDeleteDebtOwner(record) {
        const { accessToken } = this.state;

        console.log('record:', record)
        this.props.deleteDebtOwner(record.id_debt, accessToken);
    }
    componentWillUnmount() {

    }
    componentDidMount() {
        const { accessToken, email } = this.state;
        var decoded = jwt(accessToken) || {};
        this.props.fetchGetDebtReminder(decoded.userId, accessToken)
        this.props.fetchGetDebtOwner(decoded.userId, accessToken)
        // this.props.showPayDebtModal({});
        // setTimeout( () => {     

        // }, 350);
        // this.props.handleCancelPayDebtModal();

        // this.props.handleCancelPayDebtModal();
        // this.props.fetchTransactionHistory(email, accessToken);

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
        //         if (res.data.role !== 'customer') 
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
    handlePressEnter = (values) => {
        let wallet_id = values.target.value;
        const { accessToken } = this.state;

        console.log("wallet id: ", wallet_id)
        if (wallet_id) {
            this.props.fetchGetNameByWalletId(wallet_id, accessToken)
        }
    }
    handleOk = () => {
        const { accessToken } = this.state;
        const { idDebtor } = this.props
        this.setState({
            confirmLoading: true,
        });
        let data = this.formRef.current.getFieldsValue()
        var decoded = jwt(accessToken) || {};
        console.log('decoded:', decoded);
        let dt = {
            id_debtor: idDebtor,
            id_owner: decoded.userId,
            money_debt: data.amount,
            description: data.description
        }
        console.log('dt:', dt)
        console.log('this.props hanldeok:', this.props);

        this.props.addDebtReminder(dt, accessToken);
        this.setState({
            confirmLoading: false,
        });
    }
    handleOkPayDebt = () => {
        const { accessToken, email } = this.state;
        const { data, fetchTranferMoneyDebt } = this.props
        const otp = this.inputRef.current.state.value;
        let decoded = jwt(accessToken) || {};

        if (data && otp) {
            data.otp = otp;
            data.email = decoded.email;
            data.decodeWalletIdDebtor = decoded.Number;
            data.name = decoded.name;
            fetchTranferMoneyDebt(data, accessToken);
            console.log('data:', data)
        }
    }
    onClickSendOTP = (e) => {
        let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        let decode = jwt(accessToken) || {};
        const { getOTP } = this.props;
        getOTP(decode.email, accessToken);
    }
    render() {
        const { isLoading, debtReminders, messageError, messageSuccess, walletId, debtOwner, data,
            visible, visiblePayDebt, messageSuccessOTP } = this.props;
        console.log('debtReminders:', debtReminders);
        const { confirmLoading } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        console.log('visible:', visible)
        if (messageError === 'AccessToken is not valid') {
            // this.props.resetStore();
            return (<Redirect to={{
                pathname: '/signin',
            }} />);
        }

        console.log('messageSuccessOTP:', messageSuccessOTP)
        const contentLayout = (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}
                {messageSuccess ?
                    notification.open({
                        message: messageSuccess,
                        icon: <InfoCircleOutlined style={{ color: 'green' }} />,
                    }) : null}
                {messageSuccessOTP ?
                    notification.open({
                        message: messageSuccessOTP,
                        icon: <MailFilled style={{ color: '#1890ff' }} />,
                    }) : null}

                <Card title="Debt Reminder List" bordered={false} style={{ width: '90%' }}>

                    <Table
                        columns={this.columnsDebtReminders}
                        dataSource={debtReminders}
                        onChange={this.handleChange}
                        pagination={{ pageSize: 5 }}
                        // scroll={{ y: '80vh' }}
                        bordered />
                </Card>
                <hr />
                <Card title="Debt Owner List" bordered={false} style={{ width: '90%' }}>
                    <Row>
                        <Col span={2}>
                            <Button
                                type="primary"
                                icon={<PlusSquareOutlined />}
                                onClick={() => { this.props.showAddModal() }}>Add Debt Reminder</Button>
                        </Col>
                    </Row>
                    <Table
                        columns={this.columnsDebtOwners}
                        dataSource={debtOwner}
                        onChange={this.handleChange}
                        pagination={{ pageSize: 5 }}
                        // scroll={{ y: '80vh' }}
                        bordered />
                </Card>
                <Modal
                    title="Add Debt Reminder"
                    visible={visible}
                    onOk={
                        this.handleOk
                    }
                    confirmLoading={confirmLoading}
                    onCancel={() => { this.props.handleCancelModal() }}
                >
                    <Form
                        {...layout}
                        name="basic"

                        ref={this.formRef}
                        initialValues={{ walletId: '', remember: true }}
                        onFinish={this.onFinish()}
                        onFinishFailed={this.onFinishFailed()}
                    >
                        <Form.Item
                            label="Debtor ID Wallet"
                            name="walletId"
                            rules={[{ required: true, message: 'Please input your Debtor ID Wallet!' }]}
                        >
                            <Input value={walletId} onPressEnter={this.handlePressEnter} type="number" />
                        </Form.Item>
                        <Form.Item
                            label="Debtor"
                            name="name"

                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Please input your Amount!' }]}
                        >
                            <InputNumber className="inputAmount"
                                onChange={(e) => { }}
                                formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your Description!' }]}

                        >
                            <Input.TextArea autoSize={{ minRows: 3, maxRows: 15 }}
                            />
                        </Form.Item>



                    </Form>
                </Modal>

                <Modal
                    title="Pay Debt Reminder Modal"
                    visible={visiblePayDebt}
                    onOk={
                        this.handleOkPayDebt
                    }
                    confirmLoading={confirmLoading}
                    onCancel={() => { this.props.handleCancelPayDebtModal() }}
                >
                    {data &&

                        (
                            <div>
                                <Row>
                                    <Col span={12}>Debtor ID Wallet:</Col>
                                    <Col span={12}><Input disabled value={data.walletID}></Input></Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Debtor:</Col>
                                    <Col span={12}><Input disabled value={data.creditor}></Input></Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Amount Debt Transfer:</Col>
                                    <Col span={12}> <InputNumber disabled value={data.money_debt} formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\đ\s?|(,*)/g, '')} /></Col>
                                </Row>
                                <Row>
                                    <Col span={12}>description:</Col>
                                    <Col span={12}><Input.TextArea autoSize={{ minRows: 3, maxRows: 15 }} disabled value={data.description}></Input.TextArea></Col>
                                </Row>

                                <Row>
                                    <Col span={12}>OTP:</Col>

                                    <Col span={6}><Input ref={this.inputRef}  ></Input></Col>
                                    <Col span={6}>
                                        {/* <Countdown ref={this.countdownRef} date={Date.now() + 3000} renderer={this.renderer} />, */}
                                        <Button onClick={this.onClickSendOTP} type="primary">
                                            Send OTP
                                </Button>
                                    </Col>
                                </Row>
                            </div>)

                    }
                    {/* <Form
                        {...layout}
                        name="basic"
                        ref={this.formRef2}
                        wrappedComponentRef={(form) => {
                            console.log('form:', form)
                            this.formRef2 = form
                        }}
                        initialValues={{ walletId: '', remember: true }}
                        onFinish={this.onFinish()}
                        onFinishFailed={this.onFinishFailed()}
                    >
                        <Form.Item
                            label="Debtor ID Wallet"
                            name="walletId"
                            rules={[{ required: true, message: 'Please input your Debtor ID Wallet!' }]}
                        >
                            <Input disabled={true} onPressEnter={this.handlePressEnter} type="number" />
                        </Form.Item>
                        <Form.Item
                            label="Debtor"
                            name="name"

                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Please input your Amount!' }]}
                        >
                            <InputNumber className="inputAmount"
                                onChange={(e) => { }}
                                disabled={true}
                                formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"

                            rules={[{ required: true, message: 'Please input your Description!' }]}

                        >
                            <Input.TextArea disabled={true} autoSize={{ minRows: 3, maxRows: 15 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="OTP"
                            name="otp"

                        >
                            <Input />
                            <Button onClick={this.onClickSendOTP} type="primary">
                                Send OTP
                                </Button>
                        </Form.Item>




                    </Form>
                
                 */}
                </Modal>


            </React.Fragment >
        )

        return (
            <div className='main-content transaction-history'>

                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                )}

                {!isLoading && contentLayout}
            </div>
        );
    }
}
export default DebtReminder; 