import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
    LogoutOutlined,
    AppstoreOutlined,
    ControlOutlined,
    TagOutlined,
    CheckCircleOutlined,
    FlagOutlined,
    UserOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { MENUITEM } from '../../../../configs/client';
import './menu.css';
const { SubMenu } = Menu;

class MenuLeft extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: false,
        }

    }


    toggleCollapsed = () => {
        this.props.updateCollapse(!this.state.collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let pathname = window.location.pathname;
        pathname = pathname.substring(pathname.lastIndexOf('/') + 1);
        console.log('pathname:', pathname)
        let defaultKey = '';
        switch (pathname) {
            case MENUITEM.DESTINATION_MANAGEMENT:
                defaultKey = '1'
                break;
            case MENUITEM.DESTINATION_TYPE:
                defaultKey = '2'

                // code block
                break;
            case MENUITEM.POI_MANAGEMENT:
                defaultKey = '3'

                break;
            case MENUITEM.POI_TYPE:
                defaultKey = '4'
                break;
            case MENUITEM.HASHTAG:
                defaultKey = '5'
                break;
            case MENUITEM.TRIP:
                defaultKey = '6'
                break;
            case MENUITEM.USER:
                defaultKey = '7'
                break;
            case MENUITEM.VISIT:
                defaultKey = '8'
                break;
            case MENUITEM.VOTE:
                defaultKey = '9'
                break;

            default:
                defaultKey = '1'
                break;

        }
        console.log('defaultKey:', defaultKey)
        return (
            <Menu
                defaultSelectedKeys={defaultKey}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
                defaultOpenKeys={['sub1','sub2']}
            >
                {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button> */}
                {/* <Menu.Item key="1" icon={<WalletOutlined />} >
                    <Link to={MENUITEM.PAYMENT_ACCOUNTS} >
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SwapOutlined />}>
                    <Link to={MENUITEM.INTERNAL_TRANSFER} >
                        <span>Tranfer Monney</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="3" icon={<CreditCardOutlined />
                }>
                    <Link to={MENUITEM.DEBT_REMINDER} >
                        <span>Debt Reminder</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="4" icon={<DollarCircleOutlined />}>
                    <Link to={MENUITEM.SAVING} >
                        <span>Saving</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<UserSwitchOutlined />}>
                    <Link to={MENUITEM.SETUP_RECIPIENT} >
                        <span>Setup Recipient</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="6" icon={<FormOutlined />}>
                    <Link to={MENUITEM.TRANSACTION_HISTORY} >
                        <span>Transaction History</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<LogoutOutlined />}>
                    <Link to="/" >
                        <span>Logout</span>
                    </Link>
                </Menu.Item> */}
                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Destination">
                    <Menu.Item key="1">
                        <Link to={MENUITEM.DESTINATION_MANAGEMENT} >
                            <span>Destination Management</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={MENUITEM.DESTINATION_TYPE} title="Destination Type">
                            <span>Destination Type Management</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<ControlOutlined />} title="POI">
                    <Menu.Item key="3">
                        <Link to={MENUITEM.POI_MANAGEMENT} >
                            <span>POI Management</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={MENUITEM.POI_TYPE} title="POI Type">
                            <span>POI Type Management</span>
                        </Link>

                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="5" icon={<TagOutlined />} title="Hashtag">
                    <Link to={MENUITEM.HASHTAG} >
                        <span>Hashtag</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<FlagOutlined />} title="Trip Management">
                    <Link to={MENUITEM.TRIP} >
                        <span>Trip Management</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<UserOutlined />} title="User Management">
                    <Link to={MENUITEM.USER} >
                        <span>User Management</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="8" icon={<EyeOutlined />} title="Visit Management">
                    <Link to={MENUITEM.VISIT} >
                        <span> Visit Management</span>
                    </Link>
                </Menu.Item>
                {/* <Menu.Item key="9" icon={<CheckCircleOutlined />}>
                    <Link to={MENUITEM.VOTE} >
                        <span>Vote  Management</span>
                    </Link>
                </Menu.Item> */}
                <Menu.Item key="10" icon={<LogoutOutlined />}>
                    <Link to="/" >
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