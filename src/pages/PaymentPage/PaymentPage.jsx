import { Checkbox, Result ,Form, message ,Button ,Radio} from 'antd'
import React, { use, useMemo } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import { WrapperLeft ,WrapperStyleHeader ,WrapperListOrder ,WrapperItemOrder ,WrapperPriceDiscount,WrapperInfoSection, RowInfo,WrapperTotalSection ,WrapperCountOrder ,WrapperInputNumber, WrapperInfo, WrapperTotal,WrapperRights ,WrapperRadio } from './style'
import {DeleteOutlined  ,MinusOutlined ,PlusOutlined} from '@ant-design/icons';
import { decreaseAmount, increaseAmount , removeOrderProduct ,removeAllOrderProduct , selectOrderItems, SaveOrder } from '../../redux/slides/orderSlide'
import { updateUser } from '../../redux/slides/userSilde'
import { convertPrice } from '../../utils'
import InputComponent from '../../components/InputComponent/InputComponent'
import { WrapperUpLoadFile } from '../../components/AdminUser/style'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService  from '../../service/UserService';
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as OrderService from '../../service/OrderService'
import * as VnpayService from "../../service/VnPayService";
import { Group } from 'antd/es/radio'



const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state?.user)
    const Navigate = useNavigate();


    const [delivery , setDelivery] = useState('fast')
    const [payment , setPayment] = useState('later_money')
    
    const [form] = Form.useForm();
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
      const [stateUserDetails , setStateUserDetails] = useState({
        name: '',
        phone:'',
        address: '',
        city: '',
      })
    const handleOnChangeDetails = (e) => {
      setStateUserDetails({
        ...stateUserDetails,
        [e.target.name]: e.target.value
      })
    }  
  const handlePaymentVnpay = async () => {
  try {

      if(user?.access_token && order?.OrderItemsSelected && user.name && user.phone && user.address 
            && user.city && priceMemo && user?.id) {
        
        mutationAddOrder.mutate({token: user?.access_token, 
            orderItems: order?.OrderItemsSelected ,fullname : user?.name ,
            phone: user?.phone, address: user?.address, city: user?.city, 
            paymentMethod : payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            userId: user?.id,
            totalPrice: totalPriceMemo,
            user: user?.id,
            isPaid: true
          })
          const orderData = {
              orderId: dataAdd?.order?._id,
              totalPrice: dataAdd?.order?.totalPrice,
              orders: order?.OrderItemsSelected,
              totalPriceMemo: totalPriceMemo,
              paymentMethod: payment
          }
          dispatch(SaveOrder(orderData))
  }
    const orderId = `HD_${new Date().getTime()}`;

    if (!totalPriceMemo || isNaN(totalPriceMemo) || totalPriceMemo <= 0) {
      message.error("Giá trị thanh toán không hợp lệ!");
      return;
    }    

    const res = await VnpayService.createVnpayPayment(
      {
        orderId,
        amount: totalPriceMemo,
        orderInfo: `Thanh toán đơn hàng cho user ${user?.id}`,
        returnUrl: "http://localhost:3001/payment/vnpay_return",
        // returnUrl: "https://backend-ecomerce-0c91.onrender.com/payment/vnpay_return",
      },
      user?.access_token
    );


    if (res?.data) {
      window.location.href = res.data;
    } else {
      console.error("Không có paymentUrl trong response:", res);
      message.error("Không nhận được link thanh toán từ server!");
    }
  } catch (error) {
    console.error("VNPay error:", error);
    message.error(`Không thể khởi tạo thanh toán VNPay! Chi tiết: ${error.message || error}`);
  } finally {
    console.log("=== KẾT THÚC handlePaymentVnpay ===");
  }
};

    const dispatch = useDispatch()
    const handleChangeAddress = () => {
        setIsModalOpenUpdate(true)
    }

    const handleAddOrder = () => {
        if(user?.access_token && order?.OrderItemsSelected && user.name && user.phone && user.address 
            && user.city && priceMemo && user?.id) {
        
        mutationAddOrder.mutate({token: user?.access_token, 
            orderItems: order?.OrderItemsSelected ,fullname : user?.name ,
            phone: user?.phone, address: user?.address, city: user?.city, 
            paymentMethod : payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            userId: user?.id,
            totalPrice: totalPriceMemo,
            user: user?.id
          })
  }
}
const mutationUpdate = useMutationHook(async (data) => {
    const {
      id ,
      token,
      ...rests
    } = data
    const res = await UserService.updateUser(
      id,
      {...rests}, token)
    return res
  },
)
  const mutationAddOrder  = useMutationHook(async (data) => {
    const {
      token,
      ...rests
    } = data
    console.log("DATA" ,data)
    const res = await OrderService.CreateOrder(
      {...rests}, token)
    return res
  },
)
//localhost:5173/OrderPageSuccess
    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            phone: '',
            address: '',
            city: '',
            isAdmin: false,
        })
        form.resetFields();
        setIsModalOpenUpdate(false)
    }
    const handleUpdateInfo = () => {
        const {name, phone, address, city} = stateUserDetails
        if(name && phone && address && city) {
                    mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails },
                        {
                            onSuccess: () => {
                                dispatch(updateUser({name, phone, address, city}))
                                localStorage.setItem("user", JSON.stringify({
                                  ...user,
                                  name,
                                  phone,
                                  address,
                                  city
                                }));
                                setIsModalOpenUpdate(false)
                            }
                        }
            )
        }
    }
    const {isLoading, data} = mutationUpdate
    const {data: dataAdd , isLoading: isLoadingAddOrder, isSuccess , isError} = mutationAddOrder


useEffect(() => {
}, [mutationAddOrder])
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
    // useEffect(() => {
    //     if(isSuccess && dataAdd?.status === 'OK') {
    //         const orderData = {
    //           orderId: dataAdd?.order?._id,
    //           totalPrice: dataAdd?.order?.totalPrice,
    //           orders: order?.OrderItemsSelected,
    //           totalPriceMemo: totalPriceMemo,
    //           paymentMethod: payment
    //       }
    //       dispatch(SaveOrder(orderData))
    //       const arrayOrdered = []
    //       order?.OrderItemsSelected.forEach(element => {
    //         arrayOrdered.push(element.product)
    //       });
    //       message.success('Đặt hàng thành công')
    //       dispatch(removeAllOrderProduct({listChecked : arrayOrdered}))
    //       message.success('đặt hàng thành công')
    //       Navigate('/OrderPageSuccess' ,{
    //         state: {
    //           orderId: dataAdd?.order?._id,
    //           totalPrice: dataAdd?.order?.totalPrice,
    //           orders: order?.OrderItemsSelected,
    //           totalPriceMemo: totalPriceMemo,
    //           paymentMethod: payment
    //         }
    //       })
    //   }else if(isError) {
    //       message.error('Đặt hàng thất bại')
    //     }
    // }, [isSuccess, isError])
    useEffect(() => {
  if (isSuccess && dataAdd?.status === 'OK') {
    const orderData = {
      orderId: dataAdd?.order?._id,
      totalPrice: dataAdd?.order?.totalPrice,
      orders: order?.OrderItemsSelected,
      totalPriceMemo: totalPriceMemo,
      paymentMethod: payment,
    };

    // ✅ Lưu order vào Redux
    dispatch(SaveOrder(orderData));

    const arrayOrdered = [];
    order?.OrderItemsSelected.forEach((element) => {
      arrayOrdered.push(element.product);
    });

    message.success('Đặt hàng thành công');
    dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));

    // Chuyển trang mà không cần truyền state nữa
    Navigate('/OrderPageSuccess');
  } else if (isError) {
    message.error('Đặt hàng thất bại');
  }
}, [isSuccess, isError]);

  
    useEffect(() => {
        if(setIsModalOpenUpdate) {
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            })
        }
    }, [setIsModalOpenUpdate]);
   
    const priceMemo = useMemo(() => {
  return order?.OrderItemsSelected?.reduce((total, item) => total + item.price * item.amount, 0) || 0;
}, [order]);

// const discountMemo = useMemo(() => {
//   return order?.OrderItemsSelected?.reduce((total, item) => total + item.discount * item.amount, 0) || 0;
// }, [order]);
const discountMemo = useMemo(() => {
const result =  order?.OrderItemsSelected?.reduce((total, cur) => {
    const totalDiscount = cur.discount ? cur.discount : 0; 
    return total + (priceMemo * (totalDiscount * cur.amount) / 100);
  }, 0)
  if(Number(result)) {
    return result
  }
  return 0;
}, [order]);
const deliveryPriceMemo = useMemo(() => {
  return priceMemo > 200000 ? 10000 : 20000;
}, [priceMemo]);

const totalPriceMemo = useMemo(() => {
  return priceMemo + deliveryPriceMemo - discountMemo;
}, [priceMemo, deliveryPriceMemo, discountMemo]);

  const handleDelivery = (e) => {
    const value = e.target.value;
    // Nếu chọn cùng 1 cái -> bỏ chọn
    if (value === delivery) {
      setDelivery(null);
    } else {
      setDelivery(value);
    }
  };

const handlePayment = (e) => {
    setPayment(e.target.value);
}

    return (
        <div style={{background: '#fff',width: '100%', height: '100vh'}}> 
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
            <h3>Thanh Toán</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <WrapperLeft>
                    <WrapperInfo>
                        <div>
                        <label>Chọn Phương Thức Giao Hàng:</label>
                                <Radio.Group style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }} onChange={handleDelivery} value={delivery}>
                                    <Radio value="fast">
                                        <span style={{ color: "#ea8500", fontWeight: "bold" }}>FAST</span> Giao Hàng Tiết Kiệm
                                    </Radio>
                                    <Radio value="go_jek">
                                        <span style={{ color: "#ea8500", fontWeight: "bold" }}>GO_JEK</span> Giao Hàng Tiết Kiệm
                                    </Radio>
                                </Radio.Group>
                        </div>
                    </WrapperInfo>
                    <WrapperInfo>
                        <div>
                            <label>Chọn Phương Thức Thanh Toán</label>
                          <Radio.Group style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                           onChange={handlePayment} value={payment}>
                                <Radio value="later_money">Thanh Toán Sau Khi Nhận Được Hàng</Radio>
                                <Radio value="vnpay">Thanh Toán bằng VNPay</Radio>
                          </Radio.Group>
                        </div>
                    </WrapperInfo>
                </WrapperLeft>
                <WrapperRights>
                        <WrapperInfo>
                            <div>
                                <span>Địa Chỉ:</span>
                                <span style={{color: 'blue'}}> {`${user?.address} ${user?.city}`} </span>
                                <span onClick={handleChangeAddress} style={{color: 'blue', cursor: 'pointer'}}> Thay đổi </span>
                            </div>
                        </WrapperInfo>
                    <div style={{width : '100%'}}>
                        <WrapperInfoSection>
                            <RowInfo  style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between' , gap: '20px'}}>
                                <span>Tạm tính</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                            </RowInfo>
                                <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between' , gap: '20px'}}>
                                <span>Giảm giá</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(discountMemo)}</span>
                            </RowInfo>
                            <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between' , gap: '20px'}}>
                                <span>Thuế</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>0</span>
                            </RowInfo>
                            <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between' , gap: '20px'}}>
                                <span>Phí Giao Hàng</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(deliveryPriceMemo)}</span>
                            </RowInfo>
                        </WrapperInfoSection>
                        <WrapperTotalSection>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between', gap: '20px'}}>
                                <span>Tổng cộng</span>
                                <span style={{color: 'rgba(245, 35, 7, 1)' ,fontSize: '14px' , fontWeight: 'bold', display : 'flex' }}>{convertPrice(totalPriceMemo)}</span>
                            </div>
                        </WrapperTotalSection>
                    </div>
                      {payment === "later_money" ? (
                        <ButtonComponent
                                        border = {false}
                                        size = {40} 
                                        styleButton ={{
                                                backgroundColor : 'rgba(245, 35, 7, 1)' ,
                                                height : '48px' ,
                                                width : '228PX' ,
                                                border : 'none' ,
                                                borderRadius : '4px',
                                                marginTop: '20px'
                                         }}
                                         textButton ={ 'Đặt Hàng'}
                                         styleTextButton = {{ color : '#efefef' , fontSize : '15px', fontWeight : '700'}}
                                         onClick={handleAddOrder}  />
                                          ):(
                                            <div></div>
                                          ) }
                                {/* ✅ Nút thanh toán VNPay */}
                                {payment === "vnpay" ? (              
                <ButtonComponent
                border={false}
                size={40}
                styleButton={{
                  backgroundColor: "#0d6efd",
                  height: "48px",
                  width: "228PX",
                  border: "none",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
                textButton={"Thanh toán VNPay"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                onClick={handlePaymentVnpay}
              />) : (
                                <div></div>
                            )}

                </WrapperRights>
            </div>
        </div>
            <ModalComponent
                title="Cập Nhập Thông Tin Giao Hàng"
                open={isModalOpenUpdate}
                onCancel={handleCancelUpdate}
                onOk={handleUpdateInfo }
              >
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            //onFinish={OnUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent value={stateUserDetails.city} onChange={handleOnChangeDetails} name="city" />
            </Form.Item>
          </Form>          
          </ModalComponent>
        </div>
    )
}
export default PaymentPage;