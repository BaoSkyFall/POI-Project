import React from 'react';
import { Table, notification, Spin, Select, Image, InputNumber, Col, Popconfirm, Button, Modal, Form, Input, Tag, Space, DatePicker } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined, CheckCircleOutlined, PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import { storage } from "../../../firebase/index";

import * as _ from 'lodash'
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

class DestinationManagement extends React.Component {


    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.formRefAdd = React.createRef();
        this.inputRef = React.createRef();

        this.columns = [{
            title: 'Id',
            dataIndex: 'destinationId',
            defaultSortOrder: 'descend',
            align: 'center',
            width: '18%',
            sorter: (a, b) => a.destinationId.localeCompare(b.destinationId),
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
            dataIndex: 'destinationName',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.destinationName.localeCompare(b.destinationName),
        },
        {
            title: 'Province',
            dataIndex: 'province',
            defaultSortOrder: 'descend',
            width: '18%',
            render: (province) => (
                <Space size="middle">
                    {province.name}
                </Space>
            )
        },
        {
            title: 'Destination Type',
            dataIndex: 'destinationType',
            defaultSortOrder: 'descend',
            width: '18%',
            render: (destinationType) => (
                <Space size="middle">
                    {destinationType.name}
                </Space>
            )
        },

        {
            title: 'HashTag',
            dataIndex: 'hashTags',
            width: '18%',
            render: hashTags => (
                <>
                    {hashTags.map(hashtag => {
                        return (
                            <Tag color="blue" key={hashtag.shortName}>
                                {hashtag.shortName}
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
                    <a onClick={() => this.onEditDestination(record)}>Edit</a>
                    {
                        record.status === 1 ? <Popconfirm title="Sure to Inactive?" onConfirm={() => this.onDeleteDestination(record)}>
                            <a>Inactive</a>
                        </Popconfirm> : null
                    }



                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            destinationSelected: '',
            visibleUpdate: false,
            visibleAdd: false,
            confirmLoading: false,
            imageView: null,
            imageAdd: null,
        }
    }


    onEditDestination(values) {
        this.setState({ visibleUpdate: true, destinationSelected: values })
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    handleCancelModal() {

        this.setState({ visibleUpdate: false })
        this.props.fetchAllDestination(this.state.accessToken);

    }
    onFinish = values => {
        values.destinationId = this.state.destinationSelected.destinationId
        values.location = {
            latitude: values.latitude,
            longtitude: values.longtitude
        }
        values.imageUrl = this.state.imageView
        this.handleCancelModal()
        this.props.updateDestination(this.state.accessToken, values)
    };
    onFinishAdd = values => {
        this.setState({ visibleAdd: false })
        values.location = {
            latitude: values.latitude,
            longtitude: values.longtitude
        }
        this.props.addDestination(this.state.accessToken, values, this.state.imageAdd)

    }
    onReset = () => {
        this.form.resetFields();
    };

    onFill = (data) => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                destinationName: data.destinationName,
                latitude: data.location.latitude,
                longtitude: data.location.longtitude,
                provinceId: data.province.provinceId,
                destinationTypeId: data.destinationType.destinationTypeId,
                imageUrl: data.imageUrl
            })
            this.setState({ imageView: data.imageUrl })
        }



    };
    onAddDestination() {
        this.setState({ visibleAdd: true })
        if (this.formRefAdd.current) {
            this.formRefAdd.current.resetFields()
            this.setState({ imageAdd: null, imageView: null })
        }
    }
    onDeleteDestination(values) {
        this.props.deleteDestination(this.state.accessToken, values.userId)
    }

    componentDidUpdate() {
        const { isAction } = this.props
        if (isAction) {
            this.props.fetchAllDestination(this.state.accessToken)
        }
    }
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllDestination(accessToken);
        this.props.fetchAllDestinationType(this.state.accessToken)
        this.props.fetchAllProvince(this.state.accessToken)
        // setTimeout(() => {
        //     storage
        //         .ref("destination")
        //         .listAll()
        //         .then(res => {
        //             // setUrl(res);
        //             console.log('res:', res)
        //             res.items.forEach((itemRef) => {
        //                 console.log('itemRef:', itemRef)
        //                 this.mapDisplayImage(itemRef);

        //                 // All the items under listRef.
        //             });
        //         });
        // }, 300)

    }
    mapDisplayImage(imageRef) {

        // imageRef.getDownloadURL().then(function (url) {
        //     console.log('url:', url)

        //     // TODO: Display the image on the UI
        // }).catch(function (error) {
        //     // Handle any errors
        // });
    }
    handleBtnClick() {
        /*Collecting node-element and performing click*/
        this.inputRef.click();

    }
    handleFileChange(e) {
        /*Selected files data can be collected here.*/
        console.log(e.target.files);
        this.setState({ confirmLoading: true })
        const uploadTask = storage.ref(`destination/${this.state.destinationSelected.destinationId}`).put(e.target.files[0]);
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
                    .ref('destination')
                    .child(this.state.destinationSelected.destinationId)
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
    render() {
        const { isLoading, messageError, isAction, messageSuccess, listDestination, listDestinationType, listProvince } = this.props;
        const { confirmLoading, visibleUpdate, visibleAdd, imageView } = this.state;
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
                    this.onAddDestination()
                }} type="primary" icon={<PlusSquareOutlined />}>
                    Add New Destination
                </Button>

                <Table
                    columns={this.columns}
                    dataSource={listDestination}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />

                <Modal
                    title="Update Destination"
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
                            }} type="primary" size="'large'" icon={<UploadOutlined />} loading={confirmLoading}>
                                Upload
                            </Button>
                        </Form.Item>
                        <Form.Item
                            name="destinationName"
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
                            name="provinceId"
                            label="Province"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listProvince.map(item => (
                                    <Select.Option key={item.provinceId} value={item.provinceId}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="destinationTypeId"
                            label="Destination Type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listDestinationType.map(item => (
                                    <Select.Option key={item.destinationTypeId} value={item.destinationTypeId}>
                                        {item.name}
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
                    title="Add Destination"
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
                            name="destinationName"
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
                            name="provinceId"
                            label="Province"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listProvince.map(item => (
                                    <Select.Option key={item.provinceId} value={item.provinceId}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="destinationTypeId"
                            label="Destination Type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                            >
                                {listDestinationType.map(item => (
                                    <Select.Option key={item.destinationTypeId} value={item.destinationTypeId}>
                                        {item.name}
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
export default DestinationManagement;