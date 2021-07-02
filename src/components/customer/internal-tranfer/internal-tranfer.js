import React from 'react';
import { Button, Row, Form, notification, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { WarningOutlined, InfoCircleOutlined, SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import InternalRemitter from './internal-remitter/internal-remitter';
import InternalRecipient from './recipient-information/recipient-information';
import DetailTransfer from './detail-transfer/detail-transfer';
import ModalTransfer from './modal-transfer/modal-transfer';
import jwt from 'jwt-decode';
import OtpInput from 'react-otp-input';
import { ACCESS_TOKEN_KEY, EMAIL_KEY, OTP_EMAIL } from '../../../configs/client';
import './style.css'
import { URL_SERVER } from '../../../configs/server';

class InternalTransfer extends React.Component {
    formRef = React.createRef();
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
        let decode = jwt(accessToken) || {};
        console.log('decode:', decode)
        this.props.fetchUserWallets(decode.userId, accessToken);
        this.props.fetchRecipientsLocal(decode.username, accessToken);
        this.props.fetchRecipientsForeign(decode.username, accessToken);
        this.formRef.current.setFieldsValue({ idBank:'kianto' })

       
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

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("e", e)
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     console.log(err)
        //     if (!err) {
        //         this.setState({ values })
        //         this.props.toggleModalTransfer(true);
        //     }
        // });
    }
    handleOnClick = (e) => {
        e.preventDefault();
        const { toggleModalTransfer, isLocal, setValuesTranfer } = this.props;
        let data = this.formRef.current.getFieldsValue();
        setValuesTranfer(data);

        toggleModalTransfer();
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
    setBalanceUserWallet = (balance) => {
        this.formRef.current.setFieldsValue({ balance })

    }
    render() {
        const { messageError, messageSuccess, isLoading } = this.props;
        console.log('props123: ', this.props.values);
        console.log('messageError:', messageError)
        console.log('messageSuccess:', messageSuccess);
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
            }} />);
        }


        const contentLayout = (
            <React.Fragment>
                {/* {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}

                {messageSuccess ?
                    notification.open({
                        message: messageSuccess,
                        icon: <InfoCircleOutlined style={{ color: 'blue' }} />,
                    }) : null} */}

         

                {/* {messageSuccess || messageError ? this.props.resetStore() : null} */}

                <Row>
                    <InternalRemitter {...this.props} setBalanceUserWallet={this.setBalanceUserWallet} formItemLayout={formItemLayout} />
                </Row>
                <Row>
                    <InternalRecipient {...this.props} {...this.state} formItemLayout={formItemLayout} />
                </Row>
                <Row>
                    <DetailTransfer {...this.props} formItemLayout={formItemLayout} />
                </Row>

                <Row className="rowButton">
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        style={{ marginRight: '1%' }}
                        onClick={this.handleOnClick}
                        htmlType="submit">Send</Button>
                    <Button
                        type="danger"
                        icon={<CloseCircleOutlined />}
                        onClick={this.handleReset}>Reset</Button>
                </Row>
            </React.Fragment>
        );
        return (
       

            <Form className='main-content' ref={this.formRef} onSubmit={this.handleSubmit}>
                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                )}

                {!isLoading && contentLayout
                }
                < ModalTransfer data={this.props.values} {...this.props} {...this.state} />

            </Form>
        );
    }
}

export default InternalTransfer;