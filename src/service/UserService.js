import axios from 'axios';

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`, data);
    console.log('loginUser function called with data:', data);
    return res.data;
}
export const registerUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-up`, data);
    console.log('registerUser function called with data:', data);
    return res.data;
}
export const getUserDetails = async (id, token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${token}`
        }
    });
    console.log('getUserDetails function called with token:', token);
    return res.data;
}
