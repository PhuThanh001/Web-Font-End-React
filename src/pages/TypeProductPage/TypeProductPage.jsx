import { Col, Pagination, Row } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { WrapperNavbar, WrapperProducts } from '../../components/TypeProduct/Style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../service/ProductService';
import { useDeBounce } from '../../hooks/useDebounce '

const TypeProductPage = () => {        
        const {state} = useLocation()
        const searchProduct = useSelector((state) => state?.product?.search)
        const searchDebounce = useDeBounce(searchProduct, 1000)
        const [products , setProducts] = useState([])
        const [loading , setLoading] = useState(false)
        const [panigate , setPanigate] = useState({
                page:0,
                limit: 10,
                total: 1,
        })
        const fetchProductType = async (type , page, limit) => {
                try {
                        const res = await ProductService.GetProductType(type, page, limit)
                        if(res?.status == 'OK'){
                                setLoading(false)
                                setProducts(res?.data?.data)
                                setPanigate({...panigate, total:res?.total})
                        }
                } catch (err) {
                        console.error('❌ Lỗi gọi API:', err)
                }
        }
        useEffect(() => {
                if(state){                
                        fetchProductType(state , panigate.page , panigate.limit); // Gọi luôn để test, bỏ if(state) tạm thời
                        }
        }, [state, panigate.page , panigate.limit]);
        useEffect(() => {
                let newProduct = []
                if(searchDebounce){                
                        newProduct = products?.filter((pro) => pro?.name === searchDebounce)
                        setProducts(newProduct)
                }
        }, [searchDebounce]);

        console.log('searchProduct' , searchProduct)

        const onchange = (current , pageSize) => 
                {
                        setPanigate({...panigate ,page: current - 1 ,limit:pageSize})
                }
        return (
                <div style = {{padding : '0 120px', background : '#efefef' , height:'calc(100vh - 64px)'}}>        
            <Row style={{ padding: '0 120px',background : '#efefef' , flexWrap : 'nowrap',paddingTop : '10px' ,height: '100%' }}>
                <WrapperNavbar span={4} style={{background : '#fff' ,marginRight : '3px' , padding : '4px' , borderRadius : '10px' }}>
                        <NavbarComponent/>
                </WrapperNavbar>
                <Col span={20} style={{display : 'flex' , flexDirection: 'column' , justifyContent: 'space-between'}}>                
                <WrapperProducts>
                {products?.filter((pro) => {
                        if(searchDebounce === ''){
                                return pro
                        }else if(pro?.name.toLowerCase()?.include(searchDebounce?.toLowerCase()))
                        {
                                return pro
                        }
                })?.map((product) => {
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
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} defaultCurrent={panigate?.page + 1} total={panigate?.total} onChange={onchange} /></Col>
        </Row>      
</div> 
  )
}
export default TypeProductPage