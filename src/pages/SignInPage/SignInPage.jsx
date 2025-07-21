import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import imagelogo from '../../assets/image/Imagelogo.png'
import { Image } from 'antd'
import { WrapperTextLight } from './style'
import { useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import * as UserService from '../../service/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/loading'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true); // Example variable to control password visibility
  const [Email, setEmail] = React.useState(''); // State to hold the email value
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const handlerNavigationSignUp = () => {
    navigate('/signup'); // Navigate to the SignUp page
  }
  const mutation = useMutationHook(
    data  => UserService.loginUser(data)
    )
    const {data, isPending} = mutation;
    console.log("ispending:", isPending);
    const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleSignIn = () => {
    mutation.mutate({ Email, password });
    
  }  
  return (
      <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center', background: 'rgb(0,0,0,0.53 )', height :'100vh' }}>
            <div style={{ height : '445px' , width : '800px' , borderRadius : '6px' , background : '#fff' , display : 'flex' }}>
        <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>đăng nhập vào tạo tài khoản</p>
            <InputForm style ={{ marginBottom : '10px' , }} placeholder = "abc@gmail.com" value={Email} onChange={handleOnChangeEmail}/>
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
            disabled={!Email.length || !password.length}
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