import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'; // Đường dẫn tương đối
import userReducer from './slides/userSilde'; // Đường dẫn tương đối

export const store = configureStore({
  reducer: {
    counter : counterReducer,
    user: userReducer,
  },

})
