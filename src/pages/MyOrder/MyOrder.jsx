import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/loading'
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query'
import { WrapperItemOrder, WrapperListOrder , WrapperHeaderItem ,WrapperContainer} from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { WrapperHeader } from '../ProfilePage/style';
import SizeContext from 'antd/es/config-provider/SizeContext';
import { convertPrice } from '../../utils';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'



const OrderPage = () => {
    const location = useLocation() 
    const {state} = location
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id ,state?.AccessToken)
        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['user'],
        queryFn: fetchMyOrder,
        enabled: !!(state?.id && state?.AccessToken)
    })
    const {isLoading , data } = queryOrder
    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`)
    } 
    const renderProduct = (data) => {
        return data?.map((order) => {
            return <WrapperHeaderItem>
                            <img src={order?.image} 
                            style=
                            {{
                                width:'70px',
                                height: '70px',
                                objectFit: 'cover',
                                border: '1px sold rgb(238,238,238)',
                                pading: '2px'
                            }}>
                            </img>
                            <div style={{
                                width: '10px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace:'nowrap',
                                marginLeft:'10px'
                            }}>
                            {order?.name}
                            </div>
                            <span style={{ fontSize:'13px' , color:'#242424' , marginLeft:'auto'}}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
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
                            <div>
                                <span style={{color: 'rgb(256,66 ,78)'}}> Tổng Tiền</span>
                                <span style={{
                                    fontSize:'14px' , fontWeight:'14px' , color:'rgb(56 ,56, 61)'
                                }}
                                >{convertPrice(order?.totalPrice)}</span>
                            </div>
                            <div style={{display: 'flex' , gap:'10px'}}>
                                <ButtonComponent
                                    size={40} 
                                    StypeButton={{
                                        height:'36px',
                                    }}
                                    TextButton={'Hủy đơn hàng'}
                                    StypeTextButton={{
                                        color: 'rgb(11 , 116 ,229)',
                                        fontSize:'14px'
                                    }}
                                ></ButtonComponent>
                                <ButtonComponent
                                    onclick={() => handleDetailsOrder(order?.id)}
                                    size={40} 
                                    StypeButton={{
                                        height:'36px',
                                    }}
                                    TextButton={'Xem chi tiết'}
                                    StypeTextButton={{
                                        color: 'rgb(11 , 116 ,229)',
                                        fontSize:'14px'
                                    }}
                                ></ButtonComponent>
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
export default OrderPage;