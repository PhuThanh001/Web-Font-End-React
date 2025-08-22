import axios from 'axios';

export const axiosJWT = axios.create({
});
export const getOrderbyUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/order/get-order-details/${id}`,  {
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

