import React, { Component } from 'react';
import { Input, Card, Row, Col, DatePicker, Select, Form } from 'antd';
import './detail-transfer.css'
import { formatBalanceToInt } from '../../../../utils/balance';

const Option = Select.Option;
const { TextArea } = Input;

class DetailTransfer extends Component {
    constructor(props) {
        super(props);
    }

    compareToYourBalance = (rule, value, callback) => {
        const form = this.props.form;
        const yourBalance = form.getFieldValue('your-balance');

        value = parseInt(value);
        if (yourBalance) {
            if (value && (value > formatBalanceToInt(yourBalance))) {
                callback(`The shipping amount must be less than ${yourBalance}`);
            } else {
                callback();
            }
        }
        else {
            callback(`You don't select your wallet`);
        }

    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Card
                title="Detail of transfer"
                style={{ width: "90%" }}
            >

                <Form.Item {...this.props.formItemLayout} label="Amount:">
                    {getFieldDecorator('amount', {
                        rules: [
                            { required: true, message: 'Please enter the amount!' },
                            { validator: this.compareToYourBalance }
                        ],
                    })(
                        <Input type='number' addonAfter='VND'/>
                    )}
                </Form.Item>

                <Form.Item
                    {...this.props.formItemLayout}
                    hasFeedback
                    label="Charge bearer:" >
                    {getFieldDecorator('payBy', {
                        rules: [
                            { required: true, message: 'Please select a charge bearer!' },
                        ],
                    })(
                        <Select
                            placeholder="Select a charge bearer"
                            onChange={this.handleChange}
                        >
                            <Option key='sender' value='sender'>You</Option>
                            <Option key='receiver' value='receiver'>Recipient</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item
                    {...this.props.formItemLayout}
                    label="Message: " >
                    {getFieldDecorator('message')(
                        <TextArea rows='5'/>
                    )}
                </Form.Item>

            </Card>
        )
    }
}

export default DetailTransfer;
