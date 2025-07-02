import React from 'react'
import { Row ,Col ,Image, Input, InputNumber, Button, Flex } from 'antd'
import ImageProduct from '../../assets/image/ImageProduct.png'
import SmallImage from '../../assets/image/smallImage.webp'
import { WrapperInputNumber, WrapperPriceProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleTextSell } from './Style'
import { WrapperStyleNameProduct } from './Style'
import {MinusOutlined, PlusOutlined, StarFilled} from '@ant-design/icons'
import { WrapperPriceText } from '../CardComponent/style'
import { WrapperAddressProduct } from './Style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
const ProductdetailsComponent = () => {
        const onChange = () =>{}
        return (
        <Row style={{backgroundColor : '#fff' , padding : '16px' ,borderRadius : '4px'}} >
        <Col span={10} style={{ borderRight : '1px solid #e5e5e5' ,paddingLeft : '8px' }}>
                <Image  src={ImageProduct} alt="Image Product"  preview = {false}/>
                <Row>
                                  <WrapperStyleColImage span={4}>
                                  <WrapperStyleImageSmall src={SmallImage} alt="image small" preview={false} /></WrapperStyleColImage>
                                  <WrapperStyleColImage span={4}>
                                  <WrapperStyleImageSmall src={SmallImage} alt="image small" preview={false} /></WrapperStyleColImage>
                                  <WrapperStyleColImage span={4}>
                                  <WrapperStyleImageSmall src={SmallImage} alt="image small" preview={false} /></WrapperStyleColImage>
                                  <WrapperStyleColImage span={4} >
                                  <WrapperStyleImageSmall src={SmallImage} alt="image Small" preview={false} /></WrapperStyleColImage>
                </Row>
        </Col>
        <Col span={14} style={{paddingLeft : '10px'}} >
                <WrapperStyleNameProduct>Sách - Thám tử lừng danh conan - combo 10 tập từ 81 đến tập 90</WrapperStyleNameProduct>
                <div>
                        <StarFilled style={{fontSize : '12px' , color : 'rgb(253 ,216 ,54)'}} />
                        <StarFilled style={{fontSize : '12px' , color : 'rgb(253 ,216 ,54)'}} />
                        <StarFilled style={{fontSize : '12px' , color : 'rgb(253 ,216 ,54)'}} />
                        <StarFilled style={{fontSize : '12px' , color : 'rgb(253 ,216 ,54)'}} />
                        <StarFilled style={{fontSize : '12px' , color : 'rgb(253 ,216 ,54)'}} />
                        <WrapperStyleTextSell>  |da ban 1000+ </WrapperStyleTextSell>
                </div>
                        <WrapperPriceProduct>
                                <WrapperPriceText>200.0000 </WrapperPriceText>
                        </WrapperPriceProduct>
                        <WrapperAddressProduct>
                                <span>Giao đến</span>
                                <span className='address'> Q.1 P.Bến Nghé ,Hồ Chí Minh </span>
                                <span> Đổi địa chỉ</span>
                        </WrapperAddressProduct>
                        <div>
                                
                                <div style={{ margin : '10px 0 20px',padding : '10px 0' ,borderTop : '1px solid #ccc' , borderBottom : '1px solid #ccc'}}> 
                                <div style={{marginBottom : '6px' }}>số lượng </div>                               
                                <WrapperQualityProduct>
                                        <Button>
                                        <PlusOutlined style={{ color : '#000' ,fontsize : '20px'}} /> 
                                        </Button>
                                        <Button>
                                        <WrapperInputNumber defaultValue = {3} onChange={onChange} size='small'/>
                                        </Button>
                                        <Button>
                                        <MinusOutlined style={{ color :'#000' ,fontsize :'20px'}}/>
                                        </Button>
                                </WrapperQualityProduct></div>

                        </div>
                                <div style={{display : 'flex' ,gap :'12px' , alignItems : 'center' }}>
                                <ButtonComponent
                                        border = {false}
                                        size = {40} 
                                        styleButton ={{
                                                backgroundColor : 'rgb(224, 1, 16)' ,
                                                height : '48px' ,
                                                width : '228PX' ,
                                                border : 'none' ,
                                                borderRadius : '4px'
                                         }}
                                         textButton ={ 'Chọn mua'}
                                         styleTextButton = {{ color : '#efefef' , fontSize : '15px', fontWeight : '700'}} >
                                </ButtonComponent>
                                <ButtonComponent
                                        size = {40} 
                                        styleButton ={{
                                                backgroundColor : 'rgb(54, 51, 214)' ,
                                                height : '48px' ,
                                                width : '228PX' ,
                                                border : 'none' ,
                                                borderRadius : '4px',
                                                marginleft : '12px'
                                         }}
                                         textButton ={ 'Mua trả sau lãi suất 5%'}
                                         styleTextButton = {{ color : '#efefef'  ,fontSize : '15px', fontWeight : '700'}}>
                                </ButtonComponent>
                                </div>
                                
        </Col>
        </Row>  )
}
export default ProductdetailsComponent