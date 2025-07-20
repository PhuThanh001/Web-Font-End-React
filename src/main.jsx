import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
//import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals.js' ;
import {Provider} from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryclient = new QueryClient()

root.render(
  <QueryClientProvider client={queryclient}>
    <Provider store={store}>
        <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
)
reportWebVitals();