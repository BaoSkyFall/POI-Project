import React, { Component } from 'react'

import Register from '../../register/content-register';
import Payment from '../../payment/content-payment';
import Recharge from '../../recharge/recharge';
import "antd/dist/antd.css";
// import './content.css'

export default class Content extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let content_layout;

        switch (this.props.content_type) {
            case "rgister": {
                return content_layout = (
                    <Register {...this.props} />
                );
            }
            case "payment": {
                return content_layout = (
                    <Payment {...this.props}/>
                );
            }
            case "recharge": {
                return content_layout = (
                    <Recharge {...this.props}/>
                );
            }

            default: {
                content_layout = (
                    <Register {...this.props}/>
                );
            }
        }

        return (
            <React.Fragment>
                {content_layout}
            </React.Fragment>
        )
    }
}
