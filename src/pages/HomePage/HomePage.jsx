import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { WrapperButtonMore } from './style';
import { WrapperProducts } from '../../components/TypeProduct/Style';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import { useSelector } from 'react-redux';
import { useDeBounce } from '../../hooks/useDebounce ';

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDeBounce(searchProduct, 1000)
    // const searchDebounce = useDeBounce(searchProduct , 1000)
    const arr = ['TV ', 'Tu lanh ', 'Lap top']
    const [stateProducts, setStateProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(6)
    // const fetchProductAll = async (context) => {
    //     const limit = context?.queryKey[1] && context?.queryKey
    //     const search = context?.queryKey[2] && context?.queryKey
    //     const res = await ProductService.GetAllProduct(search, limit)
    //     console.log('first', res)
    //     return res
    // }
    const fetchProductAll = async ({ queryKey }) => {
    const [_key, limit, search] = queryKey;
    console.log('limit', limit)
    const res = await ProductService.GetAllProduct(search, limit);
    return res;
    };
    useEffect(() => {
        console.log('🔁 Limit changed to:', limit)
    } ,[limit])
    const { isLoading, data: products, isPreviousdata } = useQuery({
        queryKey: ['products', limit ,searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true
    }); 
    // useEffect(() => {
    //     if(products?.length > 0){
    //         setStateProducts(products)
    //     }
    // },[products])
    // console.log('setStateProducts' , stateProducts)
    return (
        <>
            <div style={{ padding: '0 120px', margin: '0 auto', width: '1270px' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}

                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ backgroundColorColor: '#efefef', width: '100%' }}>
                <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1000px' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <WrapperProducts style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }} >
                        {products?.data?.data?.map((product) => {
                            return (
                                <CardComponent 
                                    key={product._id}
                                    CountInStock={product.CountInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                     />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore
                            textButton="Xem Thêm"
                            type="outline"
                            styleButton={{
                                border: '1px solid rgb(11 , 116, 229)',
                                color: products?.data?.length >= products?.total ? '#ccc' : 'rgb(11 ,116,229)',
                                width: '240px',
                                height: '38px',
                                borderRadius: '4px'
                            }}
                            disabled={products?.data?.length >= products?.total || products?.totalPage === 1}
                            styleTextButton={{ fontWeight: 500 }}
                            onClick={() => setLimit((prev) => prev + 6)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;