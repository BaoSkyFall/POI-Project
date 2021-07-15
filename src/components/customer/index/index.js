import React from 'react';
import HeaderPage from './header/header'
import MenuLeft from './menu/menu';
import Content from './content/content';
import './index.css'
import { Row, Col } from 'antd';
import { browserHistory } from "react-router";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            notifications: null,
            isRead: true,
            accessToken: localStorage.getItem('accesstoken') || '',
        }
    }

    updateCollapse = (collapse) => {
        this.setState({ collapse });
    }
    checkExistNotificationsFirebase = async (walletId) => {

        console.log('checkExistNotificationsFirebase Work!: ', walletId)

    }
    componentDidMount = () => {
        console.log("componentDidMount work!")
        console.log('accesstoken index', localStorage.getItem('accesstoken'))
    }

    render() {
        let GirdLayout;
        const { notifications, isRead, accessToken } = this.state;
        console.log('this.props.match.params.type:', this.props.match.params.type)
        if (accessToken) {
            if (this.state.collapse) {
                GirdLayout = (<Row>
                    <Col span={2}>
                        <MenuLeft updateCollapse={this.updateCollapse} />
                    </Col>
                    <Col span={22}>
                        <Content content_type={this.props.match.params.type} />
                    </Col>
                </Row>);
            }
            else {
                GirdLayout = (<Row>
                    <Col span={5} className="col-left">
                        <MenuLeft updateCollapse={this.updateCollapse} />
                    </Col>
                    <Col span={18} offset={1} className="col-right">
                        <Content content_type={this.props.match.params.type} />
                    </Col>
                </Row>);
            }
        }
        else {
            localStorage.removeItem('accesstoken')
            window.location.href= window.location.origin
        }

        return (
            <React.Fragment>
                <HeaderPage isRead={isRead} notifications={notifications} />
                {GirdLayout}
            </React.Fragment>
        )
    }
}

export default Dashboard;