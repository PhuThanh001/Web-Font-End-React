import React, { useEffect, useMemo } from 'react'
import { WrapperLable } from '../ProfilePage/style'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant';
import { WrapperProducts } from '../HomePage/style';
import { convertPrice } from '../../utils';
import { WrapperAllPrice, WrapperItemLabel } from './style';
import Loading from '../../components/LoadingComponent/loading';


const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const {id} = params
    const {state} = location()

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getOrderDetails(id,state?.AccessToken)
        return res.data
    }
    const queryOrder = useQuery({
        queryKey: ['orders-details'],
        queryFn: fetchDetailsOrder,
        enabled: !!(id)
    })
    const priceMemo = useMemo(() => {
        const result = data?.OrderItems?.reduce((total , cur) => {
            return total + ((cur.Price * cur.amount))
        } , 0)
            return result
        } ,[data]
    )
    const {isLoading , data  } = queryOrder
    const {shippingAddress ='' , OrderItems= [], shippingPrice='' ,paymentMethod='' ,isPaid=false , TotalPrice='' } = data

  return (
    <Loading isPending={isLoading}>
    <div style={{width :'100%' , height: '100vh' , background:'#f5f5fa'}}>
    <div style={{width :'100%' , height: '1270vh' , margin: '0 auto' }}>
        <h4> Chi tiết đơn hàng </h4>
        <WrapperHeaderUser>
            <WrapperInfoUser>
                <WrapperLable>Địa chỉ người nhận</WrapperLable>
                <WrapperContentInfo>
                    <div className='name-info'>{data?.shippingAddress?.fullname} </div>
                    <div className='address-info'> <span>Địa Chỉ: </span> {`${data?.shippingAddress?.fullname}  ${shippingAddress?.fullname}`} </div>
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
                <div>
                    <div style={{width:'610px'}}> Sản phẩm </div>
                            <WrapperItemLable> Gía </WrapperItemLable>
                            <WrapperItemLable> Số Lượng</WrapperItemLable>
                            <WrapperItemLable> giảm giá  </WrapperItemLable>
                            <WrapperItemLable> Tạm tính</WrapperItemLable>
                            <WrapperItemLable> Phí vận chuyển </WrapperItemLable>
                            <WrapperItemLable> Tổng cộng </WrapperItemLable>
                    </div>
                    {OrderItems.map((order) => {
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
                        <WrapperItem>{convertPrice(order?.Price)} </WrapperItem>
                        <WrapperItem>{order?.amount} </WrapperItem>
                        <WrapperItem>{convertPrice(order?.Price) || 0} </WrapperItem>
                        {/* <WrapperItem>{order.shippingPrice} </WrapperItem>
                        <WrapperItem>{convertPrice(order.shippingPrice)} </WrapperItem>
                        <WrapperItem>{convertPrice(order.TotalPrice)} </WrapperItem> */}
                    </WrapperProducts>
                        )
                    })}
                    <WrapperAllPrice style={{textAlign : 'right' , width:'100%'}}>
                        <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                        <WrapperItem>{convertPrice(priceMemo)} </WrapperItem>
                    </WrapperAllPrice>
                    <WrapperAllPrice style={{textAlign : 'right' , width:'100%'}}>
                        <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                        <WrapperItem>{convertPrice(data?.shippingPrice)} </WrapperItem>
                    </WrapperAllPrice>
                    <WrapperAllPrice style={{textAlign : 'right' , width:'100%'}}>
                        <WrapperItemLabel>Tổng Cộng</WrapperItemLabel>
                        <WrapperItem>{convertPrice(data?.TotalPrice)}</WrapperItem>
                    </WrapperAllPrice>
            </WrapperStyleContent>
    </div>
    </div>
    </Loading>
  )
}

export default DetailsOrderPage