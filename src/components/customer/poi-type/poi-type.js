import React from 'react';
import { Table, notification, Spin, Card, Row, InputNumber, Col, Popconfirm, Button, Modal, Form, Input, Tag, Space, DatePicker } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined, CheckCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
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
const { RangePicker } = DatePicker;

class POITypeManagement extends React.Component {
    formRef = React.createRef();
    formRefAdd = React.createRef();

    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Id',
            dataIndex: 'poitypeId',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.poitypeId.localeCompare(b.poitypeId),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status) => (
                <Tag color={status === 1 ? 'green' : status === 0 ? 'volcano' : 'blue'} key={status === 1 ? 'Active' : status === 0 ? 'Inactive' : 'Pending'} size="middle">
                    {status === 1 ? 'Active' : status === 0 ? 'Inactive' : 'Pending'}
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
                    <a onClick={() => this.onEditPOIType(record)}>Edit</a>
                    {
                        record.status === 1 ? <Popconfirm title="Sure to Inactive?" onConfirm={() => this.onDeletePOIType(record)}>
                            <a>Inactive</a>
                        </Popconfirm> : null
                    }



                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            poiTypeSelected: null,
            visibleUpdate: false,
            visibleAdd: false,
            confirmLoading: false,
        }
    }


    onEditPOIType(values) {
        this.setState({ visibleUpdate: true, poiTypeSelected: values })
        console.log('values:', values)
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    handleCancelModal() {

        this.setState({ visibleUpdate: false })
        // this.props.fetchAllPOIType(this.state.accessToken);

    }
    onFinish = values => {
        values.poitypeId = this.state.poiTypeSelected.poitypeId
        this.handleCancelModal()
        this.props.updatePOIType(this.state.accessToken, values)
    };
    onFinishAdd = values => {
        console.log('values:', values)
        this.setState({ visibleAdd: false })
        this.props.addPOIType(this.state.accessToken, values)

    }
    onReset = () => {
        this.form.resetFields();
    };

    onFill = (data) => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                name: data.name,
                shortName: data.shortName,

            })
        }



    };
    onAddPOIType() {
        this.setState({ visibleAdd: true })
        if (this.formRefAdd.current) {
            this.formRefAdd.current.resetFields()

        }
    }
    onDeletePOIType(values) {
        this.props.deletePOIType(this.state.accessToken, values.poitypeId)
    }

    componentDidUpdate() {
        const { isAction } = this.props
        if (isAction) {
            this.props.fetchAllPOIType(this.state.accessToken)
        }
    }
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllPOIType(accessToken);
    }

    render() {
        const { isLoading, messageError, isAction, messageSuccess, listPOIType } = this.props;
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
                        icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                    }) : null}
                <Button className="button-add" onClick={() => {
                    this.onAddPOIType()
                }} type="primary" icon={<PlusSquareOutlined />}>
                    Add New POIType
                </Button>

                <Table
                    columns={this.columns}
                    dataSource={listPOIType}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />

                <Modal
                    title="Update POIType"
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
                            name="name"
                            label="Name"
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
                    title="Add POIType"
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
                            name="name"
                            label="Name"
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
export default POITypeManagement;