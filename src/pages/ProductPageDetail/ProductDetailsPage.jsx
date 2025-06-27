import { Col, Row , Image } from 'antd'
import React from 'react'
import ImageProduct from '../../assets/image/ImageProduct.png'
import SmallImage from '../../assets/image/smallImage.webp'
import ProductdetailsComponent from '../../components/ProductdetailsComponent/ProductdetailsComponent'


const ProductDetailsPage = () => {
  return (
        <div style={{padding : '0 120px', marginTop : "4px" , background : "#efefef", height : '1000px'}}>
            <h5>
                Trang Chủ
            </h5>
            <ProductdetailsComponent/>
        </div>

  )
}

export default ProductDetailsPage