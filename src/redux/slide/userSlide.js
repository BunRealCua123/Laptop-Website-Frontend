import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    _id: '',
    isAdmin: false,
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, _id, isAdmin, address, city, phone } = action.payload;
            // console.log('action', action);
            state.name = name || email;
            if (isAdmin === true) {
                state.name = 'Admin';
            }
            if (email) state.email = email;
            if (_id) state._id = _id;
            state.isAdmin = isAdmin;
            if (address) state.address = address;
            if (city) state.city = city;
            if (phone) state.phone = phone;
            // state.exp = exp;
            // state.id = _id;
        },
        deleteUser: (state, action) => {
            const { name, email, _id, isAdmin, address, city, phone } = action.payload;
            // console.log('action', action);
            state.name = name || email;
            if (isAdmin === true) {
                state.name = 'Admin';
            }
            state.email = email;
            state._id = _id;
            state.isAdmin = isAdmin;
            state.address = address;
            state.city = city;
            state.phone = phone;
        },
    },
});

export const { updateUser, deleteUser } = userSlide.actions;

export default userSlide.reducer;
