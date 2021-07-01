import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'antd';

import { MENUITEM } from '../../../../configs/client';
import './styles.css';
const { SubMenu } = Menu;

class MenuLeft extends React.Component {
    state = {
        collapsed: false,
    }

    toggleCollapsed = () => {
        this.props.updateCollapse(!this.state.collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
                className='menu-style'
            >
                <Button type="primary" onClick={this.toggleCollapsed} className='button-collapse'>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                {/* <Menu.Item key="1">
                    <Link to={MENUITEM.PAYMENT_ACCOUNTS} >
                        <Icon type="dashboard" />
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={MENUITEM.INTERNAL_TRANSFER} >
                        <Icon type="pay-circle" />
                        <span>Internal Tranfer</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={MENUITEM.SETUP_RECIPIENT} >
                        <Icon type="inbox" />
                        <span>Setup Recipient</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={MENUITEM.TRANSACTION_HISTORY} >
                        <Icon type="table" />
                        <span>Transaction History</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={MENUITEM.CLOSE_WALLET} >
                        <Icon type="close-square" />
                        <span>Close Wallet</span>
                    </Link>
                </Menu.Item> */}

                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>Destination</span>
                        </span>
                    }
                >
                    <Menu.Item key="1">

                        <Link to={MENUITEM.DESTINATION_MANAGEMENT} >

                            <span> Destination Management</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">

                        <Link to={MENUITEM.DESTINATION_TYPE} >

                            <span> Destination Type Management</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="control" />
                            <span>POI</span>
                        </span>
                    }
                >
                    <Menu.Item key="3">

                        <Link to={MENUITEM.POI_MANAGEMENT} >

                            <span> POI Management</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">

                        <Link to={MENUITEM.POI_TYPE} >

                            <span> POI Type Management</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="5">
                    <Link to={MENUITEM.HASHTAG} >
                        <Icon type="tags" />
                        <span>Hashtag</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="6">
                    <Link to={MENUITEM.TRIP} >
                        <Icon type="flag" />
                        <span>Trip Management</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to={MENUITEM.USER} >
                        <Icon type="user" />
                        <span>User Management</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link to={MENUITEM.VISIT} >
                        <Icon type="eye" />
                        <span>Visit Management</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link to={MENUITEM.VOTE} >
                        <Icon type="check" />
                        <span>Vote Management</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to='/signin' >
                        <Icon type="poweroff" />
                        <span>Logout</span>
                    </Link>
                </Menu.Item>
                {/* <Menu.Item key="5">
                    <Link to={MENUITEM.CLOSE_WALLET} >
                        <Icon type="tags" />
                        <span>Hashtag</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={MENUITEM.CLOSE_WALLET} >
                        <Icon type="tags" />
                        <span>Hashtag</span>
                    </Link>
                </Menu.Item> <Menu.Item key="5">
                    <Link to={MENUITEM.CLOSE_WALLET} >
                        <Icon type="tags" />
                        <span>Hashtag</span>
                    </Link>
                </Menu.Item> */}
            </Menu>
        );
    }
}

export default MenuLeft;