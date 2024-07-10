import './cart.css';
import { Button, Checkbox, Input, InputNumber, Modal, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { convertPrice } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import * as Messages from '../../components/Messages';
import { useNavigate } from 'react-router-dom';
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
} from '../../redux/slide/orderSlide';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { updateUser } from '../../redux/slide/userSlide';
import Loading from '../../components/Loading';

const Cart = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
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
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };
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
    // console.log('priceMemo', order.orderItems);
    const handleRemoveAllOrder = () => {
        dispatch(removeAllOrderProduct({ listChecked: order.orderItems }));
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            });
        }
    }, [isOpenModalUpdateInfo]);

    const handleAddCard = () => {
        if (!order?.orderItems?.length) {
            Messages.error('Vui lòng chọn sản phẩm');
        } else {
            setIsOpenModalUpdateInfo(true);
        }
    };

    const handleCancleUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };
    const handleUpdateInforUser = () => {
        const { name, address, city, phone } = stateUserDetails;
        if (name && address && city && phone) {
            mutation1.mutate(
                { id: user?._id, ...stateUserDetails },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }));
                        setIsOpenModalUpdateInfo(false);
                        navigate('/payment');
                    },
                },
            );
        }
    };
    console.log('stateUserDetails', stateUserDetails);
    console.log('user day', user);
    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            <div>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="WrapperLeft">
                        <div className="WrapperStyleHeader">
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox
                                    onChange={handleOnchangeCheckAll}
                                    checked={listChecked?.length === order?.orderItems?.length}
                                ></Checkbox>
                                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </div>
                        <div className="WrapperListOrder">
                            {order?.orderItems?.map((order) => {
                                return (
                                    <div className="WrapperItemOrder">
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox
                                                onChange={onChange}
                                                value={order?.product}
                                                checked={listChecked.includes(order?.product)}
                                            ></Checkbox>
                                            <img
                                                src={order?.image}
                                                alt="product"
                                                style={{ width: '77px', height: '79px', objectFit: 'cover' }}
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
                                        <div
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {convertPrice(order?.price)}
                                                </span>
                                            </span>
                                            <div className="WrapperCountOrder">
                                                <button
                                                    style={{
                                                        border: 'none',
                                                        background: 'transparent',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleChangeCount('decrease', order?.product)}
                                                >
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                                <InputNumber
                                                    defaultValue={order?.amount}
                                                    value={order?.amount}
                                                    size="small"
                                                />
                                                <button
                                                    style={{
                                                        border: 'none',
                                                        background: 'transparent',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleChangeCount('increase', order?.product)}
                                                >
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </div>
                                            <span
                                                style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}
                                            >
                                                {convertPrice(order?.price * order?.amount)}
                                            </span>
                                            <DeleteOutlined
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDeleteOrder(order?.product)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="WrapperRight">
                        <div style={{ width: '100%' }}>
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
                                        {priceMemo}
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
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
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
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>
                                        {convertPrice(priceTotal)}
                                    </span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleAddCard()}
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
                    </div>
                </div>
            </div>
            <Modal
                title="Cập nhật thông tin giao hàng"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancleUpdate}
                onOk={handleUpdateInforUser}
            >
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        // onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your city!' }]}
                        >
                            <Input value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your  phone!' }]}
                        >
                            <Input value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Adress"
                            name="address"
                            rules={[{ required: true, message: 'Please input your  address!' }]}
                        >
                            <Input value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
        </div>
    );
};
export default Cart;
