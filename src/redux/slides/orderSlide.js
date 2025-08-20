import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        orderItems: [],
        OrderItemsSelected: [],
        ShippingAddress: {
        },
        paymentMethod: '',
        itemsPrice : '',
        ShippingPrice : '',
        taxPrice : '',
        totalPrice : '',
        user : '',
        isPaid : false,
        paidAt : '',
        isDeliveredAt : false,  
        deliveredAt : '',
};
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
        console.log({state , action})
        const {orderItem} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
        if(itemOrder){
            itemOrder.amount += orderItem?.amount
        }else {
            state.orderItems.push(orderItem)
        }
    },
    increaseAmount:(state , action) => {
      const {idProduct} = action.payload
      const itemProduct = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.OrderItemsSelected?.find((item) => item?.product === idProduct)
      itemProduct.amount++
      if(itemProduct && itemOrderSelected) {
        itemOrderSelected.amount++
      }
    },  
    decreaseAmount:(state , action) => {
      const {idProduct} = action.payload
      const itemProduct = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.OrderItemsSelected?.find((item) => item?.product === idProduct)
      itemProduct.amount--
      if(itemProduct && itemOrderSelected) {
        itemOrderSelected.amount--
      }
    },
    removeOrderProduct: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
        const itemOrderSelected = state?.OrderItemsSelected?.filter((item) => item?.product !== idProduct)
        state.OrderItemsSelected = itemOrderSelected
        state.orderItems = itemOrder
    },
    removeAllOrderProduct: (state, action) => {
        const {listCheck} = action.payload
        const itemOrder = state?.orderItems?.filter((item) => !listCheck.includes(item?.product))
        const itemOrderSelected = state?.OrderItemsSelected?.filter((item) => !listCheck.includes(item?.product))
        state.OrderItemsSelected = itemOrderSelected
        state.orderItems = itemOrder
    },
    selectOrderItems: (state, action) => {
            const {listCheck} = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
            if (listCheck.includes(order.product)) {
                orderSelected.push({...order});
            }
        });
            state.OrderItemsSelected = orderSelected;
        },
  },
});
// Export action
export const { addOrderProduct ,increaseAmount ,decreaseAmount ,removeOrderProduct , removeAllOrderProduct , selectOrderItems } = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;