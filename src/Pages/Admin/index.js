import { Menu } from 'antd';
import React, { useState } from 'react';
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import AdminUser from '../../components/AdminUser';
import AdminProduct from '../../components/AdminProduct';
import AdminOrder from '../../components/AdminOrder';
function Admin() {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
    ];
    const [keySelected, setKeySelected] = useState('');

    const handleOnCLick = ({ key }) => {
        setKeySelected(key);
    };
    const checkSelect = (key) => {
        if (key === 'user') {
            return <AdminUser />;
        } else if (key === 'product') {
            return <AdminProduct />;
        } else if (key === 'order') {
            return <AdminOrder />;
        } else return <></>;
    };
    return (
        <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh',
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px' }}>{checkSelect(keySelected)}</div>
            </div>
        </div>
    );
}

export default Admin;
