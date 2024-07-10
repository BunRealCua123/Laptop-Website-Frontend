import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Button, Form, Radio } from 'antd';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import './paymentpage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as Messages from '../../components/Messages';
import { convertPrice } from '../../utils';
import { removeAllOrder } from '../../redux/slide/orderSlide';
import { PayPalButton } from 'react-paypal-button-v2';
import * as PaymentService from '../../services/PaymentService';

function PaymentPage() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);

    const [delivery, setDelivery] = useState('fast');
    const [payment, setPayment] = useState('later_money');
    const [sdkReady, setSdkReady] = useState(false);

    const [listChecked, setListChecked] = useState([]);
    const dispatch = useDispatch();
    const mutation1 = useMutationHooks((data1) => {
        const { id, data } = data1;
        return UserService.updateUser(id, data);
    });
    const { isPending, data } = mutation1;
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const [form] = Form.useForm();

    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            // console.log('tien', cur.price * cur.amount);
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);
    const priceTotal = useMemo(() => {
        let result = order?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        if (result > 30000000) {
            result = result - 0.1 * result;
        }
        return result;
    }, [order]);
    const giamgia = useMemo(() => {
        let result = order?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        if (result > 30000000) {
            result = 10;
        }
        return result;
    }, [order]);

    const mutationAddOrder = useMutationHooks((data) => {
        return OrderService.createOrder({ ...data });
    });

    const { data: dataAdd, isPending: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder;
    const handleAddOrder = () => {
        if (order?.orderItems && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?._id) {
            // eslint-disable-next-line no-unused-expressions
            mutationAddOrder.mutate({
                orderItems: order?.orderItems,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                totalPrice: priceTotal,
                user: user?._id,
                isPaid: false,
                paidAt: null,
                deliveryMethod: delivery,
            });
        }
    };

    const onSuccessPaypal = (details, data) => {
        if (order?.orderItems && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?._id) {
            // eslint-disable-next-line no-unused-expressions
            mutationAddOrder.mutate({
                orderItems: order?.orderItems,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                totalPrice: priceMemo,
                user: user?._id,
                isPaid: true,
                paidAt: details.update_time,
                deliveryMethod: delivery,
            });
        }
    };
    console.log('mutationAddOrder', payment, priceMemo, order?.orderItems, user);
    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            Messages.success('Đặt hàng thành công');
            // dispatch(removeAllOrder());
            navigate('/success', {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItems,
                    totalPriceMemo: priceTotal,
                },
            });
            dispatch(removeAllOrder());
        } else if (isError) {
            Messages.error();
        }
    }, [isSuccess, isError]);

    const handleDilivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig();
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            setSdkReady(false);
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isLoading={isLoadingAddOrder}>
                <div style={{ height: '100%', width: '1200px', margin: '0 auto' }}>
                    <h3 style={{ margin: 0, padding: 10 }}>Thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="WrapperLeft">
                            <div className="WrapperInfo">
                                <div style={{ marginLeft: 10 }}>
                                    <span style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>
                                        Chọn phương thức giao hàng
                                    </span>
                                    <Radio.Group className="radioGroup" onChange={handleDilivery} value={delivery}>
                                        <Radio value="fast">
                                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng
                                            tiết kiệm
                                        </Radio>
                                        <Radio value="gojek">
                                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao
                                            hàng tiết kiệm
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="WrapperInfo">
                                <div style={{ marginLeft: 10 }}>
                                    <span style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>
                                        Chọn phương thức thanh toán
                                    </span>
                                    <Radio.Group className="radioGroup" onChange={handlePayment} value={payment}>
                                        <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán qua Paypal</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className="WrapperRight">
                            <div style={{ width: '100%' }}>
                                <div className="WrapperInfo">
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: 'bold' }}>{`${user?.address}-${user?.city}`} </span>
                                </div>
                                <div className="WrapperInfo">
                                    <div
                                        style={{
                                            padding: '5px 10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Tạm tính</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                            {convertPrice(priceMemo)}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            padding: '5px 10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Giảm giá</span>
                                        <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>
                                            {giamgia}%
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            padding: '5px 10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Thuế</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                    </div>
                                    <div
                                        style={{
                                            padding: '5px 10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Phí giao hàng</span>
                                        <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>
                                            FREE SHIP
                                        </span>
                                    </div>
                                </div>
                                <div className="WrapperTotal">
                                    <span>Tổng tiền</span>
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span
                                            style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}
                                        >
                                            {convertPrice(priceTotal)}
                                        </span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                    </span>
                                </div>
                            </div>
                            {payment === 'paypal' ? (
                                <div style={{ width: '100%' }}>
                                    <PayPalButton
                                        amount={priceMemo / 25000}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => {
                                            alert('Erroe');
                                        }}
                                    />
                                </div>
                            ) : (
                                <Button
                                    onClick={() => handleAddOrder()}
                                    size={40}
                                    style={{
                                        background: 'rgb(255, 57, 69)',
                                        height: '48px',
                                        width: '100%',
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}
                                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                >
                                    Mua hàng
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default PaymentPage;
