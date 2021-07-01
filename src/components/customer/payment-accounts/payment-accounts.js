import React from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Spin, notification, Icon, Popconfirm } from 'antd';

import { formatWallet } from '../../../utils/wallet';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import './style.css';
import { URL_SERVER } from '../../../configs/server';

class PaymentAccounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }

    componentDidMount() {
        const { email, accessToken } = this.state;
        this.props.fetchPaymentAccounts(email, accessToken);    
        
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
        const { messageError, isLoading } = this.props;
        const columns = [{
            title: 'User\'s Wallet Number',
            dataIndex: 'walletNumber',
            width: '30%',
            sorter: (a, b) => a.walletNumber.localeCompare(b.walletNumber),
        }, {
            title: 'Current Balance (VND)',
            dataIndex: 'balance',
            width: '40%',
            className: 'column-money',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.balance - b.balance,
        }];

        if (messageError === 'AccessToken is not valid') {
            this.props.resetStore();
            return (<Redirect to={{
                pathname: '/signin',
            }}/>);
        }

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
                    columns={columns}
                    dataSource={formatWallet(this.props.paymentAccounts)}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />
            </React.Fragment>
        )
        
        return (
            <div className='main-content payment-account'>
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
export default PaymentAccounts;