import React, { Component } from 'react';
import { Input, Card, Row, Col, DatePicker, Select, Form,InputNumber } from 'antd';
import './detail-transfer.css'
import { formatBalanceToInt } from '../../../../ultis/balance';

const Option = Select.Option;
const { TextArea } = Input;

class DetailTransfer extends Component {
    constructor(props) {
        super(props);
    }

    compareToYourBalance = (rule, value, callback) => {
        const { balance } = this.props
        // const form = this.props.form;
        // const yourBalance = form.getFieldValue('your-balance');
        console.log('balance:', typeof balance)
        value = parseInt(value);
        if (balance) {
            if (value && (value > formatBalanceToInt(balance))) {
                callback(`The shipping amount must be less than ${balance}`);
            } else {
                callback();
            }
        }
        else {
            callback(`You don't select your wallet`);
        }

    }

    render() {

        return (
            <Card
                title="Detail of transfer"
                style={{ width: "90%" }}
            >

                <Form.Item {...this.props.formItemLayout} name="amount" label="Amount:" rules={[
                    { required: true, message: 'Please enter the amount!' },
                    { validator: this.compareToYourBalance }
                ]}>

                    <InputNumber formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\đ\s?|(,*)/g, '')} />

                </Form.Item>

                <Form.Item
                    {...this.props.formItemLayout}
                    hasFeedback
                    label="Charge bearer:" name="payBy" rules={[
                        { required: true, message: 'Please select a charge bearer!' },
                    ]}>

                    <Select
                        placeholder="Select a charge bearer"
                        onChange={this.handleChange}
                    >
                        <Option key='sender' value='sender'>You</Option>
                        <Option key='receiver' value='receiver'>Recipient</Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    {...this.props.formItemLayout}
                    label="Message: " name="message" >

                    <TextArea rows='5' />

                </Form.Item>

            </Card>
        )
    }
}

export default DetailTransfer;
