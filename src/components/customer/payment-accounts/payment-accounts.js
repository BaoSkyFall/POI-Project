import React, { Component } from 'react';
import { Table, Spin, notification, Popconfirm } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { formatWallet } from '../../../ultis/wallet';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import jwt from 'jwt-decode';

class PaymentAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
            email: localStorage.getItem(EMAIL_KEY)


        }
    }
    componentDidMount = () => {
        const { accessToken, email } = this.state;
        let decode = jwt(accessToken);
        const { fetchPaymentAccounts } = this.props;
        fetchPaymentAccounts(decode.userId,accessToken)
    }
    render() {
        const { messageError, isLoading, paymentAccounts } = this.props;

        const columns = [{
            title: 'User\'s Wallet Name',
            dataIndex: 'name_saving',
            width: "30%",
            sorter: (a, b) => a.name_saving.localeCompare(b.name_saving),
        }, {
            title: 'Current Balance (VND)',
            dataIndex: 'spending',
            className: 'column-balance',

            defaultSortOrder: 'descend',
            render: values => (

                <span className="table-operation">
                    {values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    } đ
                </span>

            ),
            sorter: (a, b) => a.spending - b.spending,
        }];

        if (messageError === 'AccessToken is not valid') {
            // this.props.resetStore();
            return (<Redirect to={{
                // pathname: '/signin',
            }} />);
        }

        if (messageError === 'AccessToken is not valid') {
            // this.props.resetStore();
            return (<Redirect to={{
                // pathname: '/signin',
            }} />);
        }
        const contentLayout = (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={'color:red'} />,
                    }) : null}

                <Table
                    columns={columns}
                    dataSource={paymentAccounts}
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