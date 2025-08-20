import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'; // Đường dẫn tương đối
import userReducer from './slides/userSilde'; // Đường dẫn tương đối
import orderReducer from './slides/orderSlide';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['product', 'user'], // Danh sách các reducer không cần persist
}
const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    order: orderReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)  
