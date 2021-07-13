import React from 'react';
import { Table, notification, Spin, Popconfirm, Button, Modal, Form, Input, Tag, Space,DatePicker } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
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

class TripManagement extends React.Component {
    formRef = React.createRef();
    formRefAdd = React.createRef();

    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Trip ID',
            dataIndex: 'tripId',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.tripId.localeCompare(b.tripId),
        }, {
            title: 'Trip name',
            dataIndex: 'tripName',
            width: '18%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.tripName.localeCompare(b.tripName),
        }, {
            title: 'Start Time',
            dataIndex: 'startTime',
            defaultSortOrder: 'descend',
            width: '20%',

        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            defaultSortOrder: 'descend',
            width: '20%',
        },
        {
            title: 'Destination',
            dataIndex: 'destinations',
            defaultSortOrder: 'descend',
            width: '20%',
            render: destinations => (
                <>
                    {destinations.map(des => {
                        return (
                            <Tag color="blue" key={des.destinationId}>
                                {des.destinationName}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            defaultSortOrder: 'descend',
            width: '15%',
            render: (record) => (
                <Space size="middle">
                    <a onClick={() => this.onEditTrip(record)}>Edit</a>
                    {
                        record.status === 1 ? <Popconfirm title="Sure to Inactive?" onConfirm={() => this.onDeleteTrip(record)}>
                            <a>Inactive</a>
                        </Popconfirm> : null
                    }



                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            tripSelected: '',
            visibleUpdate: false,
            visibleAdd: false,
            confirmLoading: false,
        }
    }


    onEditTrip(values) {
        this.setState({ visibleUpdate: true, tripSelected: values })
        console.log('values:', values)
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    handleCancelModal() {

        this.setState({ visibleUpdate: false })
        // this.props.fetchAllTrip(this.state.accessToken);

    }
    onFinish = values => {
        values.tripId = this.state.tripSelected.tripId
        this.handleCancelModal()
        this.props.updateTrip(this.state.accessToken, values)
    };
    onFinishAdd = values => {
        console.log('values:', values)
        values.roleId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        values.avatar = null;
        this.setState({ visibleAdd: false })
        // this.props.addUser(this.state.accessToken, values)

    }
    onReset = () => {
        this.form.resetFields();
    };

    onFill = (data) => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                tripName: data.tripName,
            })
        }



    };
    onAddTrip() {
        this.setState({ visibleAdd: true })
        if (this.formRefAdd.current) {
            this.formRefAdd.current.resetFields()

        }
    }
    onDeleteTrip(values) {
        console.log('values:', values)
        this.props.deleteTrip(this.state.accessToken, values.userId)
    }

    componentDidUpdate() {
        const { isAction } = this.props
        if (isAction) {
            this.props.fetchAllTrip(this.state.accessToken)
        }
    }
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllTrip(accessToken);
    }

    render() {
        const { isLoading, messageError, isAction, messageSuccess, listTrip } = this.props;
        console.log('this.props:', this.props)
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
                    this.onAddTrip()
                }} type="primary" icon={<PlusSquareOutlined />}>
                    Add New Trip
                </Button>

                <Table
                    columns={this.columns}
                    dataSource={listTrip}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />

                <Modal
                    title="Update Trip"
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
                            name="tripName"
                            label="tripName"
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
                    title="Add Trip"
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
                            name="tripName"
                            label="Trip Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Time"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <RangePicker showTime />

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
export default TripManagement;