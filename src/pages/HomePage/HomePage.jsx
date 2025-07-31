import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';
import  slider1   from '../../assets/image/slider1.webp';
import  slider2  from '../../assets/image/slider2.webp';
import  slider3  from '../../assets/image/slider3.webp';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { WrapperButtonMore } from './style';
import { WrapperProducts } from '../../components/TypeProduct/Style';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import { retry } from '@reduxjs/toolkit/query';

const HomePage = () => {
            const arr = ['TV ','Tu lanh ', 'Lap top']
            const fetchProductAll = async () => {
                const res = await ProductService.GetAllProduct() 
                console.log('res' ,res)
                return res
            }
            const { isLoading, data:products } = useQuery({
            queryKey: ['products'],
            queryFn: fetchProductAll,
            retry: 3,
            retryDelay: 1000
            });            
            console.log('data' , products)
    return (
        <> 
        <div style={{padding: '0 120px' ,margin : '0 auto' , width : '1270px' }}>     
            <WrapperTypeProduct>
            {arr.map((item)  => {
                return (
                    <TypeProduct name ={item} key={ item} />
                )
            } )}

            </WrapperTypeProduct>
            </div>
            <div className='body' style={{backgroundColorColor : '#efefef'  , width : '100%'}}>
            <div id ="container"  style ={{backgroundColor : '#efefef',padding : '0 120px',height : '1000px' }}>
            <SliderComponent arrImages={[slider1 , slider2, slider3]} />
            <WrapperProducts style={{marginTop: '20px' ,display :'flex' ,  alignItems : 'center' ,justifyContent : 'space-around', gap : '20px' ,flexWrap : 'wrap'}} >
                {products?.data?.data?.map((product) => {
                    return (
                    <CardComponent key={product._id} 
                    CountInStock={product.CountInStock} 
                    description={product.description} 
                    image={product.image}
                    name ={product.name}
                    price ={product.price}
                    rating ={product.rating}
                    type ={product.type}
                    selled= {product.selled}
                    discount ={product.discount} />
                    )
                })}
            </WrapperProducts>            
                 <div style={{ width: '100%' ,display: 'flex' , justifyContent: 'center' ,marginTop : '10px'}}>
                    <WrapperButtonMore textButton="Xem Thêm" type="outline" styleButton={{
                        border: '1px solid rgb(11 , 116, 229)', color: 'rgb(11 ,116,229)',
                        width: '240px', height: '38px', borderRadius: '4px'
                    }}
                        styleTextButton={{ fontWeight: 500 }}/>
                </div>
            </div>
            </div>
        </>
    )
}
export default HomePage;