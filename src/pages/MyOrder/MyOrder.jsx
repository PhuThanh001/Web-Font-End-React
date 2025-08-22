import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/loading'
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query'



const OrderPage = () => {
    const user = useSelector((state) => state.user)
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(user?.id ,user?.AccessToken)
        return res.data
    } 
    const queryOrder = useQuery({
        queryKey: ['user'],
        queryFn: fetchMyOrder,
        enabled: !!(user?.id && user?.AccessToken)
    })
    const {isLoading , data } = queryOrder

    return (
        <Loading isPending={isLoading}>
        <div style={{background:'f5f5fa' ,width : '100%' ,height: '100vh'}} >  
        MYYYOOO
         </div>    
         </Loading>
        
    )
}
export default OrderPage;