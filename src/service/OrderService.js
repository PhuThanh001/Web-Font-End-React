import axios from 'axios';

export const axiosJWT = axios.create({
});
export const getOrderbyUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/order/get-all-order/${id}`,  {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const CreateOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const getOrderDetails = async (id, access_token) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/order/get-details-order/${id}`,  {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    console.log( 'data tra ve:', res.data);
    return res.data;
}
export const CancelOrder = async (id, access_token , orderItems) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL}/order/cancel-order/${id}`, {data : orderItems} , {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const getAllOrder = async ( access_token ) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/order/get-all-order/`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}


