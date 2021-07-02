import React, { Component } from 'react'
import "antd/dist/antd.css";
import './header.css';
import {
    Layout, Row, Col, Menu, Badge, Dropdown
} from 'antd';

import { BellOutlined, BuildOutlined } from '@ant-design/icons';
import { ACCESS_TOKEN_KEY } from '../../../../configs/client';
import jwt from 'jwt-decode'
const { Header } = Layout;
const firebase = require("firebase");
class HeaderPage extends Component {
    pushIsReadNotification() {
        let decode = jwt(localStorage.getItem(ACCESS_TOKEN_KEY));
        firebase
            .firestore()
            .collection('notifications')
            .doc(decode.walletId.toString())
            .update({
                isRead: true
            })
    }
    render() {
        let decode = jwt(localStorage.getItem(ACCESS_TOKEN_KEY));
        var { notifications, isRead } = this.props;
        console.log('notifications in props:', notifications)
        var menuitems = notifications ? notifications.map((notification, index) =>
            <Menu.Item key={index}>
                <a>{notification.content}</a>
            </Menu.Item>
        ) : <Menu.Item key="0">
                <a>Nothing</a>
            </Menu.Item>;
        var menu = (
            <Menu>
                {menuitems}
            </Menu>
        );
        return (
            <Header className="header">
                <div className="logo" />
                <Row>
                    <Col className="nameBank" span={3} offset={1}><h3><BuildOutlined style={{ fontSize: '25px', marginRight: '5px', fontWeight: 'bold' }} />Bảo Bình Đạt Bank</h3></Col>
                    <Col span={3} offset={13} style={{ color: 'white' }}>
                        <Dropdown placement="bottomCenter" overlay={menu} trigger={['click']}>

                            <a className="ant-dropdown-link" onClick={this.pushIsReadNotification}>
                                <Badge dot={!isRead}>
                                    <BellOutlined style={{ fontSize: '20px' }} />
                                </Badge>
                            </a>
                        </Dropdown>
                        <span style={{ marginLeft: '7px', fontSize: '18px' }}>{decode.name}</span>
                    </Col>
                </Row>

            </Header>
        )
    }
}

export default HeaderPage;
