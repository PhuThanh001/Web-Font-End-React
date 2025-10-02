import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';import "antd/dist/reset.css"; // với AntD v5

import { PersistGate } from 'redux-persist/lib/integration/react.js';

import reportWebVitals from './reportWebVitals.js' ;
import {Provider} from 'react-redux';
import { persistor , store  } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryclient = new QueryClient()
root.render(
  <ConfigProvider>
  <QueryClientProvider client={queryclient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
  </ConfigProvider>
  
)
reportWebVitals();