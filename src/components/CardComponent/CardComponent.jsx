import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { WrapperIconHeader } from '../HeaderComponent/Style'
import { WrapperDiscountText, WrapperReportText } from './style'
import { StyleNameProduct } from './style'
import { WrapperPriceText } from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/image/logo.jpg';


const CardComponent = () => {
  return (
  <Card 
    hoverable
    style={{ width: 240 }}
    bodystyle = {{padding : '12px' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >    
      <img src = {logo}  
      style = {{width : '68px' , height : '14px' ,position : 'absolute' , top: -1 ,left : -1,
      borderTopLeftRadius :'3px'}}
      />
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText >
        <span style={{marginRight : '4px'}} >        
          <span> 4.96 </span> <StarFilled style={{fontSize : '12px', color : 'yellow' }} />
          <span>|đã bán 1000k </span>
        </span>
               </WrapperReportText>  
        <WrapperPriceText> 
            1.000.000 $ 
        <WrapperDiscountText>
           -5%
        </WrapperDiscountText>
        </WrapperPriceText>
  </Card>
)
}

export default CardComponent