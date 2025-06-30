import React from 'react'
import { Badge, Col, Row } from 'antd';
import { WrapperHeader,WrapperHeaderAccount,WrapperTextHeader,WrapperTextHeaderSmall,WrapperIconHeader } from './Style';
import Search  from 'antd/es/transfer/search';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
// ✅ Component
const HeaderComponent = () => {
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
              <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize : '30px'  }} />
              <div>
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
              </WrapperHeaderAccount>
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
