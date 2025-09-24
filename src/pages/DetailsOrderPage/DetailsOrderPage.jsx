import React, { useEffect, useMemo } from 'react'
import { WrapperLable } from '../ProfilePage/style'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { WrapperAllPrice, WrapperItemLabel ,WrapperHeaderUser , WrapperInfoUser 
    , WrapperContentInfo ,WrapperStyleContent, WrapperItem , WrapperNameProduct ,WrapperProducts  } from './style';
import Loading from '../../components/LoadingComponent/loading';


const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const {id} = params
    const {state} = location
    
    const fetchDetailsOrder = async () => {
        const res = await OrderService.getOrderDetails(id,state?.AccessToken)
        console.log('data tra ve:', res.data)
        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['orders-details' , id],
        queryFn: fetchDetailsOrder,
        enabled: !!(id)
    })
    console.log('queryOrder', queryOrder)
    const {isLoading , data  } = queryOrder
            const { 
        shippingAddress = {},   // object
        orderItems = [],        // đúng chữ thường
        shippingPrice = 0,
        paymentMethod = '',
        isPaid = false,
        totalPrice = 0
        } = data || {}


    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total , cur) => {
            return total + ((cur.price * cur.amount))
        } , 0)
            return result
        } ,[data]
    )

  return (
    <Loading isPending={isLoading}>
    <div style={{width :'100%' , height: '100vh' , background:'#f5f5fa'}}>
    <div style={{width :'100%'  , margin: '0 auto' }}>
        <h4> Chi tiết đơn hàng </h4>
        <WrapperHeaderUser>
            <WrapperInfoUser>
                <WrapperLable>Địa chỉ người nhận</WrapperLable>
                <WrapperContentInfo>
                    <div className='name-info'>{data?.shippingAddress?.fullname} </div>
                    <div className='address-info'> <span>Địa Chỉ: </span> {`${data?.shippingAddress?.address}`} </div>
                    <div className='phone-info'> <span> Điện Thoại: </span> {data?.shippingAddress?.phone} </div>
                </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
                <WrapperLable>Hình Thức Giao Hàng </WrapperLable>
                <WrapperContentInfo>
                    <div className='delivery-info'> <span>FAST </span> giao hàng tiết kiệm </div>
                    <div className='delivery-fee'> <span> phí giao hàng </span> {data?.shippingPrice} </div>
                </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
                <WrapperLable>Hình Thức Thanh Toán</WrapperLable>
                <WrapperContentInfo>
                    <div className='payment-info'>{orderContant[data?.paymentMethod]}</div>
                    <div className='status-payment'> {data?.isPaid ?  'chưa thanh toán' : 'Đã thanh toán'} </div>
                </WrapperContentInfo>
            </WrapperInfoUser>
            </WrapperHeaderUser>
            <WrapperStyleContent>
                <div style={{display: 'grid',
  gridTemplateColumns: '610px 200px 200px 200px',
  alignItems: 'center',
  fontWeight: 'bold',
  borderBottom: '1px solid #eee',
  marginBottom: '10px'}}  >
                    <div style={{width:'610px'}}  > Sản phẩm </div>
                            <WrapperItemLabel> Giá </WrapperItemLabel>
                            <WrapperItemLabel> Số Lượng</WrapperItemLabel>
                            <WrapperItemLabel> giảm giá  </WrapperItemLabel>
                            {/* <WrapperItemLabel> Tạm tính</WrapperItemLabel>
                            <WrapperItemLabel> Phí vận chuyển </WrapperItemLabel>
                            <WrapperItemLabel> Tổng cộng </WrapperItemLabel> */}
                    </div>
                    {orderItems.map((order) => {
                        return ( <WrapperProducts>
                        <WrapperNameProduct>
                            <img src={order?.image} 
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    objectFit:'cover',
                                    border:'1px solid rgb(238 ,238,238)',
                                }}
                            />
                            <div style={{
                                    width: 260,
                                    overflow: 'hidden',
                                    textOverflow:'ellipsis',
                                    height: '70px',
                                    marginLeft:'7px',
                                    whiteSpace:'nowrap'

                                }}>
                            Điện Thoại
                            </div>
                        </WrapperNameProduct>
                        <WrapperItem>{convertPrice(order?.price)} </WrapperItem>
                        <WrapperItem>{order?.amount} </WrapperItem>
                        <WrapperItem>{order?.discount ? convertPrice(order?.discount) : '0 VND'} </WrapperItem>
                        {/* <WrapperItem>100.000 </WrapperItem>
                        <WrapperItem>{convertPrice(data?.shippingPrice)} </WrapperItem>
                        <WrapperItem>{convertPrice(data?.TotalPrice)} </WrapperItem> */}
                    </WrapperProducts>
                        )
                    })}
                    <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "610px 200px 200px 200px", // giống header
                        marginTop: "10px",
                        borderTop: "1px solid #eee",
                        paddingTop: "10px",
                    }}
                    >
                    {/* để trống 3 cột đầu */}
                    <div style={{ gridColumn: "4 / 5" }}>
                        <WrapperAllPrice>
                        <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                        <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                        </WrapperAllPrice>
                        <WrapperAllPrice>
                        <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                        <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
                        </WrapperAllPrice>
                        <WrapperAllPrice>
                        <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                        <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
                        </WrapperAllPrice>
                    </div>
                    </div>
            </WrapperStyleContent>
    </div>
    </div>
    </Loading>
  )
}

export default DetailsOrderPage