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
        <div style={{ background : "#efefef", width: '100%'}}>
            <div style={{width:'1270px' ,height:'100%' , margin:'0 auto'}}>
            <h5><span style={{cursor: 'pointer' , fontWeight: 'bold'}} onClick={() => {navigate('/') }}>Trang Chủ -</span>
                 chi tiết sản phẩm
            </h5>
            <ProductdetailsComponent idProduct={id}/></div>
            
        </div>

  )
}

export default ProductDetailsPage