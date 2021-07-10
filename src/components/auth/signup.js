import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, DatePicker, Alert, Spin
} from 'antd';
import './styles/signup.css'
import TextArea from 'antd/lib/input/TextArea';

const FormItem = Form.Item;
const Option = Select.Option;


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSignUp(values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        if (this.props.signupSuccess) {
            return (<Redirect to={{
                pathname: '/signin',
            }} />);
        }

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '031',
        })(
            <Select style={{ width: 70 }}>
                <Option value="031">031</Option>
                <Option value="032">032</Option>
                <Option value="033">033</Option>
                <Option value="034">034</Option>
                <Option value="035">035</Option>
                <Option value="036">036</Option>
                <Option value="037">037</Option>
                <Option value="038">038</Option>
                <Option value="039">039</Option>
            </Select>
        );

        const errorLayout = (
            <Alert
                message="Error"
                description={this.props.messageError}
                type="error"
                showIcon />
        );

        const formLayout = (
            <React.Fragment>
                <Row>
                    <Col span={4}></Col>
                    <Col span={18}>
                        {this.props.signupFail && errorLayout}
                    </Col>
                </Row>
                <br/>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Email&nbsp;
                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Full Name"
                >
                    {getFieldDecorator('fullName', {
                        rules: [{
                            required: true, message: 'Please input your fullname!',
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Birthday"
                >
                    {getFieldDecorator('birthday', {
                        rules: [{
                            type: 'object',
                            required: true,
                            message: 'Please select time!'
                        }]
                    })(
                        <DatePicker />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Personal Number"
                >
                    {getFieldDecorator('personalNumber', {
                        rules: [{
                            required: true, message: 'Please input your personal number!',
                        }],
                    })(
                        <Input type="text" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Address"
                >
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your address!' }],
                    })(
                        <TextArea />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </React.Fragment>
        );



        return (
            <Form onSubmit={this.handleSubmit} className='form-signup'>
                <Row>
                    <Col span={4}></Col>
                    <Col span={18}>
                        <legend className="title-signup">
                            <h2>Sign Up</h2>
                        </legend>
                    </Col>
                </Row>

                {this.props.isLoading && (
                    <Spin tip="Loading..." size='large'>
                        {formLayout}
                    </Spin>
                )}

                {!this.props.isLoading && formLayout}

            </Form>
        );
    }
}

const SignUp = Form.create()(SignupForm);
export default SignUp;