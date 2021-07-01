import React from 'react';
import { Table, Button, notification, Icon, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../utils/transaction';
import { URL_SERVER } from '../../../configs/server';

class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Origin Wallet',
            dataIndex: 'originWalletNumber',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.originWalletNumber.localeCompare(b.originWalletNumber),
        }, {
            title: 'Destination Wallet',
            dataIndex: 'destinationWalletNumber',
            width: '18%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.destinationWalletNumber.localeCompare(b.destinationWalletNumber),
        }, {
            title: 'Date',
            dataIndex: 'when',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) =>  a.when.localeCompare(b.when),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            width: '15%',
            sorter: (a, b) =>  a.amount.localeCompare(b.amount),
        },  {
            title: 'Charge Fee (VND)',
            className: 'column-money',
            dataIndex: 'chargeFee',
            defaultSortOrder: 'descend', 
            width: '13%',
            sorter: (a, b) =>  a.chargeFee.localeCompare(b.chargeFee),
        }, {
            title: "Message",
            dataIndex: 'message',
            defaultSortOrder: 'descend',
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }

    componentDidMount() {
        const { accessToken, email } = this.state;
        this.props.fetchTransactionHistory(email, accessToken);

        fetch(`${URL_SERVER}/user/me`, {
            headers: {
                x_accesstoken: accessToken
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem(EMAIL_KEY, res.data.email)
                localStorage.setItem('role', res.data.role)
                if (res.data.role !== 'customer') 
                    window.location.href = '/signin';
            }
            else {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(EMAIL_KEY);
                localStorage.removeItem('role');
                window.location.href = '/signin';
            }
        })
    }

    render() {
        const { isLoading, transactionHistory, messageError } = this.props;

        if (messageError === 'AccessToken is not valid') {
            this.props.resetStore();
            return (<Redirect to={{
                pathname: '/signin',
            }}/>);
        }

        const contentLayout = (
            <React.Fragment>
                 {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <Icon type="warning" style={{ color: 'red' }} />,
                    }) : null}
                
                <Table
                    columns={this.columns}
                    dataSource={formatTransaction(transactionHistory)}
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
export default TransactionHistory; 