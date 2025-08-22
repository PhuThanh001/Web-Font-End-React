import { Checkbox, Result ,Form, message ,Button ,Radio} from 'antd'
import React, { use, useMemo } from 'react'
import { useDispatch, useSelector , } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { WrapperLeft ,WrapperStyleHeader , WrapperInfo,WrapperContainer,  WrapperValue, WrapperCountOrder ,WrapperItemOrderInfo, WrapperItemOrder, WrapperInputNumber } from './style'
import {DeleteOutlined  ,MinusOutlined ,PlusOutlined} from '@ant-design/icons';
import { convertPrice } from '../../utils'
import { orderContant } from '../../contant'
import { useLocation } from 'react-router-dom'





const OrderSuccessPage = () => {
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const {state} = location;
    console.log('location' , location)

    return (
        <div style={{background: '#fff',width: '100%', height: '100vh'}}> 
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
            <h3>Đơn Đặt Hàng Thành Công</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <WrapperContainer>
                    <WrapperInfo>
                        <div>
                        <label>Chọn Phương Thức Giao Hàng:</label>
                                <WrapperValue>
                                    <span style={{color: '#ea8500' ,fontWeight: 'bold' }} >{orderContant.delivery[state?.delivery]}</span>
                                      Giao Hàng Tiết Kiệm
                                </WrapperValue>
                        </div>
                    </WrapperInfo>
                    <WrapperInfo>
                        <div>
                            <label>Chọn Phương Thức Thanh Toán</label>
                            <WrapperValue>
                              {orderContant.payment[state?.payment]}
                            </WrapperValue>
                        </div>
                    </WrapperInfo>
                    <WrapperItemOrderInfo>
                    {state?.orders?.map((order) => {
                        return (
                            <WrapperItemOrder key={order.product}>
                                <div style={{width: '500px', display: 'flex', alignItems: 'center'}}>
                                    <img src={order.image} style={{width: '50px', height: '50px', objectFit: 'cover', marginLeft: '6px'}}/>
                                    <div
                                    style={{
                                                      marginLeft: '10px',
                                                      fontSize: '14px',
                                                      color: '#242424',
                                                      fontWeight: 500,
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap',
                                                      flex: 1,
                                                  }}
                                                  >
                                                  {order?.name}
                                                  </div>
                                              </div>
                                              {/* đơn giá */}
                                              {console.log('order.price' , order.price)}
                                              <div style={{width: '120px', textAlign: 'center',marginLeft: '100px'}}>
                                                  Giá Tiền: {convertPrice(order?.price)}
                                              </div>
                                              {/* số lượng */}
                                              <div style={{width: '120px', display: 'flex', justifyContent:'center' ,marginLeft: '100px'}}>
                                                  <WrapperCountOrder>  Số Lượng:
                                                        <WrapperInputNumber value={order.amount} size="small" readOnly />
                                                  </WrapperCountOrder>
                                              </div>
                      </WrapperItemOrder>)    
                    })}
                    </WrapperItemOrderInfo>
                                            <div style={{width: '120px', textAlign: 'center',marginLeft: '100px'}}>
                                              <span style={{fontSize:'16px' ,color: 'red'}}> Tổng Tiền: {convertPrice(state?.totalPriceMemo)}</span>   
                                              </div>
                </WrapperContainer>
                {console.log('order' , state?.orders)}
            </div>
        </div>

        </div>
    )
}
export default OrderSuccessPage;