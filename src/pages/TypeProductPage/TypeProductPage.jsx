import { Col, Pagination, Row } from 'antd'
import React, { Fragment } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { WrapperNavbar, WrapperProducts } from '../../components/TypeProduct/Style'

const TypeProductPage = () => {
  return (
        <Fragment style = {{padding : '0 120px', background : '#efefef'}}>        
            <Row style={{ padding: '0 120px',background : '#efefef' , flexWrap : 'nowrap',paddingTop : '10px' }}>
                <WrapperNavbar span={4} style={{background : '#fff' ,marginRight : '3px' , padding : '4px' , borderRadius : '10px' }}>
                        <NavbarComponent/>
                </WrapperNavbar>
                <Col span={20}>                
                <WrapperProducts  >
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProducts>
                <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} defaultCurrent={2} total={100} onChange={onchange} /></Col>
        </Row>      
</Fragment> 
  )
}
export default TypeProductPage