import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { useNavigate } from 'react-router-dom';
import './successorder.css';
function SuccessOrder() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const handleClick = () => {
        navigate('/');
    };
    // console.log('State', location.state);

    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            {/* <Loading isLoading={false}> */}
            <div style={{ height: '100%', margin: '0 auto' }}>
                <h3 style={{ margin: 0, padding: '20px 0px 20px 20px' }}>Đơn hàng đặt thành công</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <div className="WrapperInfo">
                            <div>
                                <span className="Lable">Phương thức giao hàng</span>
                                <div className="WrapperValue">
                                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                        {orderContant.delivery[state?.delivery]}
                                    </span>{' '}
                                    Giao hàng tiết kiệm
                                </div>
                            </div>
                        </div>
                        <div className="WrapperInfo">
                            <div>
                                <span className="Lable">Phương thức thanh toán</span>

                                <div className="WrapperValue">{orderContant.payment[state?.payment]}</div>
                            </div>
                        </div>
                        <div className="WrapperItemOrderInfo">
                            {state.orders?.map((order) => {
                                return (
                                    <div className="WrapperItemOrder">
                                        <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <img
                                                src={order.image}
                                                style={{ width: '77px', height: '77px', objectFit: 'cover' }}
                                            />
                                            <div
                                                style={{
                                                    width: 260,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {order?.name}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span>
                                                <span style={{ fontSize: '15px', color: '#242424' }}>
                                                    Giá tiền: {convertPrice(order?.price)}
                                                </span>
                                            </span>
                                            <span>
                                                <span style={{ fontSize: '15px', color: '#242424' }}>
                                                    Số lượng: {order?.amount}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <span style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }}>
                                Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                            </span>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 50 }}>
                            <button
                                style={{
                                    padding: 10,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: 5,
                                }}
                                onClick={handleClick}
                            >
                                Quay về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Loading> */}
        </div>
    );
}

export default SuccessOrder;
