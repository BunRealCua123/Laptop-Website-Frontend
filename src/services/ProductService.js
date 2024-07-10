import axios from 'axios';
export const getAllProduct = async (obj) => {
    const res = await axios.get(`http://localhost:4000/api/product/all`, {
        params: obj,
    });
    return res.data;
};
export const createProduct = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/product/create`, data);
    return res.data;
};
export const getDetailProduct = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/product/detail/${id}`);
    return res.data;
};
export const updateProduct = async (id, data) => {
    const res = await axios.put(`http://localhost:4000/api/product/update/${id}`, data);
    return res.data;
};
export const deleteProduct = async (id) => {
    const res = await axios.delete(`http://localhost:4000/api/product/delete/${id}`);
    return res.data;
};
