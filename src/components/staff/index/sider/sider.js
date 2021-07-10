import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "antd/dist/antd.css";
import {
    Layout, Menu
} from 'antd';
import { UserOutlined, UsergroupAddOutlined, BookOutlined, LogoutOutlined, TransactionOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
const { Sider } = Layout;


class SiderPage extends Component {
    render() {
        let pathname = window.location.pathname;
        pathname = pathname.substring(pathname.lastIndexOf('/') + 1);
        let defaultKey = '';
        switch (pathname) {
            case 'register':
                defaultKey = '1'
                break;
            case 'payment':
                defaultKey = '2'

                // code block
                break;
            case 'recharge':
                defaultKey = '3'

                break;

                defaultKey = '1'
                break;

        }
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={defaultKey}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" title={<span><UserOutlined />Staff</span>}>
                        <Menu.Item key="1" icon={<UsergroupAddOutlined />}><Link to="register">New Account</Link></Menu.Item>
                        <Menu.Item key="2" icon={<BookOutlined />}><Link to="payment">Get User Info</Link></Menu.Item>
                        <Menu.Item key="3" icon={<TransactionOutlined />}><Link to="recharge">Recharge</Link></Menu.Item>

                    </SubMenu>
                    <Menu.Item key="4" icon={<LogoutOutlined />}>
                        <Link to="/" >
                            <span>Logout</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SiderPage;
