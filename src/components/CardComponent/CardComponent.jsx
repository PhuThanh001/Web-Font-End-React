import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { WrapperIconHeader } from '../HeaderComponent/Style'
import { WrapperDiscountText, WrapperReportText } from './style'
import { StyleNameProduct } from './style'
import { WrapperPriceText } from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/image/logo.jpg';
import { useNavigate } from 'react-router-dom'

const CardComponent = (props) => {
  const {countInStock ,description , image ,name ,rating, price ,type,discount , selled , id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/Product-details/${id}`)
  }
  return (
  <Card 
    hoverable
    style={{ width: 240 }}
    bodystyle = {{padding : '12px' }}
    cover={<img alt="example" src={image}/>}
    onClick={() => handleDetailsProduct(id)}
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
            <span style={{ marginRight:'8px' }} >{price.toLocalestString}</span> 
        <WrapperDiscountText>
            {discount || -5} % 
        </WrapperDiscountText>
        </WrapperPriceText>
  </Card>
)
}

export default CardComponent