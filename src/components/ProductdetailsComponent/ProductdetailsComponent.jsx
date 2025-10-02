import React, { useEffect, useState , useMemo } from 'react'
import { Row ,Col ,Image, Input, InputNumber, Button, Flex, Rate, message } from 'antd'
import ImageProduct from '../../assets/image/ImageProduct.png'
import SmallImage from '../../assets/image/smallImage.webp'
import { WrapperInputNumber, WrapperPriceProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleTextSell } from './Style'
import { WrapperStyleNameProduct } from './Style'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons'
import { WrapperPriceText } from '../CardComponent/style'
import { WrapperAddressProduct } from './Style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import * as ProductService  from '../../service/ProductService';
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/loading';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct ,resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'
import { meta } from '@eslint/js'




const ProductdetailsComponent = ({idProduct}) => {
        
        const [numProduct ,setNumProduct] = useState(1)
        const user = useSelector((state) => state.user)
        const order = useSelector((state) => state.order)
        const [errorLimitOrder ,setErrorLimitOrder] = useState(false)
        const navigate = useNavigate()
        const location = useLocation()
        const dispatch = useDispatch()

        const onChange = (value) =>
        {
                setNumProduct(Number(value))
        }
        const handleChangeCount = (type) => {
                if(type === 'increase') {
                        setNumProduct(numProduct + 1)
                }else {
                        setNumProduct(numProduct - 1)
                }
        }

        const fetchGetDetailsProduct = async (context) =>{
            const id = context?.queryKey && context?.queryKey[1]
            const res = await ProductService.GetDetailsProduct(id)
            return res?.data
        }                 
        const { isLoading, data: productDetails, isPreviousdata } = useQuery({
                queryKey: ['products-details',idProduct],
                queryFn: fetchGetDetailsProduct,
                enabled: !!idProduct
        });
        console.log('ProductDetail' , productDetails)
        // useEffect(() => {
        //         const orderRedux = order?.orderItems?.find(item => item.product === productDetails?._id)
        //         if((orderRedux?.amount +  numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails.countInStock > 0)){
        //                 setErrorLimitOrder(false)
        //         }else{
        //                 setErrorLimitOrder(true)
        //         }
        // }, [numProduct])
        useEffect(() => {
                
        } ,[])
        useEffect(() => {
                if (!productDetails) return; // chặn khi chưa có dữ liệu
                const orderRedux = order?.orderItems?.find(item => item.product === productDetails?._id)

                if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock ||
                        (!orderRedux && productDetails?.countInStock > 0)) {
                        setErrorLimitOrder(false)
                } else {
                        setErrorLimitOrder(true)
                }
        }, [numProduct, productDetails, order])

        useEffect(() => {
                if(order.isSuccessOrder) {
                        message.success('đã thêm vào giỏ hàng')
                }
                return () => {
                        dispatch(resetOrder())
                }
        }, [order?.isSuccessOrder])

        const handleAddOrderProduct = async () => {
                if(!user?.id){
                        navigate('/SignIn' ,  {state : location?.pathname}) 
                }else{
                        const orderRedux = order?.orderItems?.find(item => item.product === productDetails?._id)
                        if((orderRedux?.amount +  numProduct) <= orderRedux?.countInStock || !orderRedux && productDetails.countInStock > 0){
                        dispatch(addOrderProduct({
                                orderItem: {
                                        name: productDetails.name,
                                        amount: numProduct,
                                        image: productDetails.image,
                                        price: productDetails.price,
                                        product: productDetails?._id,
                                        discount: productDetails?.discount || 0,
                                        countInStock: productDetails?.countInStock || 0,
                                }
                        }))
                } else {
                        setErrorLimitOrder(true)
                }
        }
}
        return (
                <Loading isPending={isLoading}>
                <Row className='rowww' style={{backgroundColor : '#fff' , padding : '16px' ,borderRadius : '4px'}} >
        <Col span={10} style={{ borderRight : '1px solid #e5e5e5' ,paddingLeft : '8px' }}>
                <Image  src={productDetails?.image} alt="Image Product"  preview = {false}/>
                <Row>
                                  <WrapperStyleColImage span={4}>
                                  <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} /></WrapperStyleColImage>
                                  <WrapperStyleColImage span={4}>
                                  <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} /></WrapperStyleColImage>
                                  <WrapperStyleColImage span={4}>
                                  <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} /></WrapperStyleColImage>
                                  <WrapperStyleColImage span={4} >
                                  <WrapperStyleImageSmall src={productDetails?.image} alt="image Small" preview={false} /></WrapperStyleColImage>
                </Row>
        </Col>
        <Col span={14} style={{paddingLeft : '10px'}} >
                <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                <div>   
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
                        <WrapperStyleTextSell>  |da ban 1000+ </WrapperStyleTextSell>
                </div>  
                        <WrapperPriceProduct>
                                <WrapperPriceText>{convertPrice(productDetails?.price)}</WrapperPriceText>
                        </WrapperPriceProduct>
                        <WrapperAddressProduct>
                                <span>Giao đến</span>
                                <span className='address'> {user?.address}</span>
                                <span className='Change-address'> Đổi địa chỉ</span>
                        </WrapperAddressProduct>
                         <LikeButtonComponent dataHref={import.meta.env.VITE_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/" : window.location.href} /> 
                        <div>
                                
                                <div style={{ margin : '10px 0 20px',padding : '10px 0' ,borderTop : '1px solid #ccc' , borderBottom : '1px solid #ccc'}}> 
                                <div style={{marginBottom : '6px' }}>số lượng </div>                               
                                <WrapperQualityProduct>
                                        <Button onClick={() => handleChangeCount('increase')} >
                                        <PlusOutlined style={{ color : '#000' ,fontsize : '20px'}} /> 
                                        </Button>
                                        <Button>
                                        <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size='small'/>
                                        </Button>
                                        <Button onClick={() => handleChangeCount('decrease')} >
                                        <MinusOutlined style={{ color :'#000' ,fontsize :'20px'}}/>
                                        </Button>
                                </WrapperQualityProduct></div>

                        </div>
                                <div style={{display : 'flex' ,gap :'12px' , alignItems : 'center' }}>
                                <ButtonComponent
                                        border = {false}
                                        size = {40} 
                                        styleButton ={{
                                                backgroundColor : 'rgb(224, 1, 16)' ,
                                                height : '48px' ,
                                                width : '228PX' ,
                                                border : 'none' ,
                                                borderRadius : '4px'
                                         }}
                                         textButton ={ 'Chọn mua'}
                                         styleTextButton = {{ color : '#efefef' , fontSize : '15px', fontWeight : '700'}}
                                         onClick={handleAddOrderProduct}  >
                                </ButtonComponent>
                                <ButtonComponent
                                        size = {40} 
                                        styleButton ={{
                                                backgroundColor : 'rgb(54, 51, 214)' ,
                                                height : '48px' ,
                                                width : '228PX' ,
                                                border : 'none' ,
                                                borderRadius : '4px',
                                                marginLeft : '12px'
                                         }}
                                         textButton ={ 'Mua trả sau lãi suất 5%'}
                                         styleTextButton = {{ color : '#efefef'  ,fontSize : '15px', fontWeight : '700'}}>
                                </ButtonComponent>
                                </div>
        </Col>

  <Col span={24} style={{ marginTop: '20px' }}>
    <CommentComponent
      dataHref={import.meta.env.VITE_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/comments#configurator" : window.location.href}
      dataWidth="100%"   
    />
  </Col>
        </Row>  
        </Loading>
        )       
}
export default ProductdetailsComponent