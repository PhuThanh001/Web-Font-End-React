import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable, WrapperUpLoadFile } from './style'
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../service/UserService';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux';
import Loading from '../../components/LoadingComponent/loading';
import  * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSilde';
import {UploadOutlined} from '@ant-design/icons'
import { Upload ,Button } from 'antd';
import { getBase64 } from '../../utils';


const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const [email , setEmail] = useState("") ;
    const [name , setName] = useState("") ;
    const [phone , setPhone] = useState("");
    const [address , setAddress] = useState("");
    const [avatar , setAvatar] = useState("");

    const mutation = useMutationHook(
        (data) => {
            const {id , access_token, ...rests } = data
            return UserService.updateUser(id, rests ,access_token)
}) 
    const dispatch = useDispatch()
    const {data , isPending , isSuccess ,isError } = mutation
    console.log('mutation', mutation )
    console.log('issuccess', isSuccess)
useEffect(() => {
  message.success("Test thử thông báo");
}, []);
    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);
    
useEffect(() => {
    if (isSuccess) {
        message.success('Cập nhật thành công!');
        setTimeout(() => {
            handleDetailsUser(user?.id, user?.access_token);
        }, 300); // delay 300ms
    } else if (isError) {
        message.error('Cập nhật thất bại!');
    }
}, [isSuccess, isError]);

    
    const handleDetailsUser = async (id, token) => {
        const res = await UserService.getUserDetails(id , token)
        dispatch(updateUser({ ...res?.data ,access_token: token}))
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }  
    const handleOnchangeName = (value) => {
        setName(value);
    }
const handleOnchangeAvatar = async (uploadData) => {
  console.log('🔥 uploadData:', uploadData); // Debug đối tượng đầu vào

  // Kiểm tra uploadData và thuộc tính fileList
  if (!uploadData || !uploadData.fileList || !Array.isArray(uploadData.fileList) || uploadData.fileList.length === 0) {
    console.log('⚠️ fileList không hợp lệ hoặc rỗng');
    return; // Thoát hàm nếu fileList không hợp lệ
  }

  const file = uploadData.fileList[0]; // Lấy file từ uploadData.fileList
  console.log('📁 file:', file); // Debug dòng này

  if (!file.url && !file.preview) {
    console.log('🔄 Chưa có url/preview, bắt đầu đọc file...');
    file.preview = await getBase64(file.originFileObj);
  }

  console.log('✅ file.preview:', file.preview); // Debug dòng này
  setAvatar(file.preview);
};

    const handleOnchangePhone = (value) => {
        setPhone(value);
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value);
    }
    const handleUpdate = () => {
          console.log("Avatar đang gửi đi:", avatar); // 👈 thêm console log kiểm tra
        mutation.mutate({
            id: user?.id, email, name, phone , address , avatar , access_token: user?.access_token });
    };

    return (
    <div style={{ width: '1270px' , margin:'0 auto' ,height: '300px'}}>    
        <WrapperHeader> Thông tin người dùng</WrapperHeader>
        <div>
        <Loading isPending = {isPending} >
        <WrapperContentProfile>
        <WrapperInput>        
        <WrapperLable htmlFor='email' > Email </WrapperLable> 
        <InputForm style={{width: '300px' }} id="email" value={email} onChange={handleOnChangeEmail} /> 
        <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px' ,
              padding : '4px 6px'
            }}
            textButton={'Cập Nhật'}
            styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }} >
        </ButtonComponent>
        </WrapperInput>
        <WrapperInput>        
        <WrapperLable htmlFor='name' > Name </WrapperLable> 
        <InputForm style={{width: '300px' }} id="email" value={name} onChange={handleOnchangeName} /> 
        <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px' ,
              padding : '4px 6px'
            }}
            textButton={'Cập Nhật'}
            styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }} >
        </ButtonComponent>
        </WrapperInput>
        <WrapperInput>        
        <WrapperLable htmlFor='phone' > Phone </WrapperLable> 
        <InputForm style={{width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} /> 
        <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px' ,
              padding : '4px 6px'
            }}
            textButton={'Cập Nhật'}
            styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }} >
        </ButtonComponent>
        </WrapperInput>
        <WrapperInput>        
        <WrapperLable htmlFor='address' > address </WrapperLable> 
        <InputForm style={{width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} /> 
        <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px' ,
              padding : '4px 6px'
            }}
            textButton={'Cập Nhật'}
            styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }} >
        </ButtonComponent>
        </WrapperInput>
        <WrapperInput>        
        <WrapperLable htmlFor='avatar' > avatar </WrapperLable> 
        <WrapperUpLoadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}> 
    <Button icon={<UploadOutlined />}>Select File</Button>
        </WrapperUpLoadFile>
        {avatar && (
            <img src= {avatar} style={
                {
                    height: '60px' ,
                    width:  '60px',
                    borderRadius:  '50%',
                    objectFit :  'cover'
                }} alt ="avatar" />
        )}
        <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px' ,
              padding : '4px 6px'
            }}
            textButton={'Cập Nhật'}
            styleTextButton={{ color: 'rgba(26, 148, 255)', fontSize: '15px', fontWeight: '700' }} >
        </ButtonComponent>
        </WrapperInput>
        </WrapperContentProfile>
        </Loading>
        
        </div>
    </div>
    )
}
export default ProfilePage