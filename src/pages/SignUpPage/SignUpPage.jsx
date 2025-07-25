import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import imagelogo from '../../assets/image/Imagelogo.png'
import { Image } from 'antd'
import { WrapperTextLight } from './style'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../service/UserService';
import * as message from '../../components/Message/Message';
import { success ,error } from '../../components/Message/Message'
import Loading from '../../components/LoadingComponent/loading'

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true); // Example variable to control password visibility
  const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(true); // Example variable to control confirm password visibility
  const [email, setEmail] = React.useState(''); // State to hold the email value
  const [password, setPassword] = React.useState(''); // State to hold the password value
  const [confirmPassword, setConfirmPassword] = React.useState(''); // State to hold the confirm password value
  const navigate = useNavigate();
  const handlerNavigationSignIn = () => {
    navigate('/signin'); // Navigate to the SignIn page
  }
  const mutation = useMutationHook(
    data => UserService.registerUser(data) // Assuming you have a registerUser function in UserService
  );

  console.log('mutation:', mutation);
  const { data, isPending , isError , isSuccess } = mutation;
      
  useEffect(() => {
        if (isSuccess) {
          success()
          handleNavigateSignIn()
        } else if (isError) {
            error();
          }
      }, [isSuccess, isError])

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
    const handleNavigateSignIn = () => {
    navigate('/signin'); // Navigate to the SignIn page
  }
  const handleSignUp = () => {
    // Handle sign-up logic here
    mutation.mutate({ email, password, confirmPassword });
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // You can add your sign-up logic here, such as API calls or form validation
  }
  return (
    <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center', background: 'rgb(0,0,0,0.53 )', height :'100vh' }}>
            <div style={{ height : '445px' , width : '800px' , borderRadius : '6px' , background : '#fff' , display : 'flex' }}>
        <WrapperContainerLeft>
            <h1> Xin chào</h1>
            <p> đăng nhập vào tạo tài khoản </p>
            <InputForm style ={{ marginBottom : '100px' , }} placeholder = "abc@gmail.com" value={email} onChange={handleOnChangeEmail} />
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
            <InputForm placeholder="password" style={{ marginBottom: '10px', }} type={isShowPassword ? 'text' : 'password'} value={password} onChange={handleOnChangePassword} />
          </div>
            <div style={{ position: 'relative' }}>
            <span 
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            style={{ position: 'absolute', right: '10px', top: '10px', zIndex : 10 }}>
              {isShowConfirmPassword ? (
                <EyeFilled/>
              ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputForm  placeholder= "confirm password" style={{ marginBottom : '10px' ,  }} type={isShowConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
            </div>
            {data?.status === 'ERR' && <span style={{color : 'red'}} > {data?.message} </span>}
            <Loading isPending={isPending} > 
            <ButtonComponent
            disabled={!email.length || !password.length || !confirmPassword.length}  
            onClick={handleSignUp}
            size={40}
            styleButton={{
              backgroundColor: 'rgba(247, 61, 9, 1)',
              height: '48px',
              width: '100% ',
              border: 'none',
              borderRadius: '4px',
              margin : '26px 0 10px'
            }}
            textButton={'Đăng Ký'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }} >
            </ButtonComponent>
            </Loading>
            <p><WrapperTextLight>Ban chua co tai khoan</WrapperTextLight></p>
            <p> chưa có tài khoản <WrapperTextLight onClick={handlerNavigationSignIn}> Đăng Nhập </WrapperTextLight>  </p>
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

export default SignUpPage