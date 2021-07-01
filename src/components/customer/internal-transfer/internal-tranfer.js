import React from 'react';
import { Button, Row, Form, notification, Icon, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import InternalRemitter from './internal-remitter/internal-remitter';
import InternalRecipient from './recipient-information/recipient-information';
import DetailTransfer from './detail-transfer/detail-transfer';
import ModalTransfer from './modal-transfer/modal-transfer';

import { ACCESS_TOKEN_KEY, EMAIL_KEY, OTP_EMAIL } from '../../../configs/client';
import './style.css'
import { URL_SERVER } from '../../../configs/server';

class InternalTransfer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || '',
            values: {}
        }
    }

    componentDidMount() {
        const { accessToken, email } = this.state;
        this.props.fetchUserWallets(email, accessToken);
        this.props.fetchRecipients(email, accessToken);

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(err)
            if (!err) {
                this.setState({ values })
                this.props.toggleModalTransfer(true);
            }
        });
    }

    handleReset = () => {
        this.props.form.setFieldsValue({
            'originWalletNumber': '',
            'your-balance': '',
            'destinationWalletNumber': '',
            'amount': '',
            'payBy': '',
            'message': ''
        })
    }

    render() {
        const { messageError, messageSuccess, isLoading } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6, offset: 1 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12, offset: 4 },
            },
        };

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
                    }) : null}

                {messageSuccess ? (
                    <Redirect to={{
                        pathname: OTP_EMAIL,
                   }}/> 
                ): null}

                {messageSuccess || messageError ? this.props.resetStore(): null}

                <Row>
                    <InternalRemitter {...this.props} formItemLayout={formItemLayout}/>
                </Row>
                <Row>
                    <InternalRecipient {...this.props} {...this.state} formItemLayout={formItemLayout}/>
                </Row>
                <Row>
                    <DetailTransfer {...this.props} formItemLayout={formItemLayout}/>
                </Row>
                    <Row className="rowButton">
                        <Button
                            type="primary"
                            icon="like"
                            style={{marginRight: '1%'}}
                            htmlType="submit">Send</Button>
                        <Button
                            type="danger"
                            icon="close-circle"
                            onClick={this.handleReset}>Reset</Button>                        
                    </Row>
            </React.Fragment>
        );

        return (
            <Form className='main-content' onSubmit={this.handleSubmit}>
                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                )}

                {!isLoading && contentLayout}
                <ModalTransfer {...this.props} {...this.state}/>
            </Form>
        );
    }
}

export default Form.create()(InternalTransfer);