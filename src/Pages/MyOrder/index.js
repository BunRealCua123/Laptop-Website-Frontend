import { useEffect, useState } from 'react';
import * as OrderService from '../../services/OrderService';
import { convertPrice } from '../../utils';
import './myorder.css';
import { useNavigate } from 'react-router-dom';
function MyOrder() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrder = async () => {
            const userId = JSON.parse(localStorage.getItem('idUser')).id;
            const res = await OrderService.getAllOrderDetails(userId);
            setOrders(res?.data);
        };
        getOrder();
    }, []);
    console.log('orders', orders);
    return (
        <div>
            <h4>Đơn hàng của tôi</h4>
            <div className="WrapperListOrder1">
                {orders.length > 0 &&
                    orders.map((order) => {
                        return (
                            <div className="WrapperItemOrder1" key={order?._id}>
                                <div className="WrapperStatus1">
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                                        {`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}
                                    </div>
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán:</span>
                                        {`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}
                                    </div>
                                </div>
                                {order?.orderItems.map((item) => {
                                    return (
                                        <div className="ItemOrder" key={item._id}>
                                            <div>
                                                <img
                                                    src={item.image}
                                                    alt="product"
                                                    style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        objectFit: 'cover',
                                                        paddingRight: 10,
                                                    }}
                                                />
                                            </div>
                                            <div style={{ width: '70%', display: 'flex' }}>
                                                <span
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        width: '70%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: '13px',
                                                        color: 'rgb(56, 56, 61)',
                                                        width: '30%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {`Số lượng: ${item.amount}`}
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                    flex: 1,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {convertPrice(item.price)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="WrapperFooterItem1">
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                        <span style={{ fontSize: '15px', color: 'rgb(255, 66, 78)', fontWeight: 700 }}>
                                            {convertPrice(order?.totalPrice)}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            // onClick={() => handleAddCard()}
                                            style={{
                                                height: '36px',
                                                border: '1px solid rgb(11, 116, 229)',
                                                borderRadius: '4px',
                                                color: 'rgb(11, 116, 229)',
                                                fontSize: '14px',
                                            }}
                                            onClick={() => {
                                                navigate(`/orderdetail/${order._id}`);
                                            }}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default MyOrder;
