import { Card, Flex } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { WrapperIconHeader } from '../HeaderComponent/Style'
import { WrapperDiscountText, WrapperReportText ,WrapperCardStyle } from './style'
import { StyleNameProduct } from './style'
import { WrapperPriceText } from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/image/logo.jpg';
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
  const {countInStock ,description , image ,name ,rating, price ,type,discount , selled , id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/Product-details/${id}`)
  }
  return (
  <WrapperCardStyle 
    hoverable
    style={{ width: 240 }}
    bodystyle = {{padding : '12px' }}
    cover={<img alt="example" src={image}/>}
    onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
    disabled = {countInStock === 0}
    >    
      <img src = {logo}  
      style = {{width : '68px' , height : '14px' ,position : 'absolute' , top: -1 ,left : -1,
      borderTopLeftRadius :'3px'}}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText >
        <span style={{marginRight : '4px'}} >        
          <span> {rating} </span> <StarFilled style={{fontSize : '12px', color : 'yellow' }} />
          <span>|đã bán {selled || 1000} k+ </span>
        </span>
               </WrapperReportText>  
        <WrapperPriceText> 
            <span style={{ display: Flex , marginRight:'8px' }} >{convertPrice(price)}</span> 
        <WrapperDiscountText>
            {discount || -5} % 
        </WrapperDiscountText>
        </WrapperPriceText>
  </WrapperCardStyle>
)
}

export default CardComponent