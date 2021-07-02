import React from 'react';
import { Modal, Spin, Form, Input, Tabs, notification, Select } from 'antd';
import { WarningOutlined, InfoCircleOutlined, PlusOutlined, DeleteFilled, RetweetOutlined, BankOutlined } from '@ant-design/icons'

import './style.css';
import jwt from 'jwt-decode';
const { TabPane } = Tabs;
const Option = Select.Option;

class ModalAddRecipient extends React.Component {
    formRef1 = React.createRef();
    formRef2 = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            bankChoosen: '',
        }
    }
    handleOk = (e) => {
        const { email, accessToken, isLocalRecipient, usernameRecipient, isLocalAdd, form } = this.props;
        if (isLocalAdd) {
            this.formRef1.current.validateFields().then(values => {
                let { walletNumber, remindName } = values;
                remindName = remindName ? remindName : '';
                let decoded = jwt(accessToken);
                console.log('decoded:', decoded)
                console.log('remindName:', remindName)
                this.props.addRecipientLocal(decoded.username, walletNumber, remindName, usernameRecipient, isLocalRecipient, accessToken);

            });
        }
        else {
            this.formRef2.current.validateFields().then(values => {
                console.log('values:Foregin Add', values)
                let { walletNumber, remindName, bankRecipient } = values;
                remindName = remindName ? remindName : '';
                let decoded = jwt(accessToken);
                console.log('decoded:', decoded)
                console.log('remindName:', remindName)
                this.props.addRecipientForeign(decoded.username, walletNumber, remindName, bankRecipient, isLocalAdd, accessToken);

            });
        }

    }
    componentDidUpdate = () => {
        const { bankRecipient, fullNameRecipient, usernameRecipient, isLocalAdd } = this.props

        if (fullNameRecipient) {
            if (isLocalAdd) {
                this.formRef1.current.setFieldsValue({
                    remindName: fullNameRecipient
                })
            }
            else {
                if (this.formRef2.current) {
                    this.formRef2.current.setFieldsValue({
                        remindName: fullNameRecipient,
                        bankRecipient: bankRecipient
                    })
                }

            }
        }

    }
    handleCancel = (e) => {
        this.props.toggleModalAddRecipient(false);
    }
    handleChange = (value) => {

        this.setState({ bankChoosen: value });
    }
    handleOnPressEnter = (e) => {
        const { isLocalAdd, trackRecipientLocal, trackRecipientForeign, accessToken } = this.props
        const { bankChoosen } = this.state;

        let value = e.target.value;
        if (isLocalAdd) {
            trackRecipientLocal(value, accessToken)
        }
        else {

            trackRecipientForeign(bankChoosen, value, accessToken)

        }
    }
    render() {
        const { isLoading, messageErrorAddModal, messageSuccessAddModal } = this.props;

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

        const contentLayout = (
            <Tabs onChange={() => {
                this.props.changeTabPanel();
            }}
                ref={this.tabsRef} defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <RetweetOutlined />Local Bank
                             </span>
                    }
                    key="1"
                >
                    <Form ref={this.formRef1}>
                        <Form.Item {...formItemLayout} label="Wallet number:" name="walletNumber" rules={[
                            { required: true, message: 'Please enter the wallet number!' },
                        ]}>

                            <Input type='text' onPressEnter={this.handleOnPressEnter} />
                        </Form.Item>

                        <Form.Item {...formItemLayout} label="Remind Name:" name="remindName">
                            <Input type='text' />
                        </Form.Item>
                    </Form>

                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <BankOutlined />Outernal Bank
                            </span>
                    }
                    key="2"
                >
                    <Form ref={this.formRef2}>
                        <Form.Item {...formItemLayout} disabled={true} label="Bank Recipient:" name="bankRecipient">

                            <Select
                                placeholder="Select a Bank "
                                onChange={this.handleChange}
                            >
                                <Option key='sender' value='kianto'>Lam Bank VN</Option>
                                <Option key='receiver' value='rsa-bank'>Nguyen Bank VN</Option>
                            </Select>                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Wallet number:" name="walletNumber" rules={[
                            { required: true, message: 'Please enter the wallet number!' },
                        ]}>

                            <Input type='text' onPressEnter={this.handleOnPressEnter} />
                        </Form.Item>

                        <Form.Item {...formItemLayout} label="Remind Name:" name="remindName">
                            <Input type='text' />
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>

        )

        return (


            <Modal
                title="Add new recipient"
                visible={this.props.isShowModalAddRecipient}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                )}

                {!isLoading && contentLayout}
                {messageErrorAddModal ?
                    notification.open({
                        message: messageErrorAddModal,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}

                {messageSuccessAddModal ?
                    notification.open({
                        message: messageSuccessAddModal,
                        icon: <InfoCircleOutlined style={{ color: 'blue' }} />,
                    }) : null}
            </Modal>
        );
    }
}

export default ModalAddRecipient;