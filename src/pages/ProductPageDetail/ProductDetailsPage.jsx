import { Col, Row , Image } from 'antd'
import React from 'react'
import ImageProduct from '../../assets/image/ImageProduct.png'
import SmallImage from '../../assets/image/smallImage.webp'
import ProductdetailsComponent from '../../components/ProductdetailsComponent/ProductdetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'


const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
        <div style={{padding : '0 120px', marginTop : "4px" , background : "#efefef", height : '1000px'}}>
            <h5><span style={{cursor: 'pointer' , fontWeight: 'bold'}} onClick={() => {navigate('/') }}>Trang Chủ -</span>
                 chi tiết sản phẩm
            </h5>
            <ProductdetailsComponent idProduct={id}/>
        </div>

  )
}

export default ProductDetailsPage