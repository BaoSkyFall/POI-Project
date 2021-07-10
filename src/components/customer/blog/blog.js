import React from 'react';
import { Table, notification, Spin, Image, Select, Rate, Col, Popconfirm, Button, Modal, Form, Input, Tag, Space, DatePicker } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined, CheckCircleOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
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

class BlogManagement extends React.Component {
    formRef = React.createRef();
    formRefAdd = React.createRef();

    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Id',
            dataIndex: 'blogId',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.blogId.localeCompare(b.blogId),
        },
        {
            title: 'Title',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: record => (
                <Space size="middle">
                    <a onClick={() => { this.onViewBlog(record) }}>  {record.title} {'  '}
                        <EyeOutlined />
                    </a>

                </Space>
            )
        },
        {
            title: 'Author',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.tripName.localeCompare(b.tripName),
            render: record => (
                <Space size="middle">
                   {record.user.username}

                </Space>
            )
        },
        {
            title: 'Trip Name',
            dataIndex: 'tripName',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.tripName.localeCompare(b.tripName),
        },

        {
            title: 'Vote',
            width: '18%',
            render: record => (
                <Space size="middle">
                    <div>
                        Post Votes:  {record.posVotes}
                    </div>
                    <div>
                        Neg Votes:  {record.negVotes}
                    </div>
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
                    {
                        record.status === 1 ? <Popconfirm title="Sure to Inactive?" onConfirm={() => this.onDeleteBlog(record)}>
                            <a>Inactive</a>
                        </Popconfirm> : record.status === 2 ? <Popconfirm title="Sure to Active?" onConfirm={() => this.onActiveBlog(record)}>
                            <a>Active</a>
                        </Popconfirm> : null
                    }



                </Space>
            )
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            blogSelected: '',
            visibleUpdate: false,
            current: 1,
            pageSize: 10,
            visibleAdd: false,
            confirmLoading: false,
            imageView: null,
            imageAdd: null,
        }
    }

    onActiveBlog(values) {
        this.props.activeBlog(this.state.accessToken, values.blogId)

    }
    onViewBlog(values) {
        this.setState({ visibleUpdate: true, blogSelected: values })
        console.log('values:', values)
        setTimeout(() => {
            this.onFill(values)
        }, 100)
    }
    handleCancelModal() {

        this.setState({ visibleUpdate: false })
        // this.props.fetchAllBlog(this.state.accessToken,this.state.current);

    }
    onFinish = values => {
        values.blogId = this.state.blogSelected.blogId
        values.location = {
            latitude: values.latitude,
            longtitude: values.longtitude
        }
        values.imageUrl = this.state.imageView
        this.handleCancelModal()
        this.props.updateBlog(this.state.accessToken, values)
    };
    onFinishAdd = values => {
        console.log('values:', values)
        this.setState({ visibleAdd: false })
        values.location = {
            latitude: values.latitude,
            longtitude: values.longtitude
        }
        this.props.addBlog(this.state.accessToken, values, this.state.imageAdd)

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
    onAddBlog() {
        this.setState({ visibleAdd: true })
        if (this.formRefAdd.current) {
            this.formRefAdd.current.resetFields()
            this.setState({ imageAdd: null, imageView: null })

        }
    }
    onDeleteBlog(values) {
        console.log('values:', values)
        this.props.deleteBlog(this.state.accessToken, values.blogId)
    }
    handleBtnClick() {
        /*Collecting node-element and performing click*/
        this.inputRef.click();

    }
    handleFileChange(e) {
        /*Selected files data can be collected here.*/
        console.log(e.target.files);
        this.setState({ confirmLoading: true })
        const uploadTask = storage.ref(`poi/${this.state.blogSelected.blogId}`).put(e.target.files[0]);
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
                    .child(this.state.blogSelected.blogId)
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
            this.props.fetchAllBlog(this.state.accessToken, this.state.current)
        }
    }
    componentDidMount() {
        const { accessToken } = this.state;
        this.props.fetchAllBlog(accessToken, this.state.current);
    }
    handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination:', pagination)
        const { accessToken } = this.state;
        this.setState({ current: pagination.current })
        this.props.fetchAllBlog(accessToken, pagination.current);
    };
    render() {
        const { isLoading, messageError, isAction, messageSuccess, listBlog, total } = this.props;
        const { current, pageSize, visibleUpdate, blogSelected } = this.state;
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
                <Table
                    columns={this.columns}
                    dataSource={listBlog}
                    onChange={this.handleTableChange}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showSizeChanger: false,
                    }}
                    scroll={{ y: '60vh' }}
                    bordered />
                <Modal
                    title="Blog Content"
                    visible={visibleUpdate}
                    onOk={
                        this.handleOk
                    }
                    footer={[
                        <Button key="back" onClick={() => { this.handleCancelModal() }}>
                            Cancel
                        </Button>,
                    ]}
                    onCancel={() => { this.handleCancelModal() }}
                >
                    <h2>{blogSelected.title}</h2>
                    <p>{blogSelected.description}</p>
                    {blogSelected.imageUrls && blogSelected.imageUrls.map(element => {
                        return (
                            <Image src={element}></Image>
                        )
                    })}

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
export default BlogManagement;