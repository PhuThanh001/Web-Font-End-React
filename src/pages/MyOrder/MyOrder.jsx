import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/loading'
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query'
import { useMutationHook } from '../../hooks/useMutationHook'
import { WrapperItemOrder, WrapperListOrder , WrapperHeaderItem ,WrapperContainer,WrapperStatus,WrapperFooterItem  } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { WrapperHeader } from '../ProfilePage/style';
import SizeContext from 'antd/es/config-provider/SizeContext';
import { convertPrice } from '../../utils';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const MyOrder = () => {
    const location = useLocation() 
    const {state} = location
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderbyUserId(state?.id , state?.token)
        console.log("res" , res.data)
        return res.data
    }
    const queryOrder = useQuery({
        queryKey: ['order' , state?.id],
        queryFn: fetchMyOrder,
        enabled: !!(state?.id && state?.token)
    })
      const mutation = useMutationHook(async (data) => {
        const {
          id ,
          token,
        orderItems
        } = data
        const res = await OrderService.CancelOrder(
          id, token , orderItems)
        return res
      },
    )
    const {isLoading , data } = queryOrder
    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`)
    }
     const handleCancelOrder = (order) => {
        mutation.mutate({id : order._id , token : state?.token , orderItems : order?.orderItems},
            {onSuccess: (data) => {
                console.log('huy don hang thanh cong' , data)
                queryOrder.refetch()}
            }
        )
    }
    const renderProduct = (data) => {
        return data?.map((order) => {
            return ( 
            <WrapperHeaderItem>
                            <img src={order?.image} 
                            style=
                            {{
                                width:'70px',
                                height: '70px',
                                objectFit: 'cover',
                                border: '1px solid rgb(238,238,238)',
                                padding: '2px'
                            }}>
                            </img>
                            <div style={{
                                maxWidth: '120px',
                                overflow: 'hidden',
                                flexDirection: 'column',
                                textOverflow: 'ellipsis',
                                whiteSpace:'nowrap',
                                marginLeft:'10px'
                            }}>
                            {order?.name}
                            </div>
                            <span style={{ fontSize:'13px' , color:'#242424' , marginLeft:'auto' ,display :'block' , textAlign:'right' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
            )
        }
    )}
    return (
        <Loading isPending={isLoading}>
        <WrapperContainer>
        <div style={{background:'f5f5fa' ,width : '100%' ,height: '100vh'}} >  
         <h4>Đơn Hàng Của Tôi</h4>
         <WrapperListOrder>
            {data?.map((order) => 
            {
                return (
                    <WrapperItemOrder key={order?._id}>
                        <WrapperStatus>
                            <span style={{fontSize: '14px' , fontWeight:'bold'}} >Trạng Thái</span>
                            <div>
                                <span style={{color: 'rgb(255,66,78)' }}> Giao Hàng </span> {`${order.isDelivered ? 'Đã Giao Hàng' : 'Chưa Giao Hàng'}`}
                            </div>
                            <div>
                                <span style={{color: 'rgb(255,66,78)' }}> Thanh Toán</span> {`${order.isPaid ? 'Đã Giao Hàng' : 'Chưa Thanh Toán'}`}
                            </div>
                        </WrapperStatus>
                        {renderProduct(order?.orderItems)}
                        <WrapperFooterItem>
<div style={{ 
    display: 'flex',        // dùng flex để dễ căn chỉnh
    flexDirection: 'column', // sắp xếp theo cột (chồng lên nhau)
    alignItems: 'flex-end', // căn trái
    width: '100%'     // chỉ chiếm theo nội dung
}}>
    <div>                                
        <span style={{color: 'rgb(256,66 ,78)', display: 'block', textAlign:'left'}}> Tổng Tiền</span>
        <span style={{
            fontSize:'14px', fontWeight:'14px', color:'rgb(56 ,56, 61)', display:'block', textAlign:'left'
        }}
        >{convertPrice(order?.totalPrice)}</span>
    </div>

    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <ButtonComponent
            onClick={() => handleCancelOrder(order)}
            size={40} 
            StypeButton={{ height:'36px' }}
            textButton={'Hủy đơn hàng'}
            StypeTextButton={{
                color: 'rgb(11 , 116 ,229)',
                fontSize:'14px'
            }}
        />
        <ButtonComponent
            onClick={() => handleDetailsOrder(order?._id)}
            size={40} 
            StypeButton={{ height:'36px' }}
            textButton={'Xem chi tiết'}
            StypeTextButton={{
                color: 'rgb(11 , 116 ,229)',
                fontSize:'14px'
            }}
        />
    </div>
</div>
                        </WrapperFooterItem>
                    </WrapperItemOrder>
                )
            }
            )}
         </WrapperListOrder>
         </div>    
         </WrapperContainer>
         </Loading>
    )
}
export default MyOrder;