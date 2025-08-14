import { Col, Pagination, Row } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { WrapperNavbar, WrapperProducts } from '../../components/TypeProduct/Style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../service/ProductService';

const TypeProductPage = () => {        
        const {state} = useLocation()
        console.log('location' , Location)
        const [products , setProducts] = useState([])
        const fetchProductType = async (type) => {
                try {
                        const res = await ProductService.GetProductType(type)
                        if(res?.status == 'OK'){
                                setProducts(res?.data?.data)
                                console.log('type ne' , res)
                        }
                } catch (err) {
                        console.error('❌ Lỗi gọi API:', err)
                }
        }
        useEffect(() => {
                console.log("📌 [DEBUG] useEffect chạy với state:", state);
                fetchProductType(state); // Gọi luôn để test, bỏ if(state) tạm thời
        }, [state]);
        const onchange = () => {}
        return (
        <div style = {{padding : '0 120px', background : '#efefef'}}>        
            <Row style={{ padding: '0 120px',background : '#efefef' , flexWrap : 'nowrap',paddingTop : '10px' }}>
                <WrapperNavbar span={4} style={{background : '#fff' ,marginRight : '3px' , padding : '4px' , borderRadius : '10px' }}>
                        <NavbarComponent/>
                </WrapperNavbar>
                <Col span={20}>                
                <WrapperProducts>
                {products?.map((product) => {
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
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProducts>
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} defaultCurrent={2} total={100} onChange={onchange} /></Col>
        </Row>      
</div> 
  )
}
export default TypeProductPage