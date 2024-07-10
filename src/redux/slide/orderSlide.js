// import { createSlice } from '@reduxjs/toolkit';
// const initialState = {
//     orderItems: [],
//     shippingAddress: {},
//     paymentMethod: '',
//     itemsPrice: 0,
//     shippingPrice: 0,
//     totalPrice: 0,
//     user: '',
//     isPaid: false,
//     paidAt: '',
//     isDelivered: false,
//     deliveredAt: '',
// };
// export const orderSlide = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         addOrder: (state, action) => {
//             // console.log('action', state, action);
//             const { orderItem } = action.payload;
//             const itemOrder = state?.orderItems.find((item) => item?.product === orderItem?.product);
//             if (!itemOrder) {
//                 state.orderItems.push(orderItem);
//             }
//             // state.id = _id;
//         },
//         increaseAmount: (state, action) => {
//             // console.log('action', state, action);
//             const { idProduct } = action.payload;
//             const itemOrder = state?.orderItems.find((item) => item?.product === idProduct);
//             itemOrder.amount++;
//             // state.id = _id;
//         },
//         decreaseAmount: (state, action) => {
//             // console.log('action', state, action);
//             const { idProduct } = action.payload;
//             const itemOrder = state?.orderItems.find((item) => item?.product === idProduct);
//             if (itemOrder.amount > 1) itemOrder.amount--;
//             // state.id = _id;
//         },
//         removeOrder: (state, action) => {
//             // console.log('action', state, action);
//             const { idProduct } = action.payload;
//             const itemOrder = state?.orderItems.find((item) => item?.product !== idProduct);
//             itemOrder.orderItems = itemOrder;
//             // state.id = _id;
//         },
//     },
// });
// export const { addOrder } = orderSlide.actions;

// export default orderSlide.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    orderItemsSlected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSucessOrder: false,
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInstock) {
                    itemOrder.amount += orderItem?.amount;
                    state.isSucessOrder = true;
                    state.isErrorOrder = false;
                }
            } else {
                state.orderItems.push(orderItem);
            }
        },
        resetOrder: (state) => {
            state.isSucessOrder = false;
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct);
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct);
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;

            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => item?.product !== idProduct);

            state.orderItems = itemOrder;
            state.orderItemsSlected = itemOrderSeleted;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;

            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            state.orderItems = [];
            state.orderItemsSlected = [];
        },
        removeAllOrder: (state, action) => {
            state.orderItems = [];
            state.orderItemsSlected = [];
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            const orderSelected = [];
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order);
                }
            });
            state.orderItemsSlected = orderSelected;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    removeAllOrder,
    selectedOrder,
    resetOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
