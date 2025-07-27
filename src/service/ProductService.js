import axios from "axios";

export const GetAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`);
    return res.data;
}