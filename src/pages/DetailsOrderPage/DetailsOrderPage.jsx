import React, { useEffect, useMemo } from 'react'
import { WrapperLable } from '../ProfilePage/style'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { WrapperAllPrice, WrapperItemLabel ,WrapperHeaderUser , WrapperInfoUser 
    , WrapperContentInfo ,WrapperStyleContent, WrapperItem , WrapperNameProduct ,WrapperProducts,GridHeader,TotalsRow,ProductRow  } from './style';
import Loading from '../../components/LoadingComponent/loading';


const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const {id} = params
    const {state} = location
    
    const fetchDetailsOrder = async () => {
        const res = await OrderService.getOrderDetails(id,state?.AccessToken)
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
        <WrapperHeaderUser className='wrapperHeader'>
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
                    <div className='delivery-info'> <span style={{color: 'yellow', fontfamily: 'sans-serif'}}> FAST </span> giao hàng tiết kiệm </div>
                    <div className='delivery-fee'> <span> phí giao hàng : </span> {convertPrice(data?.shippingPrice)} </div>
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
  <GridHeader>
    <div> Sản phẩm </div>
    <div style={{textAlign:'center'}}> Giá </div>
    <div style={{textAlign:'center'}}> Số Lượng</div>
    <div style={{textAlign:'center'}}> Giảm giá  </div>
  </GridHeader>

  {orderItems.map((order) => (
    <ProductRow key={order.product}>
      <WrapperNameProduct>
        <img src={order?.image} style={{ width:70, height:70, objectFit:'cover', border:'1px solid #eee' }}/>
        <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {order?.name}
        </div>
      </WrapperNameProduct>

      <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
      <WrapperItem>{order?.amount}</WrapperItem>
      <WrapperItem>{order?.discount ? `${order?.discount}%` : '0%'}</WrapperItem>
    </ProductRow>
  ))}

  <TotalsRow>
    <div></div>
    <div></div>
    <div></div>
    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
      <div style={{marginRight: '100px'}}><strong>Tạm tính:</strong> {convertPrice(priceMemo)}</div>
      <div><strong>Phí vận chuyển:</strong> {convertPrice(data?.shippingPrice)}</div>
      <div style={{ fontSize:18, color:'red' }}><strong>Tổng cộng:</strong> {convertPrice(data?.totalPrice)}</div>
    </div>
  </TotalsRow>
</WrapperStyleContent>
    </div>
    </div>
    </Loading>
  )
}

export default DetailsOrderPage