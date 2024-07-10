import { Button, Form, Modal, Input, Upload, Drawer, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent';
import { useEffect, useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import { getBase64 } from '../../utils';
import * as Message from '../Messages';
import Loading from '../Loading';
import { useRef } from 'react';
function AdminUser() {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [rowSelected, setRowSelected] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const [detailUser, setDetailUser] = useState({
        name: '',
        email: '',
        isAdmin: '',
        phone: '',
        address: '',
        city: '',
    });
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        isAdmin: '',
        phone: '',
        address: '',
        city: '',
    });
    const onClose = () => {
        setOpen1(false);
    };
    useEffect(() => {
        const getDetailUser = async () => {
            const data1 = await UserService.getDetailUser(rowSelected);
            console.log('data', data1);
            if (data1?.data) {
                setDetailUser(data1.data);
                // {
                //     name: data1.data.name,
                //     image: data1.data.image,
                //     type: data1.data.type,
                //     producer: data1.data.producer,
                //     price: data1.data.price,
                //     countInStock: data1.data.countInStock,
                //     description: data1.data.description,
                // }
            }
            // console.log(detailUser);
        };
        if (rowSelected) {
            getDetailUser();
        }
    }, [rowSelected]);
    console.log('detailUser', detailUser);
    const handleDetailUser = () => {
        setOpen1(true);
        // console.log('rowSelected', rowSelected);

        // console.log('detailUser', detailUser);
    };
    // console.log('detailUser', detailUser);
    useEffect(() => {
        form1.setFieldsValue(detailUser);
    }, [form1, detailUser]);
    const Action = () => {
        return (
            <div>
                <EditOutlined
                    style={{ color: 'green', fontSize: 30, paddingRight: 5, cursor: 'pointer' }}
                    onClick={handleDetailUser}
                />
                <DeleteOutlined
                    style={{ color: 'red', fontSize: 30, cursor: 'pointer' }}
                    onClick={() => setOpenDelete(true)}
                />
            </div>
        );
    };

    //search trong bảng User
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });
    const columns2 = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            width: 300,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'IsAdmin',
            dataIndex: 'isAdmin',
            render: (bool) => {
                if (bool) return 'Admin';
                else return 'User';
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: Action,
        },
    ];

    const handleCancel = () => {
        setOpen(false);
        setStateUser({
            name: '',
            email: '',
            isAdmin: '',
            phone: '',
            address: '',
            city: '',
        });
        form.resetFields();
    };
    const onFinish = () => {
        console.log('finish');
    };
    // const handleOk = () => {
    //     setOpen(false);
    //     onFinish();
    // };
    const mutation = useMutationHooks((data) => UserService.createUser(data));
    const mutation1 = useMutationHooks((data1) => {
        const { id, data } = data1;
        return UserService.updateUser(id, data);
    });
    const mutationDelete = useMutationHooks((id) => {
        return UserService.deleteUser(id);
    });
    useEffect(() => {
        const getUser = async () => {
            const data = await UserService.getAllUser({});
            // console.log('data', data);
            setAllUser(data.data);
        };
        getUser();
    }, [mutation1.data, mutationDelete.data]); //
    // console.log('allUser', allUser);

    const { data, isPending, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess) {
            if (data.status === 'OK') {
                Message.success(data.message);
            } else {
                Message.error(data.message);
            }
        }
        if (isError) {
            Message.error();
        }
    }, [isError, isSuccess]);
    function handleCreateUser() {
        mutation.mutate(stateUser);
        // console.log();
    }

    // const mutation1 = useMutationHooks((data1) => {
    //     const { id, data } = data1;
    //     return UserService.updateUser(id, data);
    // });
    useEffect(() => {
        const { data, isPending, isSuccess, isError } = mutation1;
        if (isSuccess) {
            if (data.status === 'OK') {
                Message.success(mutation1.data.message);
            } else {
                Message.error(mutation1.data.message);
            }
        }
        if (isError) {
            Message.error();
        }
    }, [mutation1.isError, mutation1.isSuccess]);
    function handleUpdateUser() {
        mutation1.mutate({ id: rowSelected, data: detailUser });
        // console.log('detailUser', detailUser);
        // console.log();
    }
    useEffect(() => {
        const { data, isPending, isSuccess, isError } = mutationDelete;
        if (isSuccess) {
            if (data.status === 'OK') {
                Message.success(mutationDelete.data.message);
            } else {
                Message.error(mutationDelete.data.message);
            }
        }
        if (isError) {
            Message.error();
        }
    }, [mutationDelete.isError, mutationDelete.isSuccess]);
    const handleDelete = () => {
        mutationDelete.mutate(rowSelected);
    };

    console.log('mutation1', mutation1);
    // const handleOnchangeAvatar = async ({ fileList }) => {
    //     const file = fileList[0];
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setStateUser({
    //         ...stateUser,
    //         image: file.preview,
    //     });
    // };
    // const handleOnchangeAvatarDetail = async ({ fileList }) => {
    //     const file = fileList[0];
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setDetailUser({
    //         ...detailUser,
    //         image: file.preview,
    //     });
    // };
    const handleOnchange = (e) => {
        console.log('name', e.target.name, e.target.value);
        setStateUser({ ...stateUser, [e.target.name]: e.target.value });
    };
    const handleOnchangeDetail = (e) => {
        console.log('name', e.target.name, e.target.value);
        setDetailUser({ ...detailUser, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <h3 style={{ margin: 0 }}>Quản lý người dùng</h3>
            <div style={{ marginTop: 10 }}>
                <Button
                    style={{ width: 150, height: 150, borderRadius: 15, fontSize: 50 }}
                    onClick={() => setOpen(true)}
                >
                    <PlusOutlined />
                </Button>
                <div style={{ marginTop: 10 }}>
                    <TableComponent
                        columns={columns2}
                        data1={[
                            ...allUser,
                            // { key: 1, name: 'hieu', email: 'hieu@gmail.com', phone: '0932894', isAdmin: true },
                            // { key: 2, name: 'hieu123', email: 'hieu@gmail.com', phone: '0932894', isAdmin: true },
                        ]}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    setRowSelected(record._id);
                                }, // click row
                            };
                        }}
                    />
                </div>
            </div>
            <Modal title="Thông tin User" open={open} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        // initialValues={{
                        //     remember: true,
                        // }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input value={stateUser.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input value={stateUser.email} onChange={handleOnchange} name="email" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your Phone!' }]}
                        >
                            <Input value={stateUser.phone} onChange={handleOnchange} name="phone" />
                        </Form.Item>
                        {/* <Form.Item
                            label="isAdmin"
                            name="isAdmin"
                            rules={[{ required: true, message: 'Please input your count isAdmin!' }]}
                        >
                            <Input value={stateUser.isAdmin} onChange={handleOnchange} name="isAdmin" />
                        </Form.Item> */}
                        <Form.Item
                            label="Address"
                            name="address"
                            // rules={[{ required: true, message: 'Please input your count address!' }]}
                        >
                            <Input value={stateUser.address} onChange={handleOnchange} name="address" />
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            // rules={[{ required: true, message: 'Please input your count city!' }]}
                        >
                            <Input value={stateUser.city} onChange={handleOnchange} name="city" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={handleCreateUser}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
            <Drawer title="Thông tin chi tiết của User" onClose={onClose} open={open1} width="1200">
                <Loading isLoading={mutation1.isPending}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        style={{
                            maxWidth: 1200,
                        }}
                        // initialValues={{
                        //     remember: true,
                        // }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form1}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input value={detailUser.name} onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input value={detailUser.email} onChange={handleOnchangeDetail} name="email" />
                        </Form.Item>
                        <Form.Item
                            label="phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input value={detailUser.phone} onChange={handleOnchangeDetail} name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="isAdmin"
                            name="isAdmin"
                            rules={[{ required: true, message: 'Please input your count isAdmin!' }]}
                        >
                            <Input value={detailUser.isAdmin} onChange={handleOnchangeDetail} name="isAdmin" />
                        </Form.Item>
                        <Form.Item
                            label="address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your count address!' }]}
                        >
                            <Input value={detailUser.address} onChange={handleOnchangeDetail} name="address" />
                        </Form.Item>
                        <Form.Item
                            label="city"
                            name="city"
                            rules={[{ required: true, message: 'Please input your count city!' }]}
                        >
                            <Input value={detailUser.city} onChange={handleOnchangeDetail} name="city" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 12,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={handleUpdateUser}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Drawer>
            <Modal title="Xóa User" open={openDelete} onCancel={() => setOpenDelete(false)} onOk={handleDelete}>
                <div>Bạn có chắc muốn xóa sản phẩm?</div>
            </Modal>
        </div>
    );
}

export default AdminUser;
