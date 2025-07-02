import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import imagelogo from '../../assets/image/Imagelogo.png'
import { Image } from 'antd'
import { WrapperTextLight } from './style'

const SignUpPage = () => {
  return (
    <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center', background: 'rgb(0,0,0,0.53 )', height :'100vh' }}>
            <div style={{ height : '445px' , width : '800px' , borderRadius : '6px' , background : '#fff' , display : 'flex' }}>
        <WrapperContainerLeft>
            <h1> Xin chào</h1>
            <p> đăng nhập vào tạo tài khoản </p>
            <InputForm style ={{ marginBottom : '10px' , }} placeholder = "abc@gmail.com"/>
            <InputForm  placeholder= "password"/>
            <ButtonComponent
            border={false}
            size={40}
            styleButton={{
              backgroundColor: 'rgb(224, 1, 16)',
              height: '48px',
              width: '100%  ',
              border: 'none',
              borderRadius: '4px' ,
              margin : '26px 0 10px'

            }}
            textButton={'Đăng nhập'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }} >
            </ButtonComponent>
            <p><WrapperTextLight>Ban chua co tai khoan</WrapperTextLight></p>
            <p> chưa có tài khoản <WrapperTextLight> Tạo tài khoản </WrapperTextLight>  </p>
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