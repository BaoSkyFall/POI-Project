import React, { Component } from 'react'

import PaymentAccounts from '../../../../containers/customer/payment-accounts';
import InternalTransfer from '../../../../containers/customer/internal-transfer';
import SetupRecipient from '../../../../containers/customer/setup-recipient';
import TransactionHistory from '../../../../containers/customer/transaction-history';
import CloseWallet from '../../../../containers/customer/close-wallet';

import OTPEmail from '../../../../containers/customer/otp-email';
import DestinationManagement from '../../../../containers/customer/destination-management'


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
                        <CloseWallet />
                    </React.Fragment>
                );
            }
            case OTP_EMAIL: {
                return content_layout = (
                    <React.Fragment>
                        <OTPEmail />
                    </React.Fragment>
                )
            }
            case MENUITEM.DESTINATION_MANAGEMENT: {
                return content_layout = (
                    <React.Fragment>
                        <h2>Destination Management</h2>
                        <DestinationManagement />
                    </React.Fragment>
                )
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
