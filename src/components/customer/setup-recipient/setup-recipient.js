import React from 'react';
import {
    Table, Input, Button, Popconfirm, Form, notification, Icon, Spin
} from 'antd';
import { Redirect } from 'react-router-dom';

import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import './style.css';

import ModalAddRecipient from '../setup-recipient/modal-add-recipient/modal-add-recipient'
import { URL_SERVER } from '../../../configs/server';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                        <div
                                            className="editable-cell-value-wrap"
                                            style={{ paddingRight: 24 }}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                        </div>
                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class SetupRecipient extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: "Recipient's Account Number",
            dataIndex: 'walletNumber',
            width: '40%',
        }, {
            title: 'Remind Name (Click to edit)',
            dataIndex: 'remindName',
            width: '50%',
            editable: true,
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            render: (text, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.walletNumber)}>
                    <a href="javascript:;">Delete</a>
                </Popconfirm>
            ),
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }

    handleDelete = (walletNumber) => {
        const { accessToken, email } = this.state;
        this.props.deleteRecipient(email, walletNumber, accessToken);
    }

    handleSave = (row) => {
        const { accessToken, email } = this.state;
        const newData = this.props.recipients;
        const index = newData.findIndex(item => row.walletNumber === item.walletNumber);
        const item = newData[index];
        this.props.updateRecipient(email, item.walletNumber, row.remindName, accessToken);
    }

    handleAdd = () => {
        this.props.toggleModalAddRecipient(true);
    }

    componentDidMount() {
        const { accessToken, email } = this.state;
        this.props.fetchRecipients(email, accessToken);

        fetch(`${URL_SERVER}/user/me`, {
            headers: {
                x_accesstoken: accessToken
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem(EMAIL_KEY, res.data.email)
                localStorage.setItem('role', res.data.role)
                if (res.data.role !== 'customer') 
                    window.location.href = '/signin';
            }
            else {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(EMAIL_KEY);
                localStorage.removeItem('role');
                window.location.href = '/signin';
            }
        })
    }

    render() {
        const { recipients, messageSuccess, messageError, isLoading } = this.props;

        if (messageError === 'AccessToken is not valid') {
            return (<Redirect to={{
                pathname: '/signin',
            }}/>);
        }

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const contentLayout = (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <Icon type="warning" style={{ color: 'red' }} />,
                    }) : null}

                {messageSuccess ? 
                    notification.open({
                        message: messageSuccess,
                        icon: <Icon type="info" style={{ color: 'blue' }} />,
                    }) : null}


                {messageSuccess || messageError ? this.props.resetStore() : null}   

                <Button type="primary" icon="plus" style={{marginBottom: '1%'}} onClick={this.handleAdd} >Add</Button>
                <br/>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={recipients}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                />
            </React.Fragment>
        )
        return (
            <div className='main-content setup-recipient'>
                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                )}

                {!isLoading && contentLayout}

                <ModalAddRecipient {...this.props} {...this.state}/>
            </div>
        );
    }
}

export default SetupRecipient;