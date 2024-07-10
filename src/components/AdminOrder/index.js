import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent';
import { useEffect, useState } from 'react';

import * as OrderService from '../../services/OrderService';
import { convertPrice } from '../../utils';
import Loading from '../Loading';
import { orderContant } from '../../contant';
function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const res = await OrderService.getAllOrder();
            setOrders(res.data);
            setIsLoading(false);
        };
        fetchOrders();
    }, []);

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
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
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'User name',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
            ...getColumnSearchProps('isPaid'),
        },
        {
            title: 'Shipped',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
            ...getColumnSearchProps('isDelivered'),
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod'),
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
            ...getColumnSearchProps('totalPrice'),
        },
    ];
    const dataTable =
        (orders?.length &&
            orders?.map((order) => {
                console.log('usewr', order);
                return {
                    ...order,
                    key: order._id,
                    userName: order?.shippingAddress?.fullName,
                    phone: order?.shippingAddress?.phone,
                    address: order?.shippingAddress?.address,
                    paymentMethod: orderContant.payment[order?.paymentMethod],
                    isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
                    isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
                    totalPrice: convertPrice(order?.totalPrice),
                };
            })) ||
        [];
    console.log('datatable', dataTable);
    return (
        <div>
            <h3>Quản lý đơn hàng</h3>
            <div style={{ marginTop: '20px' }}>
                <Loading isLoading={isLoading}>
                    <TableComponent columns={columns} data1={dataTable} />
                </Loading>
            </div>
        </div>
    );
}

export default AdminOrder;
