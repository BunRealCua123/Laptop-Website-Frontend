import axios from 'axios';

export const createOrder = async (data) => {
    const res = await axios.post('http://localhost:4000/api/order/create', data);
    return res.data;
};
export const getAllOrderDetails = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/order/allOrder/${id}`);
    return res.data;
};
export const getAllOrder = async () => {
    const res = await axios.get('http://localhost:4000/api/order/all');
    return res.data;
};
export const getDetailOrder = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/order/detail/${id}`);
    return res.data;
};
