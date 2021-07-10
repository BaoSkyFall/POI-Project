import React from 'react';
import {
    Table, Popconfirm, Icon, notification, Spin
} from 'antd';
import { Redirect } from 'react-router-dom';

import { formatWallet } from '../../../utils/wallet';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import './style.css';
import { URL_SERVER } from '../../../configs/server';

class CloseWallet extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: "User\'s Wallet Number",
            dataIndex: 'walletNumber',
            width: '40%',
            sorter: (a, b) => a.walletNumber.localeCompare(b.walletNumber),
        }, {
            title: 'Current Balance (VND)',
            dataIndex: 'balance',
            className: 'column-money',
            width: '50%',
            editable: true,
            sorter: (a, b) => a.balance - b.balance,
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            render: (text, record) => (
                <Popconfirm
                    title="Sure to close?"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => this.handleClose(record.walletNumber)}>
                    <a href="javascript:;">Close</a>
                </Popconfirm>
            ),
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }

    handleClose = (walletNumber) => {
        const { accessToken, email } = this.state;
        this.props.closeUserWallet(email, walletNumber, accessToken);
    }

    componentDidMount() {
        const { accessToken, email } = this.state;
        this.props.fetchUserWallets(email, accessToken);

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
        const { userWallets, isLoading, messageError, messageSuccess } = this.props;
        const columns = this.columns;

        if (messageError === 'AccessToken is not valid') {
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

                {messageSuccess ?
                    notification.open({
                        message: messageSuccess,
                        icon: <Icon type="info" style={{ color: 'blue' }} />,
                    }): null}

                {messageSuccess || messageError ? this.props.resetStore() : null}

                <Table
                    bordered
                    dataSource={formatWallet(userWallets)}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                />
            </React.Fragment>
        )

        return (
            <div className='main-content close-wallet'>
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

export default CloseWallet;