import React, { useEffect, useState } from 'react';
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable, WrapperUpLoadFile } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../service/UserService';
import { useSelector, useDispatch } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/loading';
import { updateUser } from '../../redux/slides/userSilde';
import { Upload, Button, App } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

// Đảm bảo import CSS của Ant Design v5
import 'antd/dist/reset.css';

const ProfilePage = () => {
  const { message: messageApi } = App.useApp(); // Lấy message từ context
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });

  const { data, isPending, isSuccess, isError } = mutation;



  // Cập nhật state từ user
  useEffect(() => {
    setEmail(user?.email || '');
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setAddress(user?.address || '');
    setAvatar(user?.avatar || '');
  }, [user]);

  // Xử lý thông báo và cập nhật user details
  useEffect(() => {
    if (isSuccess) {
      messageApi.success('Cập nhật thành công!');
      setTimeout(() => {
        try {
          if (!user?.id || !user?.access_token) {
            console.error('user.id hoặc access_token không hợp lệ');
            return;
          }
          handleDetailsUser(user.id, user.access_token);
        } catch (error) {
          console.error('Lỗi trong handleDetailsUser:', error);
        }
      }, 300);
    } else if (isError) {
      console.log('Trước khi gọi messageApi.error');
      messageApi.error('Cập nhật thất bại!');
      console.log('Sau khi gọi messageApi.error');
    }
  }, [isSuccess, isError, user, messageApi]);

  const handleDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getUserDetails(id, token);
      const profile = res?.data?.data;
      if (profile && profile._id) { 
      dispatch(updateUser({ 
        ...profile,  
        access_token: token  
      }));
    } else {
      console.error('Invalid profile data from API');
    }
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết user:', error);
    }
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangeName = (value) => {
    setName(value);
  };

  const handleOnchangePhone = (value) => {
    setPhone(value);
  };

  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnchangeAvatar = async (uploadData) => {
    if (!uploadData || !uploadData.fileList || !Array.isArray(uploadData.fileList) || uploadData.fileList.length === 0) {
      console.log('⚠️ fileList không hợp lệ hoặc rỗng');
      return;
    }

    const file = uploadData.fileList[0];

    if (!file.url && !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj);
        console.log('✅ file.preview:', file.preview);
        setAvatar(file.preview);
      } catch (error) {
        console.error('Lỗi khi chuyển file sang base64:', error);
      }
    } else {
      setAvatar(file.preview || file.url);
    }
  };

  const handleUpdate = () => {
    if (!user?.id || !user?.access_token) {
      messageApi.error('Không thể cập nhật: Thiếu user id hoặc token');
      return;
    }
    mutation.mutate({
      id: user.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user.access_token,
    });
  };

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '300px' }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLable htmlFor="email">Email</WrapperLable>
            <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnChangeEmail} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '4px 6px',
              }}
              textButton={'Cập Nhật'}
              styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="name">Name</WrapperLable>
            <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '4px 6px',
              }}
              textButton={'Cập Nhật'}
              styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="phone">Phone</WrapperLable>
            <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '4px 6px',
              }}
              textButton={'Cập Nhật'}
              styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="address">Address</WrapperLable>
            <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '4px 6px',
              }}
              textButton={'Cập Nhật'}
              styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="avatar">Avatar</WrapperLable>
            <WrapperUpLoadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUpLoadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '4px 6px',
              }}
              textButton={'Cập Nhật'}
              styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

// Wrap ProfilePage trong App để cung cấp context cho messageApi
const WrappedProfilePage = () => (
  <App>
    <ProfilePage />
  </App>
);

export default WrappedProfilePage;