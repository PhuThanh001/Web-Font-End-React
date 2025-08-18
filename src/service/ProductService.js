import axios from "axios";

export const axiosJWT = axios.create({
});
// export const GetAllProduct = async (search ) => {
//     let res = {}
//     console.log('search' , search.length)
//     if(search.length > 0){
//          res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll?filter=name&filter=${search}`)
//     }else {    
//          res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`);
//     }
//     console.log('Allproduct' , res.data)
//     return res.data;
// }
export const GetAllProduct = async (search , limit) => {
    let res = {};
    if (search?.length > 0) {
        const cleanedSearch = search?.replace(/"/g, '');
        res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll?filter=name&value=${cleanedSearch}&limit=${limit}`);

    } else {
        res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll?limit=${limit}`);
    }
    return res.data;
};
// export const GetProductType = async (type) => {
//     if (type) {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAllType?filter=type&filter=${type}`);
//         return res.data
//     } 
// };
// export const GetProductType = async (type, page ,limit) => {
//     const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`);
//     return res.data;
// };
export const GetProductType = async (type, page, limit) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/getAll?filter=type&value=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
};
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
export const DeleteProduct  = async (id ,access_token) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    console.log('res.data' ,res.data)
    return res.data;
}
export const Delete_many_product  = async (access_token ,data) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL}/product/delete-many`, data , {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const get_all_type_product  = async () => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/product/getAllType`)
    return res.data;
}
