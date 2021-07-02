import React from 'react';
import { Table, notification, Select, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { } from 'antd';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../ultis/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined } from '@ant-design/icons';
import jwt from 'jwt-decode'
const { Option } = Select;

class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: 'From Origin Wallet',
            dataIndex: 'user',
            defaultSortOrder: 'descend',
            width: '18%',
            // sorter: (a, b) => a.user - b.user,
        }, {
            title: 'To Destination Wallet',
            dataIndex: 'partner',
            width: '18%',
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.partner - b.partner,
        },
            , {
            title: 'Action',
            className: 'column-money',
            dataIndex: 'type',
            width: '13%',
            // sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: 'Date',
            dataIndex: 'time',
            // defaultSortOrder: 'descend',
            width: '20%',
            // sorter: (a, b) => a.time.localeCompare(b.time),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'money_transfer',
            // defaultSortOrder: 'descend',
            width: '15%',
            render: values => (

                <span className="">
                    {values > 0 ? '+' + values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                    } đ
                </span>

            ),
            sorter: (a, b) => a.money_transfer - b.money_transfer,
        }, {
            title: "Description",
            dataIndex: 'description',
            // defaultSortOrder: 'descend',
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            isAll: true,
        }
    }
    handleChangeOption = (value) =>{
        console.log('value:', value)
        const { accessToken, isAll } = this.state;
        this.setState({
            isAll: value
        })
        let decode = jwt(accessToken) || {}
        this.props.fetchTransactionHistoryLocal(decode.userId, accessToken,value);
        
      }
    componentDidMount() {
        const { accessToken, isAll } = this.state;
        let decode = jwt(accessToken) || {}
        this.props.fetchTransactionHistoryLocal(decode.userId, accessToken,isAll);

        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 200) {
        //         localStorage.setItem(EMAIL_KEY, res.data.email)
        //         localStorage.setItem('role', res.data.role)
        //         if (res.data.role !== 'customer') 
        //             window.location.href = '/signin';
        //     }
        //     else {
        //         localStorage.removeItem(ACCESS_TOKEN_KEY);
        //         localStorage.removeItem(EMAIL_KEY);
        //         localStorage.removeItem('role');
        //         window.location.href = '/signin';
        //     }
        // })
    }

    render() {
        const {isAll}= this.state;
        const { isLoading, transactionHistory, messageError } = this.props;
        console.log('transactionHistory:', transactionHistory)
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
                <Select defaultValue={isAll.toString()} style={{ width: 120 }} onChange={this.handleChangeOption}>
                    <Option value="true">All</Option>
                    <Option value="false">In Month</Option>


                </Select>
                <br />
                <br />                <Table
                    columns={this.columns}
                    dataSource={transactionHistory}
                    onChange={this.handleChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '80vh' }}
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
export default TransactionHistory; 