import React, { Component } from 'react'
import "antd/dist/antd.css";
import {
    Layout, Menu
} from 'antd';

const { Header } = Layout;

class HeaderPage extends Component {
    render() {
        return (
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="3">Staff</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default HeaderPage;
