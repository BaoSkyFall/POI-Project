import React, { Component } from 'react'

import PaymentAccounts from '../../../../containers/customer/payment-accounts';
import InternalTransfer from '../../../../containers/customer/internal-tranfer';
import SetupRecipient from '../../../../containers/customer/setup-recipient';
import TransactionHistory from '../../../../containers/customer/transaction-history';
import DebtReminder from '../../../../containers/customer/debt-reminder';
import UsersManagement from '../../../../containers/customer/users-management';
import VisitManagement from '../../../../containers/customer/visit-management';
import TripManagement from '../../../../containers/customer/trip-management';
import HashTagManagement from '../../../../containers/customer/hashtag-management';
import DestinationManagement from '../../../../containers/customer/destination-management';
import DestinationTypeManagement from '../../../../containers/customer/destination-type-management';

// import CloseWallet from '../../../../containers/customer/close-wallet';

// import OTPEmail from '../../../../containers/customer/otp-email';

import { MENUITEM, OTP_EMAIL } from '../../../../configs/client';
import './content.css'

export default class Content extends Component {
    render() {
        let content_layout;

        switch (this.props.content_type) {
            case MENUITEM.INTERNAL_TRANSFER: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Internal Transfer</h2>
                        <InternalTransfer />
                    </React.Fragment>
                );
            }
            case MENUITEM.DEBT_REMINDER: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Debt Reminder</h2>
                        <DebtReminder />
                    </React.Fragment>
                );
            }
            case MENUITEM.SETUP_RECIPIENT: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Setup Recipient</h2>
                        <SetupRecipient />
                    </React.Fragment>
                );
            }
            case MENUITEM.TRANSACTION_HISTORY: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Transaction History</h2>
                        <TransactionHistory />
                    </React.Fragment>
                );
            }
            case MENUITEM.CLOSE_WALLET: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Close Wallet</h2>
                        {/* <CloseWallet /> */}
                    </React.Fragment>
                );
            }
            case OTP_EMAIL: {
                return content_layout = (
                    <React.Fragment>
                        {/* <OTPEmail /> */}
                    </React.Fragment>
                )
            }
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
            default: {
                content_layout = (
                    <React.Fragment>
                        <h2>User's Payment Wallet</h2>
                        <PaymentAccounts />
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
