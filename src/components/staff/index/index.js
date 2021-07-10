import React, { Component } from 'react'
import './style.css'
import "antd/dist/antd.css";
import HeaderPage from './header/header';
import SiderPage from './sider/sider';
import ContentPage from './content/content';
import {
    Layout, Breadcrumb
} from 'antd';

const { Content } = Layout;

class StaffPage extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <HeaderPage />
                <Layout>
                    <SiderPage content_type={this.props.match.params.type} />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Staff</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.match.params.type}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content className="contentPage" style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            <ContentPage className="contentPage" content_type={this.props.match.params.type} {...this.props} />
                        </Content>
                    </Layout>
                </Layout>
            </React.Fragment>
        );

    }
}


export default StaffPage;
