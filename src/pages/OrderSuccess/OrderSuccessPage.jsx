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
  const order = useSelector((state) => state.order.currentOrder);
  const location = useLocation();
  const { state } = location;
  const queryParams = new URLSearchParams(location.search);


  console.log('order' , order)
  const status = queryParams.get("status");
if (!order) {
    return <div>Không tìm thấy thông tin đơn hàng</div>;
  }

  return (
    <div>
      {status === "success" || !status ? (
        <>
          <div style={{ background: "#fff", width: "100%", height: "100vh" }}>
            <div
              style={{ height: "100%", width: "1270px", margin: "0 auto" }}
            >
              <h3>Đơn Đặt Hàng Thành Công</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <WrapperContainer>
                  <WrapperInfo>
                    <div>
                      <label>Hình Thức Giao Hàng:</label>
                      <WrapperValue>
                        <span
                          style={{ color: "#ea8500", fontWeight: "bold" }}
                        >
                          {orderContant.delivery[state?.delivery]}
                        </span>
                        Giao Hàng Tiết Kiệm
                      </WrapperValue>
                    </div>
                  </WrapperInfo>

                  <WrapperInfo>
                    <div>
                      <label>Hình Thức Thanh Toán</label>
                      <WrapperValue>
                        {orderContant.payment[order?.paymentMethod]}
                      </WrapperValue>
                    </div>
                  </WrapperInfo>

                  <WrapperItemOrderInfo>
                    {order?.orders?.map((order) => {
                      return (
                        <WrapperItemOrder key={order.product}>
                          <div
                            style={{
                              width: "500px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={order?.image}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                marginLeft: "6px",
                              }}
                            />
                            <div
                              style={{
                                marginLeft: '50px',
                                fontSize: "14px",
                                color: "#242424",
                                fontWeight: 500,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                              }}
                            >
                              {order?.name}
                            </div>
                          </div>

                          {/* đơn giá */}
                          <div
                            style={{
                              fontSize: "16px",
                              width: "120px",
                              display: "flex",
                              textAlign: "center",
                              marginLeft: "100px",
                            }}
                          >
                            Giá Tiền: {convertPrice(order?.price)}
                          </div>

                          {/* số lượng */}
                          <div
                            style={{
                              width: "120px",
                              display: "flex",
                              textAlign: "center",
                              marginLeft: "100px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "16px",
                                color: "black",
                                marginRight: "10px",
                              }}
                            >
                              Số Lượng :
                              <WrapperInputNumber
                                value={order?.amount}
                                size="small"
                                readOnly
                              />
                            </span>
                          </div>

                          {/* giảm giá */}
                          <div
                            style={{
                              width: "120px",
                              display: "flex",
                              textAlign: "center",
                              marginLeft: "100px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "16px",
                                color: "black",
                                marginRight: "10px",
                              }}
                            >
                              Giảm Giá :
                              <WrapperInputNumber
                                value={order?.discount}
                                size="small"
                                readOnly
                                style={{
                                  fontWeight: 500,
                                  color: "#1d3557",
                                  fontFamily: "Courier New, monospace", // font khác cho số
                                }}
                              />
                              <span
                                style={{
                                  marginLeft: "1px",
                                  fontWeight: "bold",
                                  color: "#1d3557",
                                }}
                              >
                                %
                              </span>
                            </span>
                          </div>
                        </WrapperItemOrder>
                      );
                    })}
                  </WrapperItemOrderInfo>

                  <div
                    style={{
                      width: "120px",
                      textAlign: "center",
                      marginLeft: "100px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        color: "red",
                        border: "content",
                      }}
                    >
                      Tổng Tiền: {convertPrice(order?.totalPriceMemo)}
                    </span>
                  </div>
                </WrapperContainer>
              </div>
            </div>
          </div>
        </>
      ) : status === "fail" ? (
        <h1>Thanh toán không thành công</h1>
      ) : null}
    </div>
  );
};

export default OrderSuccessPage;