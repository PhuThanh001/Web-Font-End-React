import axios from 'axios';

export const axiosJWT = axios.create({
});
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
export const getAllUser = async (access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const DeleteUser = async (id , access_token ) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete-user/${id}` , {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const getUserDetails = async (id, access_token) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    console.log('getUserDetails function called with token:', access_token);
    return res.data;
}
export const refreshToken = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/refresh-token` ,{
        withCredentials: true
    })
        return res.data;
    }
export const logoutUser = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/log-out`);
    return res.data;
}
export const updateUser = async (id , data, access_token) => {  
    const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL}/user/update-user/${id}`,data ,{
        headers: {
            token: `Bearer ${access_token}`
        }}
    )
    return res.data
}
