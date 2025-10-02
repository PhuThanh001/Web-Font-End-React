import React, { useEffect, useState } from 'react';
import { Badge, Col, Row, Popover } from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall, WrapperIconHeader, WrapperContentPopUp } from './Style';
import Search from 'antd/es/transfer/search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch ,shallowEqual} from 'react-redux';
import * as UserService from '../../service/UserService';
import { resetUser, updateUser } from '../../redux/slides/userSilde';
import { searchProduct } from '../../redux/slides/productSlide';
import Loading from '../LoadingComponent/loading';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const HeaderComponent = ({ isHiddenSearch = false, isHiddentCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user, shallowEqual);
  const [search, setSearch] = useState('');
  const order = useSelector((state) => state.order);
  console.log("user" , user)

  const handleLogout = async () => {
    setIsLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setIsLoading(false);
  };

useEffect(() => {
  const fetchProfile = async () => {
    if (user?.access_token) {
      try {
        const res = await UserService.getUserDetails(user._id, user.access_token);
        const profile = res?.data;

        if (profile) {
          dispatch(updateUser({
            ...user,
            ...profile    // giả sử API trả về name, email, avatar, ...
          }));
        }
      } catch (error) {
        console.log("Error fetchProfile: ", error);
      }
    }
  };  
fetchProfile();
}, [user?.access_token]);
useEffect(() => {
  setIsLoading(true);
  setUserName(user?.name);
  setUserAvatar(user?.avatar);
  setIsLoading(false);
}, [user?.name, user?.avatar, user?.access_token]);

const content = (
  <div>
    <WrapperContentPopUp onClick={() => handlerClickNavigation('Profile')}>
      Thông tin người dùng
    </WrapperContentPopUp>
    {user?.isAdmin && (
      <WrapperContentPopUp onClick={() => handlerClickNavigation('admin')}>
        Quản lí hệ thống
      </WrapperContentPopUp>
    )}
    <WrapperContentPopUp onClick={() => handlerClickNavigation(`my-order`) }>
      Đơn Hàng Của Tôi
    </WrapperContentPopUp>
    <WrapperContentPopUp onClick={handleLogout}>
      Đăng Xuất
    </WrapperContentPopUp>
  </div>
);

  const handlerClickNavigation = (Type) => {
    if(Type === 'Profile'){
      navigate('/Profile-User')
    }else if(Type === 'admin'){
      navigate('/System/Admin')
    }else if(Type === 'my-order'){
      navigate('/my-order' , { state : {
        id : user?.id,
        token: user?.access_token
      }}) 
    }else {
      handleLogout()
    }
    //SetIsOpenPopUp(false)
  };

  const handlerNavigationLogin = () => {
    navigate('/signin');
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <Loading isPending={isLoading}>
      <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
        <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddentCart ? 'space-between' : 'unset' }}>
          <Row align="middle">
            <Col span={6}>
              <WrapperTextHeader
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                Laptrinhquade
              </WrapperTextHeader>
            </Col>
            {!isHiddenSearch && (
              <Col span={13}>
                <ButtonInputSearch
                  className="input-search-header"
                  placeholder="input search text"
                  bordered={false}
                  TextButton="Tìm Kiếm"
                  style={{ width: '100%' }}
                  value={search}
                  height="large"
                  size="large"
                  onChange={onSearch}
                />
              </Col>
            )}
            <Col span={6} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <Loading isPending={isLoading}>
                <WrapperHeaderAccount>
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      style={{
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                      alt="avatar"
                    />
                  ) : (
                    <UserOutlined style={{ fontSize: '30px' }} />
                  )}
                  {user?.access_token ? (
                    <>
                      <Popover
                        trigger="click"
                        content={content}
                        onOpenChange={(open) => console.log('Popover open:', open)}
                      >
                        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          {userName?.length ? userName : user?.email}
                        </div>
                      </Popover>
                    </>
                  ) : (
                    <div
                      onClick={handlerNavigationLogin}
                      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <WrapperTextHeaderSmall>Đăng ký/Đăng nhập</WrapperTextHeaderSmall>
                      <div>
                        <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                      </div>
                    </div>
                  )}
                </WrapperHeaderAccount>
              </Loading>
              {!isHiddentCart && (
                <div>
                  <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                    <Badge size="small" count={order?.orderItems?.length}></Badge>
                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                    <WrapperTextHeaderSmall>giỏ hàng</WrapperTextHeaderSmall>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </WrapperHeader>
      </div>
    </Loading>
  );
};
export default HeaderComponent;