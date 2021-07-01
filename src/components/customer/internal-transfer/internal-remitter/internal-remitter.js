import React, { Component } from 'react';
import { Input, Card, Row, Col, Select, Form } from 'antd';

import './internal-remitter.css'
import { formatBalanceToString } from '../../../../utils/balance';

const Option = Select.Option;
class InternalRemitter extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        const { userWallets } = this.props;

        if (userWallets.length === 0){
            this.props.form.setFieldsValue({
                'your-balance': '0.00'
            })
        } else {
            const selectedWallet = userWallets.filter(userWallet => userWallet.walletNumber === value);

            this.props.form.setFieldsValue({
                'your-balance': formatBalanceToString(selectedWallet && selectedWallet[0].balance)
            })
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

        userWallets.forEach(userWallet => {
            options.push(
                <Option value={userWallet.walletNumber}>{userWallet.walletNumber}</Option>
            )
        });
        return options;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Card
                title="Information Of Remitter"
                style={{ width: "90%" }}
            >

                <Form.Item
                    {...this.props.formItemLayout}
                    hasFeedback
                    label="Your Wallet Number:">
                    {getFieldDecorator('originWalletNumber', {
                        rules: [
                            { required: true, message: 'Please select a your wallet!' },
                        ],
                    })(
                        <Select
                            showSearch
                            placeholder="Select a your wallet"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {this.userWalletsLayout()}
                    </Select>
                    )}
                </Form.Item>

                <Form.Item {...this.props.formItemLayout} label="Balance:">
                    {getFieldDecorator('your-balance')(
                        <Input addonAfter='VND' disabled="true"/>
                    )}
                </Form.Item>
            </Card>
            
        )
    }
}

export default InternalRemitter;
