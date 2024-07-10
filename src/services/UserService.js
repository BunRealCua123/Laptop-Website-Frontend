import axios from 'axios';
export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/user/login`, data);
    return res.data;
};

export const createUser = async (data) => {
    const res = await axios.post('http://localhost:4000/api/user/register', data);
    return res.data;
};
export const getDetailUser = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/user/detail/${id}`);
    // console.log('data', res);
    return res.data;
};
export const getAllUser = async () => {
    const res = await axios.get(`http://localhost:4000/api/user/alluser`);
    // console.log('data', res);
    return res.data;
};
export const updateUser = async (id, data) => {
    const res = await axios.put(`http://localhost:4000/api/user/update/${id}`, data);
    return res.data;
};
export const deleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:4000/api/user/delete/${id}`);
    return res.data;
};
