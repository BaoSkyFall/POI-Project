import React, { Component } from 'react';
import { Input, Card, Select, Form, Icon, Button } from 'antd';
import './recipient-information.css'
const Option = Select.Option;

class Recipient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }
    }

    handleChange = (value) => {
        this.setState({ value });
    }

    handleSelect = (value) => {
        const { accessToken } = this.props;
        this.props.trackRecipient(value, accessToken);
    }

    handleAdd = () => {
        const { value } = this.state;
        const { accessToken, email } = this.props;
        this.props.addRecipient(email, value, '', accessToken);
    }

    recipientWalletsLayout = () => {
        const { recipients } = this.props;
        let options = [];

        if (recipients.length === 0)
            return (
                <Option value=''>Not Recipients</Option>
            );

        recipients.forEach(recipient => {
            options.push(
                <Option value={recipient.walletNumber}>
                    {recipient.remindName} 
                    <small style={{float: "right"}}>{recipient.walletNumber}</small>
                </Option>
            )
        });
        return options;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { emailRecipient, fullNameRecipient } = this.props;

        return (
            <Card
                title="Information Of Recipient"
                style={{ width: "90%" }}
            >
                <Form.Item {...this.props.formItemLayout} hasFeedback label="Recipient's Wallet Number:">
                    {getFieldDecorator('destinationWalletNumber', {
                        rules: [
                            { required: true, message: 'Please select a recipient wallet!'},
                        ],
                    })(
                        <Select
                            mode='combobox'
                            placeholder="Select a recipient wallet"
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {this.recipientWalletsLayout()}
                        </Select>
                    )}
                </Form.Item>
                
                <Form.Item {...this.props.formItemLayout} label='Add contact'>
                    <Button
                        type="info"
                        icon="like"
                        onClick={this.handleAdd}>
                        Yep
                    </Button>
                </Form.Item>    

                <Form.Item {...this.props.formItemLayout} label="Recipient's Email:">
                    <Input type='text' disabled="true" value={emailRecipient}/>
                </Form.Item>

                <Form.Item {...this.props.formItemLayout} label="Recipient's Full Name:">
                    <Input type='text' disabled="true" value={fullNameRecipient}/>
                </Form.Item>
            </Card>
        )
    }
}

export default Recipient;
