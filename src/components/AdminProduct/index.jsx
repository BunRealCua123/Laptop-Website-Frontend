import { Button, Form, Modal, Input, Upload, Drawer, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent';
import { useEffect, useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';
import { getBase64 } from '../../utils';
import * as Message from '../Messages';
import Loading from '../Loading';
import { useRef } from 'react';
import TinyMCE from '../TinyMCE';

function AdminProduct() {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [allproduct, setAllproduct] = useState([]);
    const [rowSelected, setRowSelected] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const [detailProduct, setDetailproduct] = useState({
        name: '',
        image: '',
        type: '',
        producer: '',
        price: '',
        countInStock: '',
        description: '',
        cpu: '',
        ram: '',
        screen: '',
        discount: 0,
    });
    const [stateProduct, setStateProduct] = useState({
        name: '',
        image: '',
        type: '',
        producer: '',
        price: '',
        countInStock: '',
        description: '',
        cpu: '',
        ram: '',
        screen: '',
        discount: 0,
    });
    const onClose = () => {
        setOpen1(false);
    };
    useEffect(() => {
        const getDetailProduct = async () => {
            const data1 = await ProductService.getDetailProduct(rowSelected);
            console.log('data', data1);
            if (data1?.data) {
                setDetailproduct(data1.data);
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
            // console.log(detailProduct);
        };
        if (rowSelected) {
            getDetailProduct();
        }
    }, [rowSelected]);
    const handleDetailProduct = () => {
        setOpen1(true);
        // console.log('rowSelected', rowSelected);

        // console.log('detailProduct', detailProduct);
    };
    // console.log('detailProduct', detailProduct);
    useEffect(() => {
        form1.setFieldsValue(detailProduct);
    }, [form1, detailProduct]);
    const Action = () => {
        return (
            <div>
                <EditOutlined
                    style={{ color: 'green', fontSize: 30, paddingRight: 5, cursor: 'pointer' }}
                    onClick={handleDetailProduct}
                />
                <DeleteOutlined
                    style={{ color: 'red', fontSize: 30, cursor: 'pointer' }}
                    onClick={() => setOpenDelete(true)}
                />
            </div>
        );
    };

    //search trong bảng product
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
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            filters: [
                {
                    text: 'Gaming',
                    value: 'gaming',
                },
                {
                    text: 'none',
                    value: 'none',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => {
                return record.type.startsWith(value);
            },
        },

        {
            title: 'Producer',
            dataIndex: 'producer',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            filters: [
                {
                    text: 'Nhỏ hơn 15 triệu',
                    value: '0 15',
                },
                {
                    text: 'Từ 15 đến 30 triệu',
                    value: '15 30',
                },
                {
                    text: 'Lớn hơn 30 triệu',
                    value: '30',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => {
                const arr = value.trim().split(' ');
                if (arr.length === 2) {
                    return Number(arr[0]) * 1000000 <= record.price && record.price <= Number(arr[1]) * 1000000;
                } else return Number(arr[0]) * 1000000 < record.price;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: Action,
        },
    ];

    // const isModalOpen = () => {
    //     setOpen(true);
    // };
    const handleCancel = () => {
        setOpen(false);
        setStateProduct({
            name: '',
            image: '',
            type: '',
            producer: '',
            price: '',
            countInStock: '',
            description: '',
            cpu: '',
            ram: '',
            screen: '',
            discount: 0,
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
    const mutation = useMutationHooks((data) => ProductService.createProduct(data));
    const mutation1 = useMutationHooks((data1) => {
        const { id, data } = data1;
        return ProductService.updateProduct(id, data);
    });
    const mutationDelete = useMutationHooks((id) => {
        return ProductService.deleteProduct(id);
    });

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            const data = await ProductService.getAllProduct({});
            // console.log('data', data);
            setIsLoading(false);
            setAllproduct(data.data);
        };
        getProduct();
    }, [mutation1.data, mutationDelete.data, mutation.data]);
    // console.log('allproduct', allproduct);

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
    function handleCreateProduct() {
        mutation.mutate(stateProduct);
        // console.log();
    }

    // const mutation1 = useMutationHooks((data1) => {
    //     const { id, data } = data1;
    //     return ProductService.updateProduct(id, data);
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

    function handleUpdateProduct() {
        mutation1.mutate({ id: rowSelected, data: detailProduct });
        // console.log('detailProduct', detailProduct);
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
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };
    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setDetailproduct({
            ...detailProduct,
            image: file.preview,
        });
    };
    const handleOnchange = (e) => {
        console.log('name', e.target.name, e.target.value);
        setStateProduct({ ...stateProduct, [e.target.name]: e.target.value });
    };
    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
        setStateProduct({ ...stateProduct, description: content });
    };

    const handleOnchangeDetail = (e) => {
        // console.log('name', e.target.name, e.target.value);
        setDetailproduct({ ...detailProduct, [e.target.name]: e.target.value });
    };

    const handleEditorChangeDetail = (content, editor) => {
        // console.log('Content was updated:', content);
        setDetailproduct({ ...detailProduct, description: content });
    };
    // console.log('form1', form1);

    return (
        <div>
            <h3 style={{ margin: 0 }}>Quản lý sản phẩm</h3>
            <div style={{ marginTop: 10 }}>
                <Button
                    style={{ width: 150, height: 150, borderRadius: 15, fontSize: 50 }}
                    onClick={() => setOpen(true)}
                >
                    <PlusOutlined />
                </Button>
                <div style={{ marginTop: 10 }}>
                    <Loading isLoading={isLoading}>
                        <TableComponent
                            columns={columns2}
                            data1={allproduct}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        setRowSelected(record._id);
                                    }, // click row
                                };
                            }}
                        />
                    </Loading>
                </div>
            </div>
            <Modal title="Thông tin sản phẩm" open={open} onCancel={handleCancel} footer={null} width={1000}>
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 3,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        style={{
                            maxWidth: 1000,
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
                            name="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input value={stateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="Type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <Input value={stateProduct.type} onChange={handleOnchange} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <Input value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <Input value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>
                        {/* thêm cpu, ram, screen */}
                        <Form.Item
                            label="Cpu"
                            name="cpu"
                            rules={[{ required: true, message: 'Please input your count cpu!' }]}
                        >
                            <Input value={stateProduct.cpu} onChange={handleOnchange} name="cpu" />
                        </Form.Item>

                        <Form.Item
                            label="Ram"
                            name="ram"
                            rules={[{ required: true, message: 'Please input your count ram!' }]}
                        >
                            <Input value={stateProduct.ram} onChange={handleOnchange} name="ram" />
                        </Form.Item>

                        <Form.Item
                            label="Screen"
                            name="screen"
                            rules={[{ required: true, message: 'Please input your count screen!' }]}
                        >
                            <Input value={stateProduct.screen} onChange={handleOnchange} name="screen" />
                        </Form.Item>

                        <Form.Item
                            label="discount"
                            name="discount"
                            // rules={[{ required: true, message: 'Please input your count discount!' }]}
                        >
                            <Input value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                        </Form.Item>
                        {/* thêm cpu, ram, screen */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <TinyMCE
                                value={stateProduct.description}
                                onChange={handleEditorChangeDetail}
                                name="description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Producer"
                            name="producer"
                            rules={[{ required: true, message: 'Please input your count producer!' }]}
                        >
                            <Input value={stateProduct.producer} onChange={handleOnchange} name="producer" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button>Select File</Button>
                                {stateProduct?.image && (
                                    <img
                                        src={stateProduct?.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            // borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={handleCreateProduct}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
            <Drawer title="Thông tin chi tiết của sản phẩm" onClose={onClose} open={open1} width="1200">
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
                            <Input value={detailProduct.name} onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <Input value={detailProduct.type} onChange={handleOnchangeDetail} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <Input
                                value={detailProduct.countInStock}
                                onChange={handleOnchangeDetail}
                                name="countInStock"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <Input value={detailProduct.price} onChange={handleOnchangeDetail} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <TinyMCE
                                value={detailProduct.description}
                                onChange={handleEditorChangeDetail}
                                name="description"
                                // value={detailProduct.description}
                                // onChange={handleEditorChangeDetail}
                                // name="description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Producer"
                            name="producer"
                            rules={[{ required: true, message: 'Please input your count producer!' }]}
                        >
                            <Input value={detailProduct.producer} onChange={handleOnchangeDetail} name="producer" />
                        </Form.Item>
                        {/* Thêm ram,cpu,screen,discount */}
                        <Form.Item
                            label="cpu"
                            name="cpu"
                            rules={[{ required: true, message: 'Please input your count cpu!' }]}
                        >
                            <Input value={detailProduct.cpu} onChange={handleOnchangeDetail} name="cpu" />
                        </Form.Item>

                        <Form.Item
                            label="ram"
                            name="ram"
                            rules={[{ required: true, message: 'Please input your count ram!' }]}
                        >
                            <Input value={detailProduct.ram} onChange={handleOnchangeDetail} name="ram" />
                        </Form.Item>

                        <Form.Item
                            label="screen"
                            name="screen"
                            rules={[{ required: true, message: 'Please input your count screen!' }]}
                        >
                            <Input value={detailProduct.screen} onChange={handleOnchangeDetail} name="screen" />
                        </Form.Item>

                        <Form.Item
                            label="discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your count discount!' }]}
                        >
                            <Input value={detailProduct.discount} onChange={handleOnchangeDetail} name="discount" />
                        </Form.Item>
                        {/* END Thêm ram,cpu,screen,discount */}
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <Upload onChange={handleOnchangeAvatarDetail} maxCount={1}>
                                <Button>Select File</Button>
                                {detailProduct?.image && (
                                    <img
                                        src={detailProduct?.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            // borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 12,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={handleUpdateProduct}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Drawer>
            <Modal title="Xóa sản phẩm" open={openDelete} onCancel={() => setOpenDelete(false)} onOk={handleDelete}>
                <div>Bạn có chắc muốn xóa sản phẩm?</div>
            </Modal>
        </div>
    );
}

export default AdminProduct;
