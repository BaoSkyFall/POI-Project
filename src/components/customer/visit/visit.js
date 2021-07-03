import React from 'react';
import { Table, notification, Spin, Card, Row, InputNumber, Col, Popconfirm, Button, Modal, Form, Input, Tag, Space } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined, InfoCircleOutlined, UserAddOutlined } from '@ant-design/icons';
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

class VisitManagement extends React.Component {
    formRef = React.createRef();
    formRefAdd = React.createRef();

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
                    <a onClick={() => this.onEditVisit(record)}>Edit</a>
                    {
                        record.status === 1 ? <Popconfirm title="Sure to Inactive?" onConfirm={() => this.onDeleteVisit(record)}>
                            <a>Inactive</a>
                        </Popconfirm> : null
                    }



                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            visitSelected: '',
            visibleUpdate: false,
            visibleAdd: false,
            confirmLoading: false,
        }
    }


    onEditVisit(values) {
        this.setState({ visibleUpdate: true })
        console.log('values:', values)
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    handleCancelModal() {

        this.setState({ visibleUpdate: false })
        // this.props.fetchAllVisit(this.state.accessToken);

    }
    onFinish = values => {
        values.userId = this.state.visitSelected.userId
        values.username = this.state.visitSelected.username
        values.avatar = this.state.visitSelected.avatar
        this.handleCancelModal()
        this.props.updateVisit(this.state.accessToken, values)
    };
    onFinishAdd = values => {
        console.log('values:', values)
        values.roleId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        values.avatar = null;
        this.setState({ visibleAdd: false })
        this.props.addUser(this.state.accessToken, values)

    }
    onReset = () => {
        this.form.resetFields();
    };

    onFill = (data) => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
            })
        }



    };
    onAddVisit() {
        this.setState({ visibleAdd: true })
        if (this.formRefAdd.current) {
            this.formRefAdd.current.resetFields()

        }
    }
    onDeleteVisit(values) {
        console.log('values:', values)
        this.props.deleteVisit(this.state.accessToken, values.userId)
    }

    componentDidUpdate() {
        const { isAction } = this.props
        if (isAction) {
            this.props.fetchAllVisit(this.state.accessToken)
        }
    }
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllVisit(accessToken);
    }

    render() {
        const { isLoading, messageError, isAction, messageSuccess, listVisit } = this.props;
        const { confirmLoading, visibleUpdate, visibleAdd } = this.state;
        if (messageError === 'AccessToken is not valid') {
            this.props.resetStore();
            return (<Redirect to={{
                pathname: '/signin',
            }} />);
        }
        const contentLayout = (
            <React.Fragment>
                {messageError && isAction ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}
                {messageSuccess && isAction ?
                    notification.open({
                        message: messageSuccess,
                        icon: <InfoCircleOutlined style={{ color: 'blue' }} />,
                    }) : null}
                <Button className="button-add" onClick={() => {
                    this.onAddVisit()
                }} type="primary" icon={<UserAddOutlined />}>
                    Add New User
                </Button>

                <Table
                    columns={this.columns}
                    dataSource={listVisit}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />

                <Modal
                    title="Update User"
                    visible={visibleUpdate}
                    onOk={
                        this.handleOk
                    }
                    confirmLoading={confirmLoading}
                    footer={[
                        <Button key="back" onClick={() => { this.handleCancelModal() }}>
                            Cancel
                        </Button>,
                    ]}
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
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>


                        </Form.Item>
                    </Form>


                </Modal>

                <Modal
                    title="Add User"
                    visible={visibleAdd}
                    onOk={
                        this.handleOk
                    }
                    confirmLoading={confirmLoading}
                    footer={[
                        <Button key="back" onClick={() => { this.setState({ visibleAdd: false }) }}>
                            Cancel
                        </Button>,
                    ]}
                    onCancel={() => { this.setState({ visibleAdd: false }) }}
                >
                    <Form {...layout} ref={this.formRefAdd} name="control-hooks" onFinish={this.onFinishAdd}

                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
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
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Add New
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
export default VisitManagement;