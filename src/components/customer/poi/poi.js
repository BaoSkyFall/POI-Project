import React from 'react';
import { Table, notification, Spin, Image, Select, Rate, Popconfirm, Button, Modal, Form, Input, Tag, Space, DatePicker } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { WarningOutlined, CheckCircleOutlined, PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import { storage } from "../../../firebase/index";

const { Option } = Select;
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

class POIManagement extends React.Component {
    formRef = React.createRef();
    formRefAdd = React.createRef();

    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Id',
            dataIndex: 'poiId',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.poiId.localeCompare(b.poiId),
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            defaultSortOrder: 'descend',
            width: '18%',
            render: (imageUrl) => (
                <Space className="space-column" size="middle">
                    <Image
                        width={200}
                        src={imageUrl}
                    />
                    {/* <img className="image-column" src={imageUrl} alt=""></img> */}
                </Space>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'POI Type',
            dataIndex: 'poiType',
            width: '18%',
            render: poiType => (
                <Space size="middle">
                    {poiType.name}

                </Space>
            ),
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            width: '18%',
            render: destination => (
                <Space style={{ gap: 0 }} direction='vertical' align='center' size="middle">
                    <div>
                        {destination.destinationName}
                        <br></br>
                        <Image src={destination.imageUrl}></Image>
                    </div>

                </Space>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            width: '18%',
            render: rating => (
                <Space size="middle">

                    <Rate disabled value={rating}></Rate>
                </Space>
            ),
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
                    <a onClick={() => this.onEditPOI(record)}>Edit</a>
                    {
                        record.status === 1 ? <Popconfirm title="Sure to Inactive?" onConfirm={() => this.onDeletePOI(record)}>
                            <a>Inactive</a>
                        </Popconfirm> : record.status === 2 ? <Popconfirm title="Sure to Active?" onConfirm={() => this.onActivePOI(record)}>
                            <a>Active</a>
                        </Popconfirm> : null
                    }



                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            poiSelected: '',
            visibleUpdate: false,
            current: 1,
            pageSize: 5,
            visibleAdd: false,
            confirmLoading: false,
            imageView: null,
            imageAdd: null,
        }
    }

    onActivePOI(values) {
        this.props.activePOI(this.state.accessToken, values.poiId)

    }
    onEditPOI(values) {
        this.setState({ visibleUpdate: true, poiSelected: values })
        console.log('values:', values)
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    handleCancelModal() {

        this.setState({ visibleUpdate: false })
        // this.props.fetchAllPOI(this.state.accessToken,this.state.current);

    }
    onFinish = values => {
        values.poiId = this.state.poiSelected.poiId
        values.location = {
            latitude: values.latitude,
            longtitude: values.longtitude
        }
        values.imageUrl = this.state.imageView
        this.handleCancelModal()
        this.props.updatePOI(this.state.accessToken, values)
    };
    onFinishAdd = values => {
        console.log('values:', values)
        this.setState({ visibleAdd: false })
        values.location = {
            latitude: values.latitude,
            longtitude: values.longtitude
        }
        this.props.addPOI(this.state.accessToken, values, this.state.imageAdd)

    }
    onReset = () => {
        this.form.resetFields();
    };

    onFill = (data) => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                name: data.name,
                description: data.description,
                latitude: data.location.latitude,
                longtitude: data.location.longtitude,
                poiTypeId: data.poiType.poitypeId,
                destinationId: data.destination.destinationId,
                imageUrl: data.imageUrl
            })
            this.setState({ imageView: data.imageUrl })
        }



    };
    onAddPOI() {
        this.setState({ visibleAdd: true })
        if (this.formRefAdd.current) {
            this.formRefAdd.current.resetFields()
            this.setState({ imageAdd: null, imageView: null })

        }
    }
    onDeletePOI(values) {
        console.log('values:', values)
        this.props.deletePOI(this.state.accessToken, values.poiId)
    }
    handleBtnClick() {
        /*Collecting node-element and performing click*/
        this.inputRef.click();

    }
    handleFileChange(e) {
        /*Selected files data can be collected here.*/
        console.log(e.target.files);
        this.setState({ confirmLoading: true })
        const uploadTask = storage.ref(`poi/${this.state.poiSelected.poiId}`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
                this.setState({ confirmLoading: false })

            },
            () => {
                storage
                    .ref('poi')
                    .child(this.state.poiSelected.poiId)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ imageView: url, confirmLoading: false })
                    });
            }

        );
    }
    handleFileAddChange(e) {
        /*Selected files data can be collected here.*/
        console.log(e.target.files);
        this.setState({ imageAdd: e.target.files[0] })
        var input = e.target;

        var reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            this.setState({ imageView: dataURL })

        };
        reader.readAsDataURL(input.files[0]);
        // const uploadTask = storage.ref(`destination/${this.state.destinationSelected.destinationId}`).put(e.target.files[0]);
        // uploadTask.on(
        //     "state_changed",
        //     snapshot => {
        //     },
        //     error => {
        //         console.log(error);
        //     },
        //     () => {
        //         storage
        //             .ref('destination')
        //             .child(this.state.destinationSelected.destinationId)
        //             .getDownloadURL()
        //             .then(url => {
        //                 this.setState({ imageView: url })
        //             });
        //     }

        // );
    }
    componentDidUpdate() {
        const { isAction } = this.props
        if (isAction) {
            this.props.fetchAllPOI(this.state.accessToken, this.state.current)
        }
    }
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllPOI(accessToken, this.state.current);
        this.props.fetchAllPOIType(this.state.accessToken)
        this.props.fetchAllDestination(this.state.accessToken)
    }
    handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination:', pagination)
        const { accessToken } = this.state;
        this.setState({current:pagination.current})
        this.props.fetchAllPOI(accessToken, pagination.current);
    };
    render() {
        const { isLoading, messageError, isAction, messageSuccess, listPOI, listPOIType, listDestination, total } = this.props;
        const { confirmLoading, visibleUpdate, visibleAdd, imageView, current, pageSize } = this.state;
        console.log('total:', total)
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
                    this.onAddPOI()
                }} type="primary" icon={<PlusSquareOutlined />}>
                    Add New POI
                </Button>

                <Table
                    columns={this.columns}
                    dataSource={listPOI}
                    onChange={this.handleTableChange}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showSizeChanger:false,
                    }}
                    scroll={{ y: '60vh' }}
                    bordered />

                <Modal
                    title="Update POI"
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

                            label="Image"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Image src={imageView} />
                            <input style={{ display: 'none' }} className="input-file" ref={input => this.inputRef = input} onChange={(e) => { this.handleFileChange(e) }} type="file" />
                            <Button onClick={() => {
                                this.handleBtnClick()
                            }} type="primary" size="'large'" icon={<UploadOutlined />}
                                loading={confirmLoading}>
                                Upload
                            </Button>
                        </Form.Item>
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
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="longtitude"
                            label="Longtitude"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="poiTypeId"
                            label="POI Type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listPOIType.map(item => (
                                    <Select.Option key={item.poitypeId} value={item.poitypeId}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="destinationId"
                            label="Destination"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listDestination.map(item => (
                                    <Select.Option key={item.destinationId} value={item.destinationId}>
                                        {item.destinationName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>


                        </Form.Item>
                    </Form>


                </Modal>

                <Modal
                    title="Add POI"
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

                            label="Image"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Image src={imageView} />
                            <input style={{ display: 'none' }} className="input-file" ref={input => this.inputRef = input} onChange={(e) => { this.handleFileAddChange(e) }} type="file" />
                            <Button onClick={() => {
                                this.handleBtnClick()
                            }} type="primary" size="'large'" icon={<UploadOutlined />}>
                                Upload
                            </Button>
                        </Form.Item>
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
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="longtitude"
                            label="Longtitude"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="poiTypeId"
                            label="POI Type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listPOIType.map(item => (
                                    <Select.Option key={item.poitypeId} value={item.poitypeId}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="destinationId"
                            label="Destination"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listDestination.map(item => (
                                    <Select.Option key={item.destinationId} value={item.destinationId}>
                                        {item.destinationName}
                                    </Select.Option>
                                ))}
                            </Select>
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
export default POIManagement;