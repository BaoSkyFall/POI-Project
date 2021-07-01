import React from 'react';
import { Modal, Button, Spin, Input, Row, Col } from 'antd';
import { OTP_EMAIL } from '../../../../configs/client';
import TextArea from 'antd/lib/input/TextArea';

class ModalTransfer extends React.Component {
    state = { visible: false }

    handleOk = (e) => {
        const { originWalletNumber, destinationWalletNumber, payBy, amount, message } = this.props.values;
        const { accessToken, email } = this.props;
        this.props.sendTransferInformation(email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken);
    }

    handleCancel = (e) => {
        this.props.toggleModalTransfer(false);
    }

    render() {
        const { originWalletNumber, destinationWalletNumber, payBy, amount, message } = this.props.values;
        const { isLoading } = this.props;

        const contentLayout = (
            <React.Fragment>
                <Row>
                    <Col span={12}>Origin Wallet Number:</Col>
                    <Col span={12}><Input disabled value={originWalletNumber}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Destination Wallet Number:</Col>
                    <Col span={12}><Input disabled value={destinationWalletNumber}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Amount Transfer:</Col>
                    <Col span={12}><Input disabled value={amount}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Charge Bear:</Col>
                    <Col span={12}><Input disabled value={payBy}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Message:</Col>
                    <Col span={12}><TextArea disabled>{message}</TextArea></Col>
                </Row>
            </React.Fragment>
        )

        return (
            <div>
                <Modal
                    title="Transfer Information"
                    visible={this.props.isShowModalTransfer}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                    )}

                    {!isLoading && contentLayout}
                </Modal>
            </div>
        );
    }
}

export default ModalTransfer;