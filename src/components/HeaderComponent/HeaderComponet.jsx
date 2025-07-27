import React, { useEffect, useState } from 'react'
import { Badge, Col, Row, Popover } from 'antd';
import { WrapperHeader,WrapperHeaderAccount,WrapperTextHeader,WrapperTextHeaderSmall,WrapperIconHeader ,WrapperContentPopUp} from './Style';
import Search  from 'antd/es/transfer/search';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import * as UserService from '../../service/UserService';
import { resetUser } from '../../redux/slides/userSilde';
import Loading from '../LoadingComponent/loading';
// ✅ Component
const HeaderComponent = ({isHiddenSearch = false ,isHiddentCart = false}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName , setUserName] = useState();
  const [userAvatar , setUserAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  
  const handleLogout = async () => {
    setIsLoading(true);
    await UserService.logoutUser(); // Call the logout service
    dispatch(resetUser()); // Reset user state in Redux
    setIsLoading(false); // Set loading state to false
  };
  useEffect(() => {
    setIsLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar)
    setIsLoading(false);
  }, [user?.name , user?.avatar]);
const content = (
  <div>
   
    <WrapperContentPopUp onClick={() => Navigate('/Profile-User')}>Thông tin người dùng </WrapperContentPopUp>
    {user?.isAdmin &&   
    ( <WrapperContentPopUp onClick={() => Navigate('/system/Admin ')}>Quản lí hệ thống </WrapperContentPopUp>
    )}
       <WrapperContentPopUp onClick={handleLogout}>Đăng Xuất</WrapperContentPopUp>
    </div>
);
  const handlerNavigationLogin = () => {
    navigate('/signin'); // Navigate to the SignIn page
  }
  console.log('user:', user);
  return (
    <div style={{width : '100%' ,background : 'rgb(26,148,255)' ,display : 'flex' ,justifyContent : 'center' }}>
              <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddentCart ? 'space-between' : 'unset'}}>
          <Row align="middle">
              <Col span={6}>
                  <WrapperTextHeader>Laptrinhquade</WrapperTextHeader>
              </Col>
              {!isHiddenSearch && (
                <Col span={13}>
                  <ButtonInputSearch
                      placeholder="input search text"
                      textButton = "Tim kiếm" 
                      size = "large"
                  />
              </Col>
              )}
              <Col span={6} style={{ display : 'flex' , gap : '30px' ,alignItems : 'center'}} >
              <Loading isPending={isLoading}>
              <WrapperHeaderAccount>
              {userAvatar ? 
              (
                <img src={userAvatar} style={
                {
                    height: '30px' ,
                    width:  '30px',
                    borderRadius:  '50%',
                    objectFit :  'cover'
                }} alt ="avatar" /> 
              ) :(
                <UserOutlined style={{ fontSize : '30px'  }} />
              )
            }
                { user?.access_token ? (
                  <> 
                  <Popover trigger = "click" content={content} >
                    <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {userName.length ? userName : user?.email }
                  </div>
                  </Popover> 
                    </>          
                ) : (
                  <div onClick={handlerNavigationLogin} style={{cursor : 'pointer' , display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
                  <WrapperTextHeaderSmall>
                      Đăng ký/Đăng nhập
                  </WrapperTextHeaderSmall>
                  <div>
                      <WrapperTextHeaderSmall>
                          Tài Khoản
                      </WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                  </div>
              </div>
                )}
              
              </WrapperHeaderAccount>
              </Loading>
              {!isHiddentCart && (
                <div>
              <div>
                <Badge size="small" count = {4}></Badge>
                <ShoppingCartOutlined style={{ fontSize : '30px' ,color : '#fff'}} />
                <WrapperTextHeaderSmall> giỏ hàng  </WrapperTextHeaderSmall>
              </div>
              </div>
              )}
              </Col>
          </Row>
      </WrapperHeader>
    </div>  
  )
}
export default HeaderComponent
