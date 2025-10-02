import { Checkbox, Result ,Form, message ,Button , InputNumber } from 'antd'
import React, { use, useMemo } from 'react'
import { ShoppingCartOutlined , CarOutlined , CheckCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector , } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { WrapperLeft ,WrapperStyleHeader ,WrapperListOrder ,WrapperItemOrder ,WrapperInfoSection, RowInfo,WrapperTotalSection ,WrapperCountOrder ,WrapperInputNumber, WrapperInfo, WrapperTotal,WrapperRights, WrapperStyleHeaderDelivery } from './style'
import {DeleteOutlined  ,MinusOutlined ,PlusOutlined} from '@ant-design/icons';
import { decreaseAmount, increaseAmount , removeOrderProduct ,removeAllOrderProduct , selectOrderItems } from '../../redux/slides/orderSlide'
import { updateUser } from '../../redux/slides/userSilde'
import { convertPrice } from '../../utils'
import InputComponent from '../../components/InputComponent/InputComponent'
import { WrapperUpLoadFile } from '../../components/AdminUser/style'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService  from '../../service/UserService';
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import StepComponent from '../../components/StepComponent/StepComponent'



const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state?.user)
    console.log("user" , user)
    const [form] = Form.useForm();
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
      const [stateUserDetails , setStateUserDetails] = useState({
        name: '',
        phone:'',
        address: '',
        city: '',
      })
    const handleOnChangeDetails = (e) => {
      console.log('check' , e.target.name ,e.target.value)
      setStateUserDetails({
        ...stateUserDetails,
        [e.target.name]: e.target.value
      })
    }  
    const navigate = useNavigate()
    const [listCheck , setListCheck] = useState([])
    const dispatch = useDispatch()
    console.log('order' , order)
    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    //     if(listCheck.includes(e.target.value)){
    //         const newListCheck =  setListCheck(listCheck.filter(item => item !== e.target.value))
    //         setListCheck(newListCheck)
    //     }else {
    //         setListCheck([...listCheck, e.target.value])
    //     }
    // }
    const onChange = (e) => {
    const value = e.target.value;
    if (listCheck.includes(value)) {
        setListCheck(listCheck.filter(item => item !== value));
    } else {
        setListCheck([...listCheck, value]);
    }
    };

    const handleChangeCount = (type, idProduct , limited) => {
        console.log('type' , type , 'idProduct' , idProduct)
        if (type === 'increase') {
            if(!limited) {
            dispatch(increaseAmount({idProduct}))
            }
        }else {
            if(!limited){
                dispatch(decreaseAmount({idProduct}))
            }
        }
    }

    const handleChangeCheckAll = (e) => {
        if(e.target.checked) {
            const newListCheck = []
            order?.orderItems?.forEach((item) => {
                newListCheck.push(item?.product)
            });
            setListCheck(newListCheck)
        } else {
            setListCheck([])
        }
    }   
    const handleDeleteItem = (idProduct) => {
            dispatch(removeOrderProduct({idProduct}))
    }
    const handleChangeAddress = () => {
        setIsModalOpenUpdate(true)
    }
    const handleDeleteAllItem = () => {
        if(listCheck.length === order?.orderItems?.length) {
            dispatch(removeAllOrderProduct({listCheck}))
            }
    }
    const handleAddCart = () => {
        if(!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsModalOpenUpdate(true)
        }else if(!order.OrderItemsSelected.length) {
            message.error('Bạn chưa chọn sản phẩm nào')
        }else{
            navigate('/payment')
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
                                setIsModalOpenUpdate(false)
                            }
                        }
            )
        }
    }
    useEffect(() => {
        dispatch(selectOrderItems({listCheck}))
    }, [listCheck]);
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
    useEffect(() => {
        if(isModalOpenUpdate) {
            setStateUserDetails({
                ...stateUserDetails,
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            })
        }
    }, [setIsModalOpenUpdate]);
    const priceMemo = useMemo(() => {
    const result = order?.OrderItemsSelected?.reduce((total, item) => {
       return total + ((item.price * item.amount))}, 0) 
       return result
}, [order]); 
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
  if (priceMemo > 200000 && priceMemo < 500000){
    return 10000 
    }else if(priceMemo >= 500000){
        return 0
    } else if(order?.OrderItemsSelected.length === 0) {
        return 0
    }else {
        return 20000
    }
}, [priceMemo]);

const totalPriceMemo = useMemo(() => {
  return priceMemo + deliveryPriceMemo - discountMemo ;
}, [priceMemo, deliveryPriceMemo, discountMemo]);

const ItemsDelivery = [
  {
    title: "20000VND",
    description: "Dưới 200.000VND",
  },
  {
    title: "10.000VND",
    description: "Từ 200.000VND tới 500.000VND",
  },
  {
    title: "0 VND",
    description: "Trên 500000VND",
  },
];


    return (
        <div style={{background: '#f5f5f5',width: '100%', height: '100vh'}}> 
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
            <h3>giỏ hàng</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <WrapperLeft>
                <WrapperStyleHeaderDelivery className='header-delivery'>
                    <StepComponent  items={ItemsDelivery} current={
                                deliveryPriceMemo === 20000
                                    ? 0
                                    : deliveryPriceMemo === 10000
                                        ? 1
                                        : deliveryPriceMemo === 0
                                            ? 2
                                            : 0
  }
  ></StepComponent>
                </WrapperStyleHeaderDelivery>
                    <WrapperStyleHeader >
                        <span style={{display: 'inline-block', width: '390px'}}>
                            <Checkbox  onChange={handleChangeCheckAll} checked={(Array.isArray(listCheck) ? listCheck.length : 0) === order?.orderItems?.length} />
                                <span> Chọn tất cả ({order?.orderedItems?.length} sản phẩm ) </span>
                        </span>
                        {/* <div style={{flex:1 , display: 'flex',justifyContent: 'center',alignItems: 'center'}}> */}
                            {/* Đơn giá */}
                            <div style={{ textAlign: "center" }}>Đơn giá</div>

                            {/* Số lượng */}
                            <div style={{ textAlign: "center" }}>Số lượng</div>

                            {/* Thành tiền */}
                            <div style={{ textAlign: "center" }}>Thành tiền</div>
                            {/* Delete */}
                            <div style={{ textAlign: "center" }}>
                                <DeleteOutlined
                                    style={{ cursor: "pointer" }}
                                    onClick={handleDeleteAllItem}
                                />
                                
                            </div>                        {/* </div> */}
                    </WrapperStyleHeader>
                    <WrapperListOrder>
                        {order?.orderItems?.map((order) => {
                            return (
                    <WrapperItemOrder key={order.product}>
                        <div style={{width: '390px', display: 'flex', alignItems: 'center'}}>
                            <Checkbox onChange={onChange} value={order.product} checked={Array.isArray(listCheck) && listCheck.includes(order.product)} />
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
                            {order.name}
                            </div>
                        </div>

                        {/* đơn giá */}
                        <div style={{ textAlign: "center" }}>
                                {convertPrice(order.price)}
                            </div>

                        {/* số lượng */}
                        <div  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <WrapperCountOrder>
                            <Button onClick={() => handleChangeCount('decrease', order.product)}     
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                <MinusOutlined style={{ color :'#000' ,fontSize :'10px'}}  />
                            </Button>
                            {/* <InputNumber style={{ width: "60px" }} className='soothutu' value={order.amount} size="small" readOnly min={1} max={order.countInStock}/> */}
                            <WrapperInputNumber 
                                value={order.amount} 
                                size="small" 
                                min={1} 
                                max={order.countInStock} 
                                style={{ width: "50px" }} 
                                readOnly
                                />
                            <Button onClick={() => handleChangeCount('increase', order?.product , order?.amount === order?.countInStock) } 
                                                style={{
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                <PlusOutlined style={{ color: '#000', fontSize: '10px' }} min={1} max={order.countInStock}/>
                            </Button>
                            </WrapperCountOrder>
                        </div>
                        {/* thành tiền */}
                                    <div style={{ textAlign: "center", color: "rgb(255,66,78)", fontWeight: 500 }}>
                                        {convertPrice(order.amount * order.price)}
                                    </div>
                        {/* delete */}
                        <div style={{width:'40px', display:'flex', justifyContent:'center'}}>
                            <DeleteOutlined onClick={() => handleDeleteItem(order.product)}  style={{cursor:'pointer'}}/>
                        </div>
</WrapperItemOrder>)        
                        })}
                    </WrapperListOrder>
                </WrapperLeft>
                {console.log('order' , order?.price)}
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
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>0 VND</span>
                            </RowInfo>
                            <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between' , gap: '15px'}}>
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
                                <ButtonComponent
                                        border = {false}
                                        size = {40} 
                                        styleButton ={{
                                                backgroundColor : 'rgba(245, 35, 7, 1)' ,
                                                height : '48px' ,
                                                width : '250px' ,
                                                border : 'none' ,
                                                borderRadius : '4px',
                                                marginTop : '20px'
                                         }}
                                         textButton ={ 'Đặt Hàng'}
                                         styleTextButton = {{ color : '#efefef' , fontSize : '15px', fontWeight : '700'}}
                                         onClick={handleAddCart}  >
                                </ButtonComponent>
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
export default OrderPage;