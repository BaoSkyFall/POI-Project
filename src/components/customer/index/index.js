import React from 'react';
import HeaderPage from './header/header'
import MenuLeft from './menu/menu';
import Content from './content/content';
import './index.css'
import { Row, Col, notification } from 'antd';
import jwt from 'jwt-decode';

import { ACCESS_TOKEN_KEY } from '../../../configs/client';
const firebase = require("firebase");

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            notifications: null,
            isRead: true,
        }
    }

    updateCollapse = (collapse) => {
        this.setState({ collapse });
    }
    checkExistNotificationsFirebase = async (walletId) => {

        console.log('checkExistNotificationsFirebase Work!: ', walletId)
        const notification = await
            firebase
                .firestore()
                .collection('notifications')
                .doc(walletId)
                .get();
        console.log('notification exists:', notification.exists)
        console.log();
        if (!notification.exists) {
            firebase
                .firestore()
                .collection('notifications')
                .doc(walletId)
                .set({
                    walletId: walletId,
                    listNotify: [],
                    isRead: true
                })
        }
        else {
            firebase
                .firestore()
                .collection('notifications')
                .where('walletId', '==', walletId)
                .onSnapshot(async res => {
                    const data = res.docs.map(_doc => _doc.data());
                    console.log('data notifications:', data)
                    await this.setState({
                        notifications: data[0].listNotify,
                        isRead: data[0].isRead
                    });
                })
        }
    }
    componentDidMount = () => {
        console.log("componentDidMount work!")
        let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        let decoded = jwt(accessToken);
        this.checkExistNotificationsFirebase(decoded.walletId.toString());
        


    }

    render() {
        let GirdLayout;
        const { notifications, isRead } = this.state;

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

        return (
            <React.Fragment>
                <HeaderPage isRead={isRead} notifications={notifications} />
                {GirdLayout}
            </React.Fragment>
        )
    }
}

export default Dashboard;