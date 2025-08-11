import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'; // Đường dẫn tương đối
import userReducer from './slides/userSilde'; // Đường dẫn tương đối

export const store = configureStore({
  reducer: {
    product : productReducer,
    user: userReducer,
  },

})
