import React from 'react';
import { Table, notification, Spin, Card, Row, InputNumber, Col, Popconfirm, Button, Modal, Form, Input, Tag, Space } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined } from '@ant-design/icons';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class UsersManagement extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.columns = [{
            title: 'User ID',
            dataIndex: 'userId',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.userId.localeCompare(b.userId),
        }, {
            title: 'Username',
            dataIndex: 'username',
            width: '18%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.username.localeCompare(b.username),
        }, {
            title: 'First Name',
            dataIndex: 'firstName',
            defaultSortOrder: 'descend',
            width: '20%',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            defaultSortOrder: 'descend',
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            width: '20%',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            defaultSortOrder: 'descend',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status) => (
                <Tag color={status === 1 ? 'green' : 'volcano'} key={status === 1 ? 'Active' : 'Inactive'} size="middle">
                    {status === 1 ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            defaultSortOrder: 'descend',
            width: '15%',
            render: (record) => (
                <Space size="middle">
                    <a onClick={() => this.onEditUser(record)}>Edit</a>
                    <a onClick={() => this.onDeleteUser(record)}>Delete</a>
                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            visible: false,
            confirmLoading: false,
        }
    }
    onEditUser(values) {
        this.setState({ visible: true })
        console.log('values:', values)
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    onDeleteUser(values) {
        console.log('values:', values)
    }
    handleCancelModal() {
        this.setState({ visible: false })
    }
    onFinish = values => {
        console.log('Success:', values);
    };

    onReset = () => {
        this.form.resetFields();
    };

    onFill = (data) => {
        this.formRef.current.setFieldsValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
        })


    };
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllUsers(accessToken);

        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log('res:', res)
        //         // if (res.status === 200) {
        //         //     localStorage.setItem(EMAIL_KEY, res.data.email)
        //         //     localStorage.setItem('role', res.data.role)
        //         //     if (res.data.role !== 'customer')
        //         //         window.location.href = '/signin';
        //         // }
        //         // else {
        //         //     localStorage.removeItem(ACCESS_TOKEN_KEY);
        //         //     localStorage.removeItem(EMAIL_KEY);
        //         //     localStorage.removeItem('role');
        //         //     window.location.href = '/signin';
        //         // }
        //     })
    }

    render() {
        const { isLoading, messageError, listUsers } = this.props;
        const { confirmLoading, visible } = this.state;
        console.log('listUsers:', listUsers)
        if (messageError === 'AccessToken is not valid') {
            this.props.resetStore();
            return (<Redirect to={{
                pathname: '/signin',
            }} />);
        }

        const contentLayout = (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}

                <Table
                    columns={this.columns}
                    dataSource={listUsers}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />

                <Modal
                    title="Add Debt Reminder"
                    visible={visible}
                    onOk={
                        this.handleOk
                    }
                    confirmLoading={confirmLoading}
                    onCancel={() => { this.handleCancelModal() }}
                >
                    <Form {...layout} ref={this.formRef} name="control-hooks" onFinish={this.onFinish}

                    >
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button form="myForm" type="primary" htmlType="submit">
                                Submit
                            </Button>


                        </Form.Item>
                    </Form>


                </Modal>
            </React.Fragment>
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
export default UsersManagement;