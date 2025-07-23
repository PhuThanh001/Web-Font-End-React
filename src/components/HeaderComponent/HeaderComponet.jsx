import React from 'react'
import { Badge, Col, Row, Popover } from 'antd';
import { WrapperHeader,WrapperHeaderAccount,WrapperTextHeader,WrapperTextHeaderSmall,WrapperIconHeader ,WrapperContentPopUp} from './Style';
import Search  from 'antd/es/transfer/search';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import * as UserService from '../../service/UserService';
import { resetUser } from '../../redux/slides/userSilde';
import Loading from '../LoadingComponent/loading';
// ✅ Component
const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state.user);
  
  const handleLogout = async () => {
    await UserService.logoutUser(); // Call the logout service
    dispatch(resetUser()); // Reset user state in Redux
    setIsLoading(false); // Set loading state to false
  };
const content = (
  <div>
    <WrapperContentPopUp onClick={handleLogout}>Đăng Xuất</WrapperContentPopUp>
    <WrapperContentPopUp>Thông tin người dùng</WrapperContentPopUp>
  </div>
);

  const handlerNavigationLogin = () => {
    navigate('/sign-in'); // Navigate to the SignIn page
  }
  console.log('user:', user);
  return (
    <div style={{width : '100%' ,background : 'rgb(26,148,255)' ,display : 'flex' ,justifyContent : 'center' }}>
              <WrapperHeader>
          <Row align="middle">
              <Col span={6}>
                  <WrapperTextHeader>Laptrinhquade</WrapperTextHeader>
              </Col>
              <Col span={12}>
                  <ButtonInputSearch
                      placeholder="input search text"
                      textButton = "Tim kiếm" 
                      size = "large"
                  />
              </Col>
              <Col span={6} style={{ display : 'flex' , gap : '30px' ,alignItems : 'center'}} >
              <Loading isPending={isLoading}>
              <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize : '30px'  }} />
                { user?.name ? (
                  <> 
                  <Popover trigger = "click" content={content}>
                    <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {user?.name}
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
              <div>
              <div>
                <Badge size="small" count = {4}></Badge>
                <ShoppingCartOutlined style={{ fontSize : '30px' ,color : '#fff'}} />
                <WrapperTextHeaderSmall> giỏ hàng  </WrapperTextHeaderSmall>
              </div>
              </div>
              </Col>
          </Row>
      </WrapperHeader>
    </div>  

  )
}
export default HeaderComponent
