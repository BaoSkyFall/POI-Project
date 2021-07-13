import React, { Component } from 'react'

import UsersManagement from '../../../../containers/customer/users-management';
import VisitManagement from '../../../../containers/customer/visit-management';
import TripManagement from '../../../../containers/customer/trip-management';
import HashTagManagement from '../../../../containers/customer/hashtag-management';
import DestinationManagement from '../../../../containers/customer/destination-management';
import DestinationTypeManagement from '../../../../containers/customer/destination-type-management';
import POIManagement from '../../../../containers/customer/poi';
import POITypeManagement from '../../../../containers/customer/poi-type';
import BlogManagement from '../../../../containers/customer/blog';



// import CloseWallet from '../../../../containers/customer/close-wallet';

// import OTPEmail from '../../../../containers/customer/otp-email';

import { MENUITEM, OTP_EMAIL } from '../../../../configs/client';
import './content.css'

export default class Content extends Component {
    render() {
        let content_layout;

        switch (this.props.content_type) {

            case MENUITEM.USER: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Users Management</h2>
                        <UsersManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.VISIT: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Visit Management</h2>
                        <VisitManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.TRIP: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Trip Management</h2>
                        <TripManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.HASHTAG: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Hashtag Management</h2>
                        <HashTagManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.DESTINATION_MANAGEMENT: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Destination Management</h2>
                        <DestinationManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.DESTINATION_TYPE: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Destination Type Management</h2>
                        <DestinationTypeManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.POI_MANAGEMENT: {
                return content_layout = (
                    <React.Fragment>
                        <h2>POI Management</h2>
                        <POIManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.POI_TYPE: {
                return content_layout = (
                    <React.Fragment>
                        <h2>POI Type Management</h2>
                        <POITypeManagement />
                    </React.Fragment>
                );
            }
            case MENUITEM.BLOG: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Blog Management</h2>
                        <BlogManagement />
                    </React.Fragment>
                );
            }
            default: {
                content_layout = (
                    <React.Fragment>
                        <h2>Destination Management</h2>
                        <DestinationManagement />
                    </React.Fragment>
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
