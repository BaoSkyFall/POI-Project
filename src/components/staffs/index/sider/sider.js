import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "antd/dist/antd.css";
import {
    Layout, Menu, Icon,
} from 'antd';


const { SubMenu } = Menu;
const {  Sider } = Layout;


class SiderPage extends Component {
    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.hover]}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" title={<span><Icon type="user" />Staff</span>}>
                        <Menu.Item key="1"><Link to="register">New User Account</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="payment">Open New Wallet</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="recharge">Recharge</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SiderPage;
