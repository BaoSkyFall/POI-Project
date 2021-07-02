import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    Table, Input, Button, Popconfirm, Form, notification, Spin, Tabs
} from 'antd';
import { WarningOutlined, InfoCircleOutlined, PlusOutlined,DeleteFilled } from '@ant-design/icons';

import { Redirect } from 'react-router-dom';

import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import './style.css';
import ModalAddRecipient from '../setup-recipient/modal-add-recipient/modal-add-recipient'
import { URL_SERVER } from '../../../configs/server';
import jwt from 'jwt-decode'
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};


class SetupRecipient extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: "Recipient's Account Number",
            dataIndex: 'walletId',
            width: '30%',
        }, {
            title: 'Remind Name (Click to edit)',
            dataIndex: 'name_recipient',
            width: '30%',
            editable: true,
         
        }, {
            title: "Bank's Name",
            dataIndex: 'Name',
            width: '30%',
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            render: (text, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                   <a style={{ color: '#f5222d', fontSize: '15px' }}><DeleteFilled style={{ marginRight: '4px' }} />Delete</a> 
                </Popconfirm>
            ),
        }];

        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }
    componentDidUpdate() {
        const { accessToken } = this.state;
        const { fetchRecipients } = this.props

        let decoded = jwt(accessToken);
        console.log('decode:', decoded)
        // fetchRecipients(decode.username, accessToken);
        // this.props.fetchRecipients(decoded.username,accessToken);



    }
    handleDelete = (record) => {
        const { accessToken, email } = this.state;
        const { deleteRecipient, recipients } = this.props
        console.log('record:', record)
        this.props.deleteRecipient(record, recipients, accessToken);
        let decode = jwt(accessToken);
    }

    handleSave = (row) => {
        const { accessToken, email } = this.state;
        let decoded = jwt(accessToken);
        const newData = this.props.recipients;
        const index = newData.findIndex(item => row.walletId === item.walletId);
        const { updateRecipient, recipients } = this.props

        const item = newData[index];
        console.log('item:', item)
        console.log('row:', row);
        updateRecipient(row.id, row.id_recipient, row.name_recipient,row.walletId,recipients, accessToken);
    }

    handleAdd = () => {
        this.props.toggleModalAddRecipient(true);
    }

    componentDidMount() {
        const { accessToken, email } = this.state;
        let decode = jwt(accessToken);
        console.log('decode:', decode)
        this.props.fetchRecipients(decode.username, accessToken);
        
        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 200) {
        //         localStorage.setItem(EMAIL_KEY, res.data.email)
        //         localStorage.setItem('role', res.data.role)
        //         if (res.data.role !== 'customer') 
        //             window.location.href = '/signin';
        //     }
        //     else {
        //         localStorage.removeItem(ACCESS_TOKEN_KEY);
        //         localStorage.removeItem(EMAIL_KEY);
        //         localStorage.removeItem('role');
        //         window.location.href = '/signin';
        //     }
        // })
    }

    render() {
        const { recipients, messageSuccess, messageError, isLoading } = this.props;
        
        if (messageError === 'AccessToken is not valid') {
            return (<Redirect to={{
                pathname: '/signin',
            }} />);
        }
        const components = {
            body: {
                row: EditableRow,
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
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}

                {messageSuccess ?
                    notification.open({
                        message: messageSuccess,
                        icon: <InfoCircleOutlined style={{ color: 'blue' }} />,
                    }) : null}


                {messageSuccess || messageError ? this.props.resetStore() : null}

                <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '1%' }} onClick={this.handleAdd} >Add</Button>
                <br />
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

                <ModalAddRecipient {...this.props} {...this.state} />
            </div>
        );
    }
}

export default SetupRecipient;