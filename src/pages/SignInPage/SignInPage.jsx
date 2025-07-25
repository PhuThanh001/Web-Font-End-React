import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import imagelogo from '../../assets/image/Imagelogo.png'
import { Image, message } from 'antd'
import { WrapperTextLight } from './style'
import { Navigate, useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import * as UserService from '../../service/UserService';
import * as Message from '../../components/InputForm/InputForm'
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/loading';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSilde';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true); // Example variable to control password visibility
  const [email, setEmail] = React.useState(''); // State to hold the email value
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerNavigationSignUp = () => {
    navigate('/signup'); // Navigate to the SignUp page
  }
  const mutation = useMutationHook(
    data  => UserService.loginUser(data)
    )
    console.log('mutation:', mutation);
    const {data, isPending ,isSuccess} = mutation;
    useEffect(() => {
    if (isSuccess) {
      navigate('/');
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decodedToken = jwtDecode(data?.access_token);
        console.log('decode:', decodedToken);
        if(decodedToken?.id){
           handleGetDetailsUser(decodedToken?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);
  
const handleGetDetailsUser = async (id , token) => {
      const res =  await UserService.getUserDetails(id, token);
      console.log('res:', res);
      dispatch(updateUser({ ...res?.data, access_token: token }));
  }
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleSignIn = () => {
    mutation.mutate({ email, password });
  }  

  return (
      <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center', background: 'rgb(0,0,0,0.53 )', height :'100vh' }}>
            <div style={{ height : '445px' , width : '800px' , borderRadius : '6px' , background : '#fff' , display : 'flex' }}>
        <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>đăng nhập vào tạo tài khoản</p>
            <InputForm style ={{ marginBottom : '10px' , }} placeholder = "abc@gmail.com" value={email} onChange={handleOnChangeEmail}/>
            <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                zIndex: 10
              }}>
              {isShowPassword ? (
                <EyeFilled />
              ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputForm placeholder="password" type={isShowPassword ? 'text' : 'password'} value={password} onChange={handleOnChangePassword} />
          </div>
            {data?.status === 'ERR' && <span style={{color : 'red'}} > {data?.message} </span>}
            <Loading isPending={isPending} >
            <ButtonComponent
            disabled={!email.length || !password.length}
            onClick={handleSignIn}
            size={40}
            styleButton={{
              backgroundColor: 'rgba(236, 58, 3, 1)',
              height: '48px',
              width: '100%  ',
              border: 'none',
              borderRadius: '4px' ,
              margin : '26px 0 10px'
            }}
            textButton={'Đăng nhập'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }} >
            </ButtonComponent>
            </Loading>
            <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
            <p>Chưa có tài khoản<WrapperTextLight onClick={handlerNavigationSignUp}>Đăng ký</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
            <Image src = {imagelogo} preview = {false} alt = "image-logo" height = "203px" width ="203px" />
            <h4>
              Mua sắm tại thương mại  
            </h4>
        </WrapperContainerRight>
    </div>
      </div>
  )
}
export default SignInPage