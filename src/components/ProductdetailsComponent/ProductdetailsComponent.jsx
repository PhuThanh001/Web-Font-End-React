import React from 'react'
import { Row ,Col ,Image, Input, InputNumber } from 'antd'
import ImageProduct from '../../assets/image/ImageProduct.png'
import SmallImage from '../../assets/image/smallImage.webp'
import { WrapperBtnProduct, WrapperPriceProduct, WrapperQualityTextProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleTextSell } from './Style'
import { WrapperStyleNameProduct } from './Style'
import {MinusOutlined, PlusOutlined, StarFilled} from '@ant-design/icons'
import { WrapperPriceText } from '../CardComponent/style'
import { WrapperAddressProduct } from './Style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductdetailsComponent = () => {
        const onchange = () =>{}
        return (
        <Row >
        <Col span={10}>
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
        <Col span={14} >
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
                        <WrapperQualityTextProduct>
                                <div>số lượng </div>
                                <WrapperQualityTextProduct>
                                        <WrapperBtnProduct><PlusOutlined style={{ color : '#000' ,fontsize : '20px'}}  /> </WrapperBtnProduct>
                                        <WrapperBtnProduct><InputNumber defaultValue = {3} onchange={onchange} size='small'/></WrapperBtnProduct>
                                        <WrapperBtnProduct><MinusOutlined style={{ color :'#000' ,fontsize :'20px'}}/></WrapperBtnProduct>
                                </WrapperQualityTextProduct>
                        </WrapperQualityTextProduct>
        </Col>
        </Row>  )
}
export default ProductdetailsComponent