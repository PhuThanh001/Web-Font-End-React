import axios from "axios";

export const axiosJWT = axios.create({
});
export const GetAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`);
    return res.data;
}
export const CreateProduct  = async (data) => {
    const res = await axios.post('/api/product/create', data);
    return res.data;
}
export const GetDetailsProduct  = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getProductDetails/${id}`);
    return res.data;
}
export const UpdateProduct  = async (id ,access_token,data) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    console.log('res.data' ,res.data)
    return res.data;
}
