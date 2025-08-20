import { Checkbox, Result ,Form, message  } from 'antd'
import React, { use, useMemo } from 'react'
import { useDispatch, useSelector , } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { WrapperLeft ,WrapperStyleHeader ,WrapperListOrder ,WrapperItemOrder ,WrapperPriceDiscount,WrapperInfoSection, RowInfo,WrapperTotalSection ,WrapperCountOrder ,WrapperInputNumber, WrapperInfo, WrapperTotal,WrapperRights } from './style'
import {DeleteOutlined  ,MinusOutlined ,PlusOutlined} from '@ant-design/icons';
import { decreaseAmount, increaseAmount , removeOrderProduct ,removeAllOrderProduct , selectOrderItems } from '../../redux/slides/orderSlide'
import { updateUser } from '../../redux/slides/userSlide'
import { convertPrice } from '../../utils'
import InputComponent from '../../components/InputComponent/InputComponent'
import { WrapperUpLoadFile } from '../../components/AdminUser/style'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService  from '../../service/UserService';



const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state?.user)
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

    const [listCheck , setListCheck] = useState([])
    const dispatch = useDispatch()
    console.log('order' , order)
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if(listCheck.includes(e.target.value)){
            const newListCheck =  setListCheck(listCheck.filter(item => item !== e.target.value))
            setListCheck(newListCheck)
        }else {
            setListCheck([...listCheck, e.target.value])
        }
    }
    const handleChangeCount = (type, idProduct) => {
        console.log('type' , type , 'idProduct' , idProduct)
        if (type === 'increase') {
            dispatch(increaseAmount({idProduct}))
        }else {
            dispatch(decreaseAmount({idProduct}))
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
    const handleDeleteAllItem = () => {
        if(listCheck.length === order?.orderItems?.length) {
            dispatch(removeAllOrderProduct(listCheck))}
    }
    const handleAddCart = () => {
        if(!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsModalOpenUpdate(true)
        }else if(!order.OrderItemsSelected.length) {
            message.error('Bạn chưa chọn sản phẩm nào')
        }
    }
  const mutationUpdate = useMutationHook(async (data) => {
    console.log('data' , data)
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
        if(setIsModalOpenUpdate) {
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
  return order?.OrderItemsSelected?.reduce((total, item) => total + item.price * item.amount, 0) || 0;
}, [order]); 

const discountMemo = useMemo(() => {
  return order?.OrderItemsSelected?.reduce((total, item) => total + item.discount * item.amount, 0) || 0;
}, [order]);

const deliveryPriceMemo = useMemo(() => {
  return priceMemo > 200000 ? 10000 : 20000;
}, [priceMemo]);

const totalPriceMemo = useMemo(() => {
  return priceMemo + deliveryPriceMemo - discountMemo;
}, [priceMemo, deliveryPriceMemo, discountMemo]);
    return (
        <div style={{background: '#fff',width: '100%', height: '100vh'}}> 
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
            <h3>giỏ hàng</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <WrapperLeft>
                    <WrapperStyleHeader>
                        <span style={{display: 'inline-block', width: '390px'}}>
                            <Checkbox  onChange={handleChangeCheckAll} checked={listCheck.length === order?.orderItems?.length} />
                            <span> Chọn tất cả ({order?.orderedItems?.length} sản phẩm ) </span>
                        </span>
                        <div style={{flex:1 , display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                            <span style={{marginRight: '100px'}}>số lượng</span>
                            <span style={{marginRight: '100px'}}>đơn giá</span>
                            <span style={{marginRight: '100px'}}>Thành tiền</span>
                            <DeleteOutlined style={{cursor: 'pointer'}} onClick={handleDeleteAllItem} />
                        </div>
                    </WrapperStyleHeader>
                    <WrapperListOrder>
                        {order?.orderItems?.map((order) => {
                            return (
                                <WrapperItemOrder key={order.product}>
                        <div style={{width: '390px', display: 'flex', alignItems: 'center'}}>
                            <Checkbox onChange={onChange} value={order.product} checked={listCheck.includes(order.product)} />
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
                        {console.log('order.price' , order.price)}
                        <div style={{width: '120px', textAlign: 'center',marginLeft: '100px'}}>
                            {convertPrice(order.price)}
                        </div>

                        {/* số lượng */}
                        <div style={{width: '120px', display: 'flex', justifyContent:'center' ,marginLeft: '100px'}}>
                            <WrapperCountOrder>
                            <button onClick={() => handleChangeCount('decrease', order.product)} style={{border: 'none', background: 'none', cursor: 'pointer'}}>
                                <MinusOutlined style={{ color :'#000' ,fontSize :'10px'}}/>
                            </button>
                            <WrapperInputNumber value={order.amount} size="small" readOnly />
                            <button onClick={() => handleChangeCount('increase', order.product)} style={{border: 'none', background: 'transparent', cursor: 'pointer'}}>
                                <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                            </button>
                            </WrapperCountOrder>
                        </div>

                        {/* thành tiền */}
                        <div>
                        <div style={{width:'120px', textAlign:'center', color:'rgb(255,66,78)', marginRight: '16px', fontWeight:500}}>
                            {convertPrice(order.amount * order.price)}
                        </div>
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
                    <div style={{width : '100%'}}>
                        <WrapperInfoSection>
                            <RowInfo  style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
                                <span>Tạm tính</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                            </RowInfo>
                                <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
                                <span>Giảm giá</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(discountMemo)}</span>
                            </RowInfo>
                            <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
                                <span>Thuế</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>0</span>
                            </RowInfo>
                            <RowInfo style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
                                <span>Phí Giao Hàng</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(deliveryPriceMemo)}</span>
                            </RowInfo>
                        </WrapperInfoSection>
                        <WrapperTotalSection>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
                                <span>Tổng cộng</span>
                                <span style={{color: '#000' ,fontSize: '14px' , fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                            </div>
                        </WrapperTotalSection>
                    </div>
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
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>          
          </ModalComponent>
        
        </div>
    )
}
export default OrderPage;