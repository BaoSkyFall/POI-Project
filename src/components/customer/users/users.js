import React from 'react';
import { Table, Button, Tag, notification, Icon, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined } from '@ant-design/icons';

class UsersManagement extends React.Component {
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
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.phone.localeCompare(b.phone),
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
            className: 'column-money',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            width: '15%',
            sorter: (a, b) => a.amount.localeCompare(b.amount),
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }

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