import React, { Component } from 'react';
import { Input, Card, Row, notification, Select, Form, InputNumber } from 'antd';

import './internal-remitter.css'
import { formatBalanceToString } from '../../../../ultis/balance';
import * as _ from 'lodash';
import { WarningOutlined, InfoCircleOutlined, SendOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Option = Select.Option;
class InternalRemitter extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        const { userWallets } = this.props;
        if (userWallets.length === 0) {
            this.props.form.setFieldsValue({
                balance: '0.00'
            })
        } else {
            const selectedWallet = _.filter(userWallets, function (object, index) {
                if (index == 0) {
                    return object.Number == value;

                }
                else {
                    return object.id_saving == value
                }
            });
            if (selectedWallet) {
                let balance = null;
                console.log('selectedWallet:', selectedWallet)
                if (selectedWallet[0].Number == value) {
                    balance = selectedWallet[0].Money;

                }
                else {
                    balance = selectedWallet[0].spending;


                }
                this.props.setBalance(balance.toString());
                this.props.setBalanceUserWallet(balance.toString());

            }

        }
    }

    handleBlur = () => {
        console.log('blur');
    }

    handleFocus = () => {
        console.log('focus');
    }

    userWalletsLayout = () => {
        const { userWallets } = this.props;
        let options = [];

        if (userWallets.length === 0)
            return (
                <Option value=''>Not Wallet</Option>
            );
        else {
            console.log('userWallets:', userWallets)

            userWallets.forEach((element, index) => {
                if (index == 0) {
                    options.push(
                        <Option value={element.Number}>{element.name_saving}</Option>
                    )
                }

                else {
                    options.push(
                        <Option value={element.id_saving}>{element.name_saving}</Option>
                    )
                }
            });
        }

        return options;
    }

    render() {
        const { messageSuccess, messageError } = this.props;
        return (

            <Card
                title="Information Of Remitter"
                style={{ width: "90%" }}
            >
                
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null

                }{

                    messageSuccess ?
                        notification.open({
                            message: messageSuccess,
                            icon: <InfoCircleOutlined style={{ color: 'blue' }} />,
                        }) : null}
                <Form.Item
                    {...this.props.formItemLayout}
                    hasFeedback
                    label="Your Wallet Type:"
                    name="originWalletNumber"
                    rules={[
                        { required: true, message: 'Please select a your wallet!' },
                    ]}>

                    <Select
                        showSearch={true}
                        showArrow={false}
                        placeholder="Select a your wallet"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.userWalletsLayout()}
                    </Select>

                </Form.Item>

                <Form.Item {...this.props.formItemLayout} name="balance" label="Balance:">

                    {/* <Input addonAfter='VND' disabled="true" /> */}

                    <InputNumber formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\đ\s?|(,*)/g, '')} />
                </Form.Item>

            </Card >

        )
    }
}

export default InternalRemitter;
